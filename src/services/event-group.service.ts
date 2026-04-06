import prisma from "../prisma/client"


export async function GetAll() {
    const response = await prisma.eventGroup.findMany({
      orderBy: { id: 'asc' }
    })
  
    return response
  }