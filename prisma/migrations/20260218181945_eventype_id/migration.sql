-- AlterTable
CREATE SEQUENCE event_types_id_seq;
ALTER TABLE "event_types" ALTER COLUMN "id" SET DEFAULT nextval('event_types_id_seq');
ALTER SEQUENCE event_types_id_seq OWNED BY "event_types"."id";
