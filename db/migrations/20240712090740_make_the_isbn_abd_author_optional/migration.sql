/*
  Warnings:

  - Made the column `description` on table `Product` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "author" DROP NOT NULL,
ALTER COLUMN "isbn" DROP NOT NULL,
ALTER COLUMN "description" SET NOT NULL;
