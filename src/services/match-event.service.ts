import prisma from "../prisma/client";

export async function getMatchEvents()
{
    return prisma.matchEvent.findMany();
}

export async function getByEventType(eventTypeId:number)
{
    return prisma.matchEvent.findFirst({where: { eventTypeId }})
}

export interface CreateMatchEventInput
{
    matchId:number,
    setId:number,
    eventTypeId:number
}

export async function CreateMatchEvent(data: CreateMatchEventInput)
{
    return prisma.matchEvent.create({data});
}