/*
  Warnings:

  - The primary key for the `categories` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `category_id` on the `categories` table. All the data in the column will be lost.
  - The required column `id` was added to the `categories` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "Blog" DROP CONSTRAINT "Blog_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "ideas" DROP CONSTRAINT "ideas_categoryId_fkey";

-- AlterTable
ALTER TABLE "categories" DROP CONSTRAINT "categories_pkey",
DROP COLUMN "category_id",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "categories_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "ideas" ADD CONSTRAINT "ideas_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Blog" ADD CONSTRAINT "Blog_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
