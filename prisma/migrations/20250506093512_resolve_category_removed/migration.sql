/*
  Warnings:

  - You are about to drop the column `categoryId` on the `ideas` table. All the data in the column will be lost.
  - You are about to drop the `categories` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `category` to the `Blog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category` to the `ideas` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Blog" DROP CONSTRAINT "Blog_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "ideas" DROP CONSTRAINT "ideas_categoryId_fkey";

-- AlterTable
ALTER TABLE "Blog" ADD COLUMN     "category" "categoryName" NOT NULL,
ALTER COLUMN "categoryId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "ideas" DROP COLUMN "categoryId",
ADD COLUMN     "category" "categoryName" NOT NULL;

-- DropTable
DROP TABLE "categories";
