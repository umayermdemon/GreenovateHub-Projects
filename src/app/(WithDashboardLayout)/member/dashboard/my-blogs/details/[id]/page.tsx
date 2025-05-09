"use client";

import { getSingleBlog } from "@/services/blog";
import { TAuthor, TBlog } from "@/types/blog.types";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
import { format } from "date-fns";
import { getSingleUSer } from "@/services/user";

const BlogDetails = () => {
  const { id } = useParams();
  const [blogData, setBlogData] = useState<TBlog | null>(null);
  const [userData, setUserData] = useState<TAuthor | null>(null);

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        const res = await getSingleBlog(id as string);
        setBlogData(res.data);
      } catch (error) {
        console.error("Failed to fetch blog:", error);
      }
    };

    if (id) {
      fetchBlogDetails();
    }
  }, [id]);
  useEffect(() => {
    const user = async () => {
      try {
        const res = await getSingleUSer(blogData?.authorId as string);
        setUserData(res.data);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };

    if (blogData?.authorId) {
      user();
    }
  }, [blogData?.authorId]);

  console.log({ userData });

  if (!blogData) {
    return (
      <div className="text-center py-10 text-muted-foreground">Loading...</div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto min-h-[calc(100vh-100px)] px-4 py-10 my-12 shadow-lg rounded-md bg-green-50 border border-green-500">
      {blogData.images && blogData.images.length > 0 && (
        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000 }}
          loop
          className="rounded-xl mb-6">
          {blogData.images.map((img, idx) => (
            <SwiperSlide key={idx}>
              <Image
                src={img}
                alt={`Blog Image ${idx + 1}`}
                width={800}
                height={800}
                className="rounded-xl w-full h-96 object-contain"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      <Badge
        variant="outline"
        className="mb-4 capitalize bg-green-800 text-white p-2">
        {blogData.category}
      </Badge>
      <h1 className="text-4xl font-bold text-green-800 mb-1">
        {blogData.title}
      </h1>
      <p className="text-muted-foreground mb-2 text-xs ">
        Posted on{" "}
        {blogData.createdAt
          ? format(new Date(blogData.createdAt), "PPP")
          : "N/A"}{" "}
        by <span className="text-green-700 font-medium">{userData?.name}</span>
      </p>
      <p className="text-lg text-gray-700 leading-relaxed mt-4">
        {blogData.description}
      </p>
    </div>
  );
};

export default BlogDetails;
