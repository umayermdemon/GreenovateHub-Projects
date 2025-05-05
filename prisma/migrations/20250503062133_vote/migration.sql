/*
  Warnings:

  - A unique constraint covering the columns `[voterId,ideaId]` on the table `Vote` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[voterId,blogId]` on the table `Vote` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Vote_voterId_ideaId_key" ON "Vote"("voterId", "ideaId");

-- CreateIndex
CREATE UNIQUE INDEX "Vote_voterId_blogId_key" ON "Vote"("voterId", "blogId");
