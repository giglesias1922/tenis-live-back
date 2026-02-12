import  prisma  from "../prisma/client";
import { Prisma,PrismaClient } from "@prisma/client";


export interface StartSetInput{
    matchId:number,
    setNumber:number

}

export interface EndSetInput{
    playerGames:number,
    opponentGames:number
}

export async function StartSet(
    data: StartSetInput,
    db: Prisma.TransactionClient | PrismaClient = prisma
  ) {
    return db.set.create({ data });
  }

export async function EndSet(
    id: number,
    data: EndSetInput,
    db: PrismaClient = prisma
  ) {
    return db.set.update({
      where: { id },
      data
    });
  }