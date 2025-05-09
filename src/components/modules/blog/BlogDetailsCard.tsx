"use client";

import { TAuthor, TBlog } from "@/types/blog.types";
import { Badge } from "@/components/ui/badge";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
import { format } from "date-fns";
import { BiSolidLike } from "react-icons/bi";
import { AiFillDislike } from "react-icons/ai";

const BlogDetailsCard = ({ blog, user }: { blog: TBlog; user: TAuthor }) => {
  if (!blog) {
    return (
      <div className="text-center py-10 text-muted-foreground">Loading...</div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto min-h-[calc(100vh-100px)] p-4 my-4 shadow-lg rounded-md bg-green-50 border border-green-500">
      {blog?.images && blog?.images.length > 0 && (
        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000 }}
          loop
          className="rounded-xl mb-6">
          {blog.images.map((img, idx) => (
            <SwiperSlide key={idx}>
              <Image
                src={img}
                alt={`Blog Image ${idx + 1}`}
                width={800}
                height={800}
                className="rounded-xl w-full h-[600px] object-fill border-2 "
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      <Badge
        variant="outline"
        className="mb-4 capitalize bg-green-800 text-white p-2">
        {blog?.category}
      </Badge>
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-green-800 mb-1">
            {blog?.title}
          </h1>
          <p className="text-muted-foreground mb-2 text-xs ">
            Posted on{" "}
            {blog?.createdAt ? format(new Date(blog?.createdAt), "PPP") : "N/A"}{" "}
            by <span className="text-green-700 font-medium">{user?.name}</span>
          </p>
        </div>
        <div className="flex gap-4 mt-1">
          <div className="flex gap-2 bg-green-500 px-2 py-1 rounded-full">
            <div className="flex gap-0.5 border-r cursor-pointer pr-1 text-white text-[19px]">
              <p>
                <BiSolidLike />
              </p>

              <p className="text-sm">5</p>
            </div>
            <div className="flex gap-0.5 cursor-pointer pr-1 text-white text-[19px]">
              <p>
                <AiFillDislike />
              </p>

              <p className="text-sm">0</p>
            </div>
          </div>
        </div>
      </div>
      <p className="text-base text-gray-700 mt-4 text-justify">
        {blog?.description}
      </p>
    </div>
  );
};

export default BlogDetailsCard;
