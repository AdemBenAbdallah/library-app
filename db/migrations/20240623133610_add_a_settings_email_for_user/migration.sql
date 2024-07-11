-- AlterTable
ALTER TABLE "Session" ADD COLUMN     "settingsEmailMarketing" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "settingsEmailProduct" BOOLEAN NOT NULL DEFAULT true;
