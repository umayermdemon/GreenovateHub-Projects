"use client";

import BlogDetailsCard from "@/components/modules/blog/BlogDetailsCard";
import { getSingleBlog } from "@/services/blog";
import { getSingleUSer } from "@/services/user";
import { TAuthor, TBlog } from "@/types/blog.types";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState<TBlog>({} as TBlog);
  const [user, setUser] = useState<TAuthor>({} as TAuthor);

  const fetchData = useCallback(async () => {
    const res = await getSingleBlog(id);
    if (res?.data) {
      setBlog(res.data);
    }
    const user = await getSingleUSer(blog?.authorId);
    if (user?.data) {
      setUser(user.data)
    }
  }, [id, blog?.authorId])

  useEffect(() => {

    fetchData();
  }, [fetchData]);

  return <BlogDetailsCard blog={blog} user={user} refresh={fetchData} />;
};

export default BlogDetails;
