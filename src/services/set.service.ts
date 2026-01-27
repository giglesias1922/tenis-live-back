import prisma from "../prisma/client";

export interface StartSetInput{
    matchId:number,
    setNumber:number

}

export interface EndSetInput{
    playerGames:number,
    opponentGames:number
}

export async function StartSet(data: StartSetInput)
{
    await prisma.set.create({data}); 
}

export async function EndSet(id:number,data: EndSetInput)
{
    await prisma.set.update({
        where:{id},
        data}); 
}