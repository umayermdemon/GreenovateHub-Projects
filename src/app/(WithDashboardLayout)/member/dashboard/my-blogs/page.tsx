"use client";
import BlogCard from "@/components/modules/blog/BlogCard";
import { useUser } from "@/context/UserContext";
import { getMyBlogs } from "@/services/blog";
import { TBlog } from "@/types/blog.types";
import { useEffect, useState } from "react";

const MyBlogs = () => {
    const [blogs, setBlogs] = useState<TBlog[]>([]);

    const fetchBlogs = async () => {
        const res = await getMyBlogs();
        if (res?.data) {
            setBlogs(res.data);
        }
    };
    useEffect(() => {
        fetchBlogs();
    }, []);
    const {user} = useUser();
    console.log(user);
    return (
        <div className="grid grid-cols-3 gap-4 mx-5 my-6">
            {
                blogs?.map((blog: TBlog) => (<BlogCard key={blog.id} data={blog} refresh={fetchBlogs} userId={user?.userId} />))
            }
            <h1>{blogs?.length}</h1>
        </div>
    );
};

export default MyBlogs;