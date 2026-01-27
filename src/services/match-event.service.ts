import prisma from "../prisma/client";

export async function GetAll()
{
    return prisma.matchEvent.findMany();
}

export async function GetByEventType(eventTypeId:number)
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