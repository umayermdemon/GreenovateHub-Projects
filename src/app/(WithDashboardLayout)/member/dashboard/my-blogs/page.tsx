"use client";
import BlogCard from "@/components/modules/blog/BlogCard";
import { getAllBlogs } from "@/services/blog";
import { TBlog } from "@/types/blog.types";
import { useEffect, useState } from "react";

const MyBlogs = () => {
    const [blogs, setBlogs] = useState<TBlog[]>([]);

    const fetchBlogs = async () => {
        const res = await getAllBlogs();
        if (res?.data) {
            setBlogs(res.data);
        }
    };
    useEffect(() => {
        fetchBlogs();
    }, []);

    return (
        <div className="grid grid-cols-3 gap-4 mx-5 my-6">
            {
                blogs?.map((blog: TBlog) => (<BlogCard key={blog.id} data={blog} refresh={fetchBlogs} />))
            }
            <h1>{blogs?.length}</h1>
        </div>
    );
};

export default MyBlogs;