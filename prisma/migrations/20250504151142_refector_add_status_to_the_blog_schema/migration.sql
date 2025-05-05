/*
  Warnings:

  - Added the required column `status` to the `Blog` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "blogStatus" AS ENUM ('pending', 'draft', 'published', 'unpublished');

-- AlterTable
ALTER TABLE "Blog" ADD COLUMN     "status" "blogStatus" NOT NULL;
