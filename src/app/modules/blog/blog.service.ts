import { prisma } from "../../utils/prisma";
import { IAuthUser } from "../user/user.interface";
import { Blog, userRole } from "../../../../generated/prisma";

const writeBlog = async (payload: Blog, user: IAuthUser) => {
  if (!user.userId) {
    throw new Error("This user not found in the DB")
  }
  const result = await prisma.blog.create({
    data: {
      ...payload,
      authorId: user?.userId
    },
  });
  return result;
};


const getAllBlogs = async () => {
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
const getBlog = async (id: string) => {
  const result = await prisma.blog.findUnique({
    where: {
      id,
    },
  });
  return result;
};

const editBlog = async (id: string, payload: Partial<Blog>, user: IAuthUser) => {
  const blogData = await prisma.blog.findUnique({
    where: {
      id
    }
  })
  if (blogData?.authorId !== user.userId || user.role !== userRole.admin) {
    throw new Error("You cannot update this blog")
  }
  const result = await prisma.blog.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};
const deleteBlog = async (id: string, user: IAuthUser) => {
  const blogData = await prisma.blog.findUnique({
    where: {
      id
    }
  })
  if (blogData?.authorId !== user.userId || user.role !== userRole.admin) {
    throw new Error("You cannot delete this blog")
  }
  const result = await prisma.blog.delete({
    where: {
      id
    }
  })
  return result
}
export const blogServices = {
  writeBlog,
  getAllBlogs,
  getBlog,
  editBlog,
  deleteBlog
};
