/*
  Warnings:

  - A unique constraint covering the columns `[voterId,ideaId,value]` on the table `Vote` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[voterId,blogId,value]` on the table `Vote` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Vote_voterId_blogId_key";

-- DropIndex
DROP INDEX "Vote_voterId_ideaId_key";

-- CreateIndex
CREATE UNIQUE INDEX "Vote_voterId_ideaId_value_key" ON "Vote"("voterId", "ideaId", "value");

-- CreateIndex
CREATE UNIQUE INDEX "Vote_voterId_blogId_value_key" ON "Vote"("voterId", "blogId", "value");
