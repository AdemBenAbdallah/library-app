/*
  Warnings:

  - You are about to drop the column `gendre` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "gendre",
ADD COLUMN     "gender" "GenderType";
