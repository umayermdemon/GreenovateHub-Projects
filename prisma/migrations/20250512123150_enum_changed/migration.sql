/*
  Warnings:

  - The values [pending,published,unpublished] on the enum `blogStatus` will be removed. If these variants are still used in the database, this will fail.
  - The values [pending,published,unpublished] on the enum `ideaStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "blogStatus_new" AS ENUM ('underReview', 'draft', 'approved', 'rejected');
ALTER TABLE "blogs" ALTER COLUMN "status" TYPE "blogStatus_new" USING ("status"::text::"blogStatus_new");
ALTER TYPE "blogStatus" RENAME TO "blogStatus_old";
ALTER TYPE "blogStatus_new" RENAME TO "blogStatus";
DROP TYPE "blogStatus_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "ideaStatus_new" AS ENUM ('underReview', 'draft', 'approved', 'rejected');
ALTER TABLE "ideas" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "ideas" ALTER COLUMN "status" TYPE "ideaStatus_new" USING ("status"::text::"ideaStatus_new");
ALTER TYPE "ideaStatus" RENAME TO "ideaStatus_old";
ALTER TYPE "ideaStatus_new" RENAME TO "ideaStatus";
DROP TYPE "ideaStatus_old";
ALTER TABLE "ideas" ALTER COLUMN "status" SET DEFAULT 'underReview';
COMMIT;

-- AlterTable
ALTER TABLE "ideas" ALTER COLUMN "status" SET DEFAULT 'underReview';
