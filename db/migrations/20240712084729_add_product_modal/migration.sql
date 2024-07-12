-- CreateEnum
CREATE TYPE "BookCategory" AS ENUM ('FICTION', 'NON_FICTION', 'FANTASY', 'SCIENCE_FICTION', 'MYSTERY', 'ROMANCE', 'HISTORY', 'BIOGRAPHY', 'SELF_HELP', 'CHILDREN', 'OTHER');

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "isbn" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "language" TEXT NOT NULL,
    "category" "BookCategory" NOT NULL,
    "description" TEXT,
    "productImageKey" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);
