/*
  Warnings:

  - The primary key for the `ideas` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `idea_id` on the `ideas` table. All the data in the column will be lost.
  - The required column `id` was added to the `ideas` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_ideaId_fkey";

-- DropForeignKey
ALTER TABLE "Vote" DROP CONSTRAINT "Vote_ideaId_fkey";

-- AlterTable
ALTER TABLE "ideas" DROP CONSTRAINT "ideas_pkey",
DROP COLUMN "idea_id",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "ideas_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_ideaId_fkey" FOREIGN KEY ("ideaId") REFERENCES "ideas"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_ideaId_fkey" FOREIGN KEY ("ideaId") REFERENCES "ideas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
