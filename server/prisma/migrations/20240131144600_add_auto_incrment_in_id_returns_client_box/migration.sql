-- AlterTable
CREATE SEQUENCE returnsclientbox_id_seq;
ALTER TABLE "ReturnsClientBox" ALTER COLUMN "id" SET DEFAULT nextval('returnsclientbox_id_seq');
ALTER SEQUENCE returnsclientbox_id_seq OWNED BY "ReturnsClientBox"."id";
