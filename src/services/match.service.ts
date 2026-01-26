import prisma from "../prisma/client";

export async function getMatches ()
{
  return prisma.match.findMany();
};

export async function getMatch (id:number)
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

export async function startMatch(data: StartMatchObject)
{
    return prisma.match.create({
      data
    });
}

export async function endMatch(id:number,data: EndMatchObject)
{
    return prisma.match.update({
      where:{id},
      data
    });
}

export async function hasSets(matchId: number): Promise<boolean> {
  const count = await prisma.set.count({
    where: { matchId }
  });

  return count > 0;
}