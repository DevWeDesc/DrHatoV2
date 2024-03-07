-- AlterTable
CREATE SEQUENCE partexams_codpart_seq;
ALTER TABLE "PartExams" ALTER COLUMN "codpart" SET DEFAULT nextval('partexams_codpart_seq');
ALTER SEQUENCE partexams_codpart_seq OWNED BY "PartExams"."codpart";
