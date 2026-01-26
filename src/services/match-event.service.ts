import prisma from "../prisma/client";

export async function getAll()
{
    return prisma.matchEvent.findMany();
}

export async function getByEventType(eventTypeId:number)
{
    return prisma.matchEvent.findFirst({where: { eventTypeId }})
}