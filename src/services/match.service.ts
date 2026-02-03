import { Match } from "@prisma/client";
import  prisma  from "../prisma/client";


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
    round:string
}

export interface EndMatchObject
{
    won:boolean,
    notes:string
}

export async function StartMatch(data: StartMatchObject)
{
    return prisma.match.create({
      data
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

export async function GetActiveMatch(): Promise<Match | null>
{
  return await prisma.match.findFirst(
    {
      where: {endTime: null}
    }
  )
}