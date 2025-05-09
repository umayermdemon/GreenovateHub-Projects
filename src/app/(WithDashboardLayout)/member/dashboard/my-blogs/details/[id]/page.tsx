import BlogDetailsCard from "@/components/modules/blog/BlogDetailsCard";
import { getSingleBlog } from "@/services/blog";
import { getSingleUSer } from "@/services/user";

const BlogDetails = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const { data: blog } = await getSingleBlog(id);
  const { data: user } = await getSingleUSer(blog?.authorId);
  return <BlogDetailsCard blog={blog} user={user} />;
};

export default BlogDetails;
