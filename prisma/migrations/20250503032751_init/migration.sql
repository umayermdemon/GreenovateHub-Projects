-- CreateEnum
CREATE TYPE "ideaStatus" AS ENUM ('pending', 'draft', 'published', 'unpublished');

-- CreateEnum
CREATE TYPE "categoryName" AS ENUM ('energy', 'waste', 'transportation');

-- CreateEnum
CREATE TYPE "userRole" AS ENUM ('admin', 'member');

-- CreateEnum
CREATE TYPE "voteValue" AS ENUM ('up', 'down');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" "userRole" NOT NULL DEFAULT 'member',
    "password" TEXT NOT NULL,
    "needsPasswordChange" BOOLEAN NOT NULL DEFAULT true,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "image" TEXT NOT NULL,
    "address" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "categories" (
    "category_id" TEXT NOT NULL,
    "name" "categoryName" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("category_id")
);

-- CreateTable
CREATE TABLE "ideas" (
    "idea_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "images" TEXT[],
    "authorId" TEXT NOT NULL,
    "problem_statement" TEXT NOT NULL,
    "proposed_solution" TEXT NOT NULL,
    "isPremium" BOOLEAN NOT NULL DEFAULT false,
    "price" TEXT NOT NULL,
    "status" "ideaStatus" NOT NULL DEFAULT 'pending',
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ideas_pkey" PRIMARY KEY ("idea_id")
);

-- CreateTable
CREATE TABLE "Blog" (
    "blog_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "images" TEXT[],
    "description" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "category_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Blog_pkey" PRIMARY KEY ("blog_id")
);

-- CreateTable
CREATE TABLE "Vote" (
    "vote_id" TEXT NOT NULL,
    "voterId" TEXT NOT NULL,
    "value" "voteValue" NOT NULL,
    "ideaId" TEXT,
    "blogId" TEXT,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Vote_pkey" PRIMARY KEY ("vote_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_id_key" ON "users"("id");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Blog_title_key" ON "Blog"("title");

-- AddForeignKey
ALTER TABLE "ideas" ADD CONSTRAINT "ideas_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("category_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ideas" ADD CONSTRAINT "ideas_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Blog" ADD CONSTRAINT "Blog_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Blog" ADD CONSTRAINT "Blog_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("category_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_voterId_fkey" FOREIGN KEY ("voterId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_ideaId_fkey" FOREIGN KEY ("ideaId") REFERENCES "ideas"("idea_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_blogId_fkey" FOREIGN KEY ("blogId") REFERENCES "Blog"("blog_id") ON DELETE SET NULL ON UPDATE CASCADE;
