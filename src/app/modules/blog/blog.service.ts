import { prisma } from "../../utils/prisma"
import { IAuthUser } from "../user/user.interface"
import { IBlog } from "./blog.interface"


const createBlog = async (payload: IBlog, user: IAuthUser) => {
    const userData = await prisma.user.findUniqueOrThrow({
        where: {
            email: user.email
        }
    })
    const result = await prisma.blog.create({
        data: {
            ...payload,
            authorId: userData.id,
            category_id: payload.categoryId
        }
    })
    return result
}

const getBlogs = async () => {
  const result = await prisma.blog.findMany({
    include: {
      Vote: true,
    },
  });
  const enhancedIdeas = result.map((blog) => {
    const votes = blog.Vote || [];

    const upVotes = votes.filter((v) => v.value === "up").length;
    const downVotes = votes.filter((v) => v.value === "down").length;

    return {
      ...blog,
      up_votes: upVotes,
      down_votes: downVotes,
    };
  });
  return enhancedIdeas;
};
const getSingleBlog = async (blog_id: string) => {
    const result = await prisma.blog.findUnique({
        where: {
            blog_id
        }
    });
    return result
}

const updateBlog = async (blog_id: string, payload: Partial<IBlog>) => {
    const result = await prisma.blog.update({
        where: {
            blog_id
        },
        data: payload
    })
    return result
}
export const blogServices = {
    createBlog,
    getBlogs,
    getSingleBlog,
    updateBlog
}