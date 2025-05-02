import { Idea } from "../../../../generated/prisma";
import { prisma } from "../../utils/prisma";

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

export const ideaServices = {
  createIdeaIntoDb,
};
