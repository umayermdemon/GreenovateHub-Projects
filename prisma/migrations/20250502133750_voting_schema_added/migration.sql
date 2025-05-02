-- CreateEnum
CREATE TYPE "voteValue" AS ENUM ('up', 'down', 'no');

-- CreateTable
CREATE TABLE "Vote" (
    "vote_id" TEXT NOT NULL,
    "voterId" TEXT NOT NULL,
    "value" "voteValue" NOT NULL,
    "ideaId" TEXT,
    "blogId" TEXT,

    CONSTRAINT "Vote_pkey" PRIMARY KEY ("vote_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Vote_voterId_ideaId_key" ON "Vote"("voterId", "ideaId");

-- CreateIndex
CREATE UNIQUE INDEX "Vote_voterId_blogId_key" ON "Vote"("voterId", "blogId");

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_voterId_fkey" FOREIGN KEY ("voterId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_ideaId_fkey" FOREIGN KEY ("ideaId") REFERENCES "ideas"("idea_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_blogId_fkey" FOREIGN KEY ("blogId") REFERENCES "Blog"("blog_id") ON DELETE SET NULL ON UPDATE CASCADE;
