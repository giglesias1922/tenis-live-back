import prisma from "../prisma/client";

export const getAllMatches = async () => {
  return prisma.match.findMany();
};
