/*
  Warnings:

  - The primary key for the `Vote` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `vote_id` on the `Vote` table. All the data in the column will be lost.
  - The required column `id` was added to the `Vote` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "Vote" DROP CONSTRAINT "Vote_pkey",
DROP COLUMN "vote_id",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "Vote_pkey" PRIMARY KEY ("id");
