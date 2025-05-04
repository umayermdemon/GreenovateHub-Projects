import { Idea } from "../../../../generated/prisma";
import { prisma } from "../../utils/prisma";
import { IAuthUser } from "../user/user.interface";

const createIdeaIntoDb = async (payload: Idea, user: IAuthUser) => {
  const isUserExists = await prisma.user.findUnique({
    where: {
      email: user.email,
    },
  });
  if (!isUserExists) {
    throw new Error("User not found");
  }
  const isCategoryExists = await prisma.category.findUnique({
    where: {
      category_id: payload.categoryId,
    },
  });
  if (!isCategoryExists) {
    throw new Error("Category not found");
  }
  const authorId = isUserExists?.id;

  const result = await prisma.idea.create({
    data: {
      title: payload.title,
      description: payload.description,
      categoryId: payload.categoryId,
      images: payload.images,
      authorId: authorId,
      price: payload.price,
      problem_statement: payload.problem_statement,
      proposed_solution: payload.proposed_solution,
    },
    include: {
      author: true,
    },
  });
  return result;
};

const getAllIdeasFromDb = async () => {
  const result = await prisma.idea.findMany({
    where: {
      isDeleted: false,
    },
    include: {
      Vote: true,
    },
  });
  const enhancedIdeas = result.map((idea) => {
    const votes = idea.Vote || [];

    const upVotes = votes.filter((v) => v.value === "up").length;
    const downVotes = votes.filter((v) => v.value === "down").length;

    return {
      ...idea,
      up_votes: upVotes,
      down_votes: downVotes,
      total_votes: upVotes + downVotes,
    };
  });
  return enhancedIdeas;
};
const getSingleIdeaFromDb = async (id: string) => {
  const isIdeaExists = await prisma.idea.findUnique({
    where: {
      idea_id: id,
      isDeleted: false,
    },
  });

  if (!isIdeaExists) {
    throw new Error("Idea not found");
  }
  const result = await prisma.idea.findUnique({
    where: {
      idea_id: id,
    },
  });

  if (!result) {
    throw new Error("No idea found");
  }
  return result;
};

const getAllIdeasForMemberFromDb = async (user: IAuthUser) => {
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
      isDeleted: false,
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
const updateIdeaIntoDb = async (user: IAuthUser, id: string, payload: Idea) => {
  const isUserExists = await prisma.user.findUnique({
    where: {
      email: user.email,
    },
  });
  if (!isUserExists) {
    throw new Error("User not found");
  }
  const isIdeaExists = await prisma.idea.findUnique({
    where: {
      idea_id: id,
    },
  });
  if (!isIdeaExists) {
    throw new Error("Idea not found");
  }

  if (isUserExists.id !== isIdeaExists.authorId) {
    throw new Error("You are not the author of this idea");
  }
  const result = await prisma.idea.update({
    where: {
      idea_id: id,
      isDeleted: false,
    },
    data: payload,
  });
  return result;
};
const deleteIdeaFromDb = async (user: IAuthUser, id: string) => {
  const isUserExists = await prisma.user.findUnique({
    where: {
      email: user.email,
    },
  });
  if (!isUserExists) {
    throw new Error("User not found");
  }
  const isIdeaExists = await prisma.idea.findUnique({
    where: {
      idea_id: id,
    },
  });
  if (!isIdeaExists) {
    throw new Error("Idea not found");
  }

  if (isUserExists.id !== isIdeaExists.authorId) {
    throw new Error("You are not the author of this idea");
  }
  const result = await prisma.idea.update({
    where: {
      idea_id: id,
      isDeleted: false,
    },
    data: {
      isDeleted: true,
    },
  });
  return result;
};
export const ideaServices = {
  createIdeaIntoDb,
  getAllIdeasFromDb,
  getAllIdeasForMemberFromDb,
  getSingleIdeaFromDb,
  updateIdeaIntoDb,
  deleteIdeaFromDb,
};
