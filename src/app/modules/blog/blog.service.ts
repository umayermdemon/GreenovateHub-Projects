import { prisma } from "../../utils/prisma";
import { IAuthUser } from "../user/user.interface";
import { Blog } from "../../../../generated/prisma";

const createBlog = async (payload: Blog, user: IAuthUser) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: user.email,
    },
  });
  const result = await prisma.blog.create({
    data: {
      title: payload.title,
      description: payload.description,
      categoryId: payload.categoryId,
      images: payload.images,
      authorId: userData.id,
    },
  });
  return result;
};

// const createBlog = async (payload: IBlog, user: IAuthUser) => {
//     const userData = await prisma.user.findUniqueOrThrow({
//         where: {
//             email: user.email
//         }
//     })

//     const result = await prisma.blog.create({
//         data: {
//             ...payload,
//             authorId: userData.id
//         }
//     })
//     return result
// }

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
      blog_id,
    },
  });
  return result;
};

const updateBlog = async (blog_id: string, payload: Partial<Blog>) => {
  const result = await prisma.blog.update({
    where: {
      blog_id,
    },
    data: payload,
  });
  return result;
};
export const blogServices = {
  createBlog,
  getBlogs,
  getSingleBlog,
  updateBlog,
};
