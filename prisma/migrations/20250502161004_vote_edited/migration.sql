/*
  Warnings:

  - The values [no] on the enum `voteValue` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "voteValue_new" AS ENUM ('up', 'down');
ALTER TABLE "Vote" ALTER COLUMN "value" TYPE "voteValue_new" USING ("value"::text::"voteValue_new");
ALTER TYPE "voteValue" RENAME TO "voteValue_old";
ALTER TYPE "voteValue_new" RENAME TO "voteValue";
DROP TYPE "voteValue_old";
COMMIT;

-- DropIndex
DROP INDEX "Vote_voterId_blogId_key";

-- DropIndex
DROP INDEX "Vote_voterId_ideaId_key";
