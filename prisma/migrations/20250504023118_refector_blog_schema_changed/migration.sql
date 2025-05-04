/*
  Warnings:

  - The primary key for the `Blog` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `blog_id` on the `Blog` table. All the data in the column will be lost.
  - The required column `id` was added to the `Blog` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "Vote" DROP CONSTRAINT "Vote_blogId_fkey";

-- AlterTable
ALTER TABLE "Blog" DROP CONSTRAINT "Blog_pkey",
DROP COLUMN "blog_id",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "Blog_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_blogId_fkey" FOREIGN KEY ("blogId") REFERENCES "Blog"("id") ON DELETE SET NULL ON UPDATE CASCADE;
