import { Match } from "@prisma/client";
import  prisma  from "../prisma/client";
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

export type StartMatchObject =
{
    clubId:number,
    opponentName:string,
    round:string,
    notes:string,
    supertiebreak:boolean
}

export type EndMatchObject =
{
    won:boolean,
    notes:string
}

export type ActiveMatchDto =
{
    id:number,
    clubId:number,    
    opponentName: string,
    round:string,
    startTime:Date,
    supertiebreak:boolean,
    clubName:string
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

export async function EndMatch(id:number,data: EndMatchObject)
{
    return prisma.match.update({
      where:{id},
      data
    });
}

export async function HasSets(matchId: number): Promise<boolean> {
  const count = await prisma.set.count({
    where: { matchId }
  });

  return count > 0;
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
      clubName:data.club.name
  }

  return resu;
}