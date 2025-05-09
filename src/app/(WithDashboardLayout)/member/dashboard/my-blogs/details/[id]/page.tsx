"use client";

import { getSingleBlog } from "@/services/blog";
import { TBlog } from "@/types/blog.types";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const ViewDetails = () => {
    const { id } = useParams();
    const [blogData, setBlogData] = useState<TBlog>({} as TBlog);
    const fetchBlogDetails = async () => {
        try {
            const res = await getSingleBlog(id);
            setBlogData(res.data)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        fetchBlogDetails();
    }, [])
    console.log(blogData);
    return (
        <div>
            <h1>Hi</h1>
        </div>
    );
};

export default ViewDetails;