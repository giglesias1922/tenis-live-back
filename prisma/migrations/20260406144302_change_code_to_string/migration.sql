/*
  Warnings:

  - You are about to drop the column `buttonGroup` on the `event_types` table. All the data in the column will be lost.
  - Changed the type of `code` on the `event_types` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "event_types" DROP COLUMN "buttonGroup",
ADD COLUMN     "eventGroupId" INTEGER,
ADD COLUMN     "pointWon" BOOLEAN NOT NULL DEFAULT false;

ALTER TABLE "event_types"
ALTER COLUMN "code" TYPE TEXT USING "code"::text;


-- DropEnum
DROP TYPE "EventCode";

-- DropEnum
DROP TYPE "EventGroup";

-- CreateTable
CREATE TABLE "event_groups" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "event_groups_pkey" PRIMARY KEY ("id")
);


-- AddForeignKey
ALTER TABLE "event_types" ADD CONSTRAINT "event_types_eventGroupId_fkey" FOREIGN KEY ("eventGroupId") REFERENCES "event_groups"("id") ON DELETE SET NULL ON UPDATE CASCADE;
