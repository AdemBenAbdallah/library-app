/*
  Warnings:

  - You are about to drop the column `settingsEmailMarketing` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `settingsEmailProduct` on the `Session` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Session" DROP COLUMN "settingsEmailMarketing",
DROP COLUMN "settingsEmailProduct";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "settingsEmailMarketing" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "settingsEmailProduct" BOOLEAN NOT NULL DEFAULT true;
