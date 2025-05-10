"use client";

import { TAuthor } from "@/types/blog.types";
import { TIdea } from "@/types/idea.types";
import { Badge } from "@/components/ui/badge";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
import { format } from "date-fns";
import { BiSolidLike } from "react-icons/bi";
import { AiFillDislike, AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
import { Edit, Trash } from "lucide-react";
import Link from "next/link";
import Swal from "sweetalert2";
import { deleteMyBlog } from "@/services/blog";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { createVote, undoVote } from "@/services/vote";

const getStatusColor = (status: string) => {
  switch (status) {
    case "pending":
      return "bg-yellow-500";
    case "draft":
      return "bg-gray-500";
    case "published":
      return "bg-green-600";
    case "unpublished":
      return "bg-red-500";
    default:
      return "bg-slate-500";
  }
};

const IdeaDetailsCard = ({
  idea,
  user,
  refresh,
}: {
  idea: TIdea;
  user: TAuthor;
  refresh: () => void;
}) => {
  const router = useRouter();
  const isUpvoted = idea.up_votes > 0;
  const isDownvoted = idea.down_votes > 0;

  const addVote = async (value: string) => {
    try {
      const res = await createVote({ blogId: idea.id, value });
      if (res.success) refresh();
    } catch (error) {
      console.error(error);
    }
  };

  const removeVote = async () => {
    try {
      const res = await undoVote({ blogId: idea.id });
      if (res.success) refresh();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteBlog = async (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await deleteMyBlog(id);
          if (res?.success) {
            toast.success("Blog deleted successfully");
            router.push(`/${user?.role}/dashboard/my-blogs`);
          }
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
        } catch (error) {
          console.error(error);
        }
      }
    });
  };

  if (!idea) {
    return (
      <div className="text-center py-10 text-muted-foreground">Loading...</div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto min-h-[calc(100vh-100px)] p-4 my-4 shadow-lg bg-amber-50  border rounded-md">
      {/* Images */}
      {idea.images?.length > 0 && (
        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000 }}
          loop
          className="rounded-xl mb-6">
          {idea.images.map((img, idx) => (
            <SwiperSlide key={idx}>
              <Image
                src={img}
                alt={`Blog Image ${idx + 1}`}
                width={800}
                height={800}
                className="rounded-xl w-full h-[500px] object-fill border-2"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      {/* Top Row: Category & Actions */}
      <div className="flex justify-between items-center">
        <Badge
          variant="outline"
          className={`mb-4 capitalize text-white p-2 ${
            idea.category === "waste"
              ? "bg-yellow-700"
              : idea.category === "energy"
              ? "bg-red-700"
              : "bg-green-700"
          }`}>
          {idea.category}
        </Badge>

        <div className="flex items-center flex-row-reverse gap-2">
          <div
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              idea.isPremium
                ? "bg-purple-700 text-white"
                : "bg-gray-300 text-gray-800"
            }`}>
            {idea.isPremium ? `Premium - $${idea.price}` : "Free"}
          </div>

          {idea.isPremium && (
            <button
              className="bg-green-600 hover:bg-green-700 text-sm cursor-pointer text-white font-medium px-2 py-2 rounded-lg transition"
              onClick={() => alert("Redirecting to payment...")}>
              Pay ${idea.price}
            </button>
          )}
        </div>
      </div>

      {/* Title, Author, Price */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-green-800 mb-1">
            {idea.title}
          </h1>
          <p className="text-muted-foreground mb-2 text-xs">
            Posted on{" "}
            {idea.createdAt ? format(new Date(idea.createdAt), "PPP") : "N/A"}{" "}
            by <span className="text-green-700 font-medium">{user?.name}</span>
          </p>
        </div>
        {user && (
          <div className="flex items-center gap-4">
            <Link
              href={`/member/dashboard/my-blogs/update/${idea.id}`}
              className="cursor-pointer">
              <Edit className="text-green-600" />
            </Link>
            <button
              onClick={() => deleteBlog(idea.id)}
              className="cursor-pointer">
              <Trash className="text-red-600" />
            </button>
          </div>
        )}
      </div>

      {/* Description */}
      <p className="text-base text-gray-700 mt-4 text-justify">
        {idea.description}
      </p>

      {/* Problem & Solution */}
      <div className="mt-2 space-y-2">
        <div>
          <h2 className="text-xl font-semibold text-green-700 mb-1">
            Problem Statement
          </h2>
          <p className="text-gray-800 text-justify">{idea.problem_statement}</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-green-700 mb-1">
            Proposed Solution
          </h2>
          <p className="text-gray-800 text-justify">{idea.proposed_solution}</p>
        </div>

        {/* Status and Voting */}
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div
            className={`px-3 py-1 rounded-full text-white text-sm font-medium ${getStatusColor(
              idea.status
            )}`}>
            Status: {idea.status}
          </div>

          <div className="flex gap-4 mt-1">
            <div className="flex gap-2 bg-green-500 px-2 py-1 rounded-full">
              {/* Upvote */}
              <div className="flex gap-0.5 border-r cursor-pointer pr-1 text-white text-[19px]">
                {isUpvoted ? (
                  <BiSolidLike onClick={removeVote} />
                ) : (
                  <AiOutlineLike onClick={() => addVote("up")} />
                )}
                <p className="text-sm">{idea.up_votes}</p>
              </div>
              {/* Downvote */}
              <div className="flex gap-0.5 cursor-pointer pr-1 text-white text-[19px]">
                {isDownvoted ? (
                  <AiFillDislike onClick={removeVote} />
                ) : (
                  <AiOutlineDislike onClick={() => addVote("down")} />
                )}
                <p className="text-sm">{idea.down_votes}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IdeaDetailsCard;
