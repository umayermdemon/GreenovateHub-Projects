import { Idea } from "../../../../generated/prisma";
import { prisma } from "../../utils/prisma";
import { IAuthUser } from "../user/user.interface";

const createIdeaIntoDb = async (payload: Idea) => {
  const result = await prisma.idea.create({
    data: {
      title: payload.title,
      description: payload.description,
      categoryId: payload.categoryId,
      authorId: payload.authorId,
      price: payload.price,
      images: payload.images,
      problem_statement: payload.problem_statement,
      proposed_solution: payload.proposed_solution,
    },
  });
  return result;
};

const getAllIdeasFromDb = async () => {
  const result = await prisma.idea.findMany();
  return result;
};
const getAllIdeasForMemberFromDb = async (user: IAuthUser) => {
  console.log(user);
  if (user.role !== "member") {
    throw new Error("User is not a member");
  }
  const isUserExists = await prisma.user.findUnique({
    where: {
      email: user.email,
    },
  });
  if (!isUserExists) {
    throw new Error("User not found");
  }

  const result = await prisma.idea.findMany({
    where: {
      authorId: isUserExists.id,
    },
    include: {
      category: true,
      author: true,
    },
  });
  if (result.length === 0) {
    throw new Error("No ideas found for this user");
  }
  return result;
};

export const ideaServices = {
  createIdeaIntoDb,
  getAllIdeasFromDb,
  getAllIdeasForMemberFromDb,
};
