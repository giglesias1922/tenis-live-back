import  prisma  from "../prisma/client";
import { Prisma,PrismaClient, SetStatus, MatchStatus, Set } from "@prisma/client";
import * as setService from "../services/set.service"

export async function GetAll ()
{
  return prisma.match.findMany();
};

export async function GetById (id:number)
{
  return prisma.match.findUnique({
    where:{id}
  });
};

export interface StartMatchObject
{
    clubId:number,
    opponentName:string,
    round:string,
    notes:string,
    supertiebreak:boolean
}

export interface EndMatchObject
{
    won:boolean,
    notes:string
}

export interface ActiveMatchDto
{
    id:number,
    clubId:number,    
    opponentName: string,
    round:string,
    startTime:Date,
    supertiebreak:boolean,
    clubName:string,
    currentSetId?: number,
    currentSetNumber?: number
}



export interface ClosedMatchDto
{
    matchId:number,
    clubName:string,
    opponentName: string,
    round:string|null,
    startTime:Date,
    endTime:Date|null,
    won:Boolean|null,
    sets: Set[]
}

export type ClosedMatchFilter = {
  clubId?: number
  fromDate?: Date
  opponent?: string
}

export async function StartMatch(data: StartMatchObject) {

  return prisma.$transaction(async (tx) => {

    const match = await tx.match.create({
      data
    });

    await setService.StartSet(
      {
        matchId: match.id,
        setNumber: 1
      },
      tx
    );

    return match;
  });
} 

export async function EndMatch(
  id: number,
  data: EndMatchObject,
  db: Prisma.TransactionClient | PrismaClient = prisma
) {
  return db.match.update({
    where: { id },
    data: {
      ...data,
      endTime: new Date(),
      status: MatchStatus.CLOSED,
        
    }
  });
}

export async function HasSets(matchId: number): Promise<boolean> {
  const count = await prisma.set.count({
    where: { matchId }
  });

  return count > 0;
}



export async function GetClosedMatches(filter:ClosedMatchFilter):Promise<ClosedMatchDto[]>
{
  let from: Date | undefined;

  //Si vino fecha desde, le saca la hora
  if (filter?.fromDate) {
    from = new Date(filter.fromDate);
  }


  const matches = await prisma.match.findMany(
    {
      where: {
        status:{
          not: MatchStatus.ACTIVE
        },

        ...(filter?.clubId && {
          clubId: filter.clubId
        }),
  
        ...(filter?.fromDate && {
          startTime: {
            gte: from
          }
        }),
  
        ...(filter?.opponent && {
          opponentName: {
            contains: filter.opponent,
            mode: "insensitive"
          }
        })
      },
      orderBy:{endTime: "desc"},
      include:
      {
        club: true,
        sets:true
      }
    },
    
  )

  return matches.map((m)=>(
    {
      matchId: m.id,
      clubName: m.club.name,
      opponentName: m.opponentName,
      round: m.round,
      startTime: m.startTime,
      endTime: m.endTime,
      won: m.won,
      sets: m.sets
    }
  ))
}


export async function GetActiveMatch(): Promise<ActiveMatchDto | null>
{
  const data = await prisma.match.findFirst(
    {
      where: {endTime: null},
      include:
      {
          club:
          {
            select:
            {
              name:true
            }
          },
          sets:
          {
            where:{
              status: SetStatus.ACTIVE
            },
            select:
            {
              id: true,
              setNumber: true
            }
          }
      }
    }
  )

  if (!data) return null;

  const resu:ActiveMatchDto = {
      id:data.id,
      clubId:data.clubId,
      opponentName:data.opponentName,
      round:data.round??"",
      startTime:data.startTime,
      supertiebreak:data.supertiebreak,
      clubName:data.club.name,
      currentSetId:data.sets[0].id??null,
      currentSetNumber:data.sets[0].setNumber??null
  }

  return resu;
}