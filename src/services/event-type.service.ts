import prisma from "../prisma/client";
import { EventCode } from "../generated/prisma";


interface CreateEventTypeInput {
  code: EventCode;
  description: string;
}

interface UpdateEventTypeInput {
  description?: string;
}

export async function getEventTypes() {
  const eventTypes = await prisma.eventType.findMany({
    orderBy: { id: 'asc' }
  })

  return eventTypes
}

export async function getEventType(id: number) {
  return prisma.eventType.findUnique({
    where: { id }
  });
}

export async function addEventType(data: CreateEventTypeInput) {
  return prisma.eventType.create({
    data
  });
}

export async function updateEventType(
  id: number,
  data: UpdateEventTypeInput
) {
  return prisma.eventType.update({
    where: { id },
    data
  });
}

export async function deleteEventType(id: number) {
  return prisma.eventType.delete({
    where: { id }
  });
}

export async function deactivateEventType(id: number) {
  return prisma.eventType.update({
    where: { id },
    data: { active: false }
  });
}


