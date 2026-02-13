-- CreateEnum
CREATE TYPE "SetStatus" AS ENUM ('ACTIVE', 'CLOSED');

-- AlterTable
ALTER TABLE "sets" ADD COLUMN     "status" "SetStatus" NOT NULL DEFAULT 'ACTIVE';
