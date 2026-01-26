import prisma from "../prisma/client";

interface CreateClubInput {
    name: string;
    city: string;
}

interface UpdateClubInput {
    name: string;
    city: string;
}

export async function getClubs() {
    return await prisma.club.findMany();
}

export async function getClub(id:number) {
    return await prisma.club.findUnique({
        where: {id}
    });
}

export async function addClub(data:CreateClubInput) {
    return prisma.club.create({
        data
    });
}

export async function updateClub(id: number, data:UpdateClubInput) {
    return prisma.club.update({
        where: {id},
        data
    });
}

export async function deleteClub(id: number) {
    return prisma.club.delete({
        where: {id}
    });
}

export async function hasMatches(clubId: number): Promise<boolean> {
    const count = await prisma.match.count({
      where: { clubId }
    });
  
    return count > 0;
}

