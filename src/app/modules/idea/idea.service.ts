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
const getAllIdea = async () => {
  const result = await prisma.idea.findMany({
    include: {
      Vote: true
    }
  });
  const enhancedIdeas = result.map((idea) => {
    const votes = idea.Vote || [];

    const upVotes = votes.filter(v => v.value === 'up').length;
    const downVotes = votes.filter(v => v.value === 'down').length;

    return {
      ...idea,
      up_votes: upVotes,
      down_votes: downVotes,
    };
  });
  return enhancedIdeas
}
export const ideaServices = {
  createIdeaIntoDb,
  getAllIdea
};
