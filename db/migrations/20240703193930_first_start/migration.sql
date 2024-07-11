/*
  Warnings:

  - The primary key for the `Blog` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Subscription` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `subscriptionCost` to the `Subscription` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Blog" DROP CONSTRAINT "Blog_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Blog_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Blog_id_seq";

-- AlterTable
ALTER TABLE "Subscription" DROP CONSTRAINT "Subscription_pkey",
ADD COLUMN     "subscriptionCost" DOUBLE PRECISION NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Subscription_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Subscription_id_seq";
