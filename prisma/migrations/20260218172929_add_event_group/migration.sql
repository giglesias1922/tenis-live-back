-- CreateEnum
CREATE TYPE "EventGroup" AS ENUM ('SERVICE', 'ERROR', 'WINNER', 'BREAKPOINT');

-- AlterTable
ALTER TABLE "event_types" ADD COLUMN     "buttonColour" TEXT,
ADD COLUMN     "buttonGroup" "EventGroup",
ADD COLUMN     "buttonOrder" INTEGER,
ADD COLUMN     "buttonText" TEXT,
ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "event_types_id_seq";
