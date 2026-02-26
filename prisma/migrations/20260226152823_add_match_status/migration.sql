-- CreateEnum
CREATE TYPE "MatchStatus" AS ENUM ('ACTIVE', 'CLOSED', 'SUSPENDED');

-- AlterTable
ALTER TABLE "matches" ADD COLUMN     "status" "MatchStatus" DEFAULT 'ACTIVE';
