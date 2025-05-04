import { Idea, userRole } from "../../../../generated/prisma";
import { prisma } from "../../utils/prisma";
import { IAuthUser } from "../user/user.interface";

const createIdea = async (payload: Idea, user: IAuthUser) => {

  if (!user.userId) {
    throw new Error("User not found");
  }
  const isCategoryExists = await prisma.category.findUnique({
    where: {
      id: payload.categoryId,
    },
  });
  if (!isCategoryExists) {
    throw new Error("Category not found");
  }

  const result = await prisma.idea.create({
    data: {
      ...payload,
      authorId: user.userId,

    },
    include: {
      author: true,
    },
  });
  return result;
};

const getAllIdeas = async () => {
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
const getSingleIdea = async (id: string) => {
  const isIdeaExists = await prisma.idea.findUnique({
    where: {
      id,
      isDeleted: false,
    },
  });

  if (!isIdeaExists) {
    throw new Error("Idea not found");
  }
  const result = await prisma.idea.findUnique({
    where: {
      id,
    },
  });

  if (!result) {
    throw new Error("No idea found");
  }
  return result;
};

const getMyIdeas = async (user: IAuthUser) => {
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
const updateIdea = async (user: IAuthUser, id: string, payload: Idea) => {

  if (!user.userId) {
    throw new Error("User not found");
  }
  const isIdeaExists = await prisma.idea.findUnique({
    where: {
      id,
    },
  });
  if (!isIdeaExists) {
    throw new Error("Idea not found");
  }

  if (user.userId !== isIdeaExists.authorId && user.role !== userRole.admin) {
    throw new Error("You cannot update this");
  }
  const result = await prisma.idea.update({
    where: {
      id,
      isDeleted: false,
    },
    data: payload,
  });
  return result;
};
const deleteIdea = async (user: IAuthUser, id: string) => {

  if (!user.userId) {
    throw new Error("User not found");
  }
  const isIdeaExists = await prisma.idea.findUnique({
    where: {
      id,
    },
  });
  if (!isIdeaExists) {
    throw new Error("Idea not found");
  }

  if (user.userId !== isIdeaExists.authorId && user.role !== userRole.admin) {
    throw new Error("You cannot delete this");
  }
  const result = await prisma.idea.update({
    where: {
      id,
      isDeleted: false,
    },
    data: {
      isDeleted: true,
    },
  });
  return result;
};
export const ideaServices = {
  createIdea,
  getAllIdeas,
  getMyIdeas,
  getSingleIdea,
  updateIdea,
  deleteIdea,
};
