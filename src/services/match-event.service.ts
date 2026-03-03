import  prisma  from "../prisma/client";
import * as matchService from "../services/match.service"

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

export interface MatchSummary
{
    buttonGroup:string,
    event:string,
    count:number
}

export async function CreateMatchEvent(data: CreateMatchEventInput)
{
    return prisma.matchEvent.create({data});
}

export async function GetSummary(matchId: number): Promise<MatchSummary[]> {

  const grouped = await prisma.matchEvent.groupBy({
    by: ["eventTypeId"],
    where: {
      matchId,
    },
    _count: {
      eventTypeId: true,
    },
  });

  const eventTypeIds = grouped.map(g => g.eventTypeId);
  
  const eventTypes = await prisma.eventType.findMany({
    where: {
      id: { in: eventTypeIds },
    },
    select: {
      id: true,
      description: true,
      buttonGroup: true,
    },
  });

  return grouped.map(g => {
    const eventType = eventTypes.find(e => e.id === g.eventTypeId);
    const match = matchService.GetById(matchId)


    return {
      event: eventType?.description ?? "",
      buttonGroup: eventType?.buttonGroup ?? "",
      count: g._count.eventTypeId
    };
  });
}