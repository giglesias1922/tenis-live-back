import prisma from "../prisma/client";
import { EventCode } from "../generated/prisma";


interface CreateEventTypeInput {
  code: EventCode;
  description: string;
}

interface UpdateEventTypeInput {
  description?: string;
}

export async function GetAll() {
  const eventTypes = await prisma.eventType.findMany({
    orderBy: { id: 'asc' }
  })

  return eventTypes
}

export async function GetById(id: number) {
  return prisma.eventType.findUnique({
    where: { id }
  });
}

export async function Add(data: CreateEventTypeInput) {
  return prisma.eventType.create({
    data
  });
}

export async function Update(
  id: number,
  data: UpdateEventTypeInput
) {
  return prisma.eventType.update({
    where: { id },
    data
  });
}

export async function Delete(id: number) {
  return prisma.eventType.delete({
    where: { id }
  });
}

export async function Deactivate(id: number) {
  return prisma.eventType.update({
    where: { id },
    data: { active: false }
  });
}


