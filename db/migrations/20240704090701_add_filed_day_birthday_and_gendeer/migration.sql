-- CreateEnum
CREATE TYPE "GenderType" AS ENUM ('MALE', 'FEMALE');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "birthdayDate" TIMESTAMP(3),
ADD COLUMN     "gendre" "GenderType";
