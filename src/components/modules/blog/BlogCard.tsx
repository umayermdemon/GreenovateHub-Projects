"use client";
import { TBlog } from "@/types/blog.types";
import Image from "next/image";
import { SlOptions } from "react-icons/sl";
import { formatDistanceToNow } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Edit, Eye, Trash } from "lucide-react";
import { deleteMyBlog } from "@/services/blog";
import Swal from "sweetalert2";
import Link from "next/link";
import { useUser } from "@/context/UserContext";
import { Badge } from "@/components/ui/badge";
import { createVote, isUserVoted, undoVote } from "@/services/vote";
import { AiFillDislike, AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
import { BiSolidLike } from "react-icons/bi";
import { useEffect, useState } from "react";

interface IBlogCard {
  data: TBlog;
  userId: string | undefined;
  refresh: () => void
}
export interface TIsVoted {
  value?: "up" | "down",
  isVoted: boolean
}

const BlogCard = ({ data, userId, refresh }: IBlogCard) => {
  const [vote, setVote] = useState<TIsVoted>({} as TIsVoted);
  useEffect(() => {
    const fetchIsVoted = async () => {
      const blogData = {
        blogId: data.id
      }
      try {
        const res = await isUserVoted(blogData)
        if (res) {
          setVote(res.data)
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchIsVoted()
  }, [data, userId])
  const timeAgo = formatDistanceToNow(new Date(data.createdAt), {
    addSuffix: true,
  })
  const { user } = useUser();
  const addVote = async (value: string) => {
    const voteData = {
      blogId: data.id,
      value
    }
    try {
      const res = await createVote(voteData);
      if (res.success) {
        refresh()
      }
    } catch (error) {
      console.log(error);
    }
  }
  const removeVote = async () => {
    const voteData = {
      blogId: data.id
    }
    try {
      const res = await undoVote(voteData);
      if (res.success) {
        refresh()
      }
    } catch (error) {
      console.log(error);
    }
  }
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
          console.log(res);
          if (res.success) {
          }
        } catch (error) {
          console.log(error);
        }
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };

  return (
    <div>
      <div className="flex flex-col bg-green-50 relative border-green-500 border rounded-md">
        <div className="flex  relative">
          <Image
            className="w-full rounded-t-md"
            src={data.images[0]}
            alt="image"
            height={200}
            width={300}
          />
        </div>
        <div className="flex justify-between mx-4 mt-3">
          <Badge
            variant="outline"
            className={`mb-4 capitalize text-white p-2 ${data?.category === "waste"
              ? "bg-yellow-700"
              : data.category === "energy"
                ? "bg-red-700"
                : "bg-green-700"
              }`}>
            {data?.category}
          </Badge>
          <div className="text-[15px] cursor-pointer">
            <Popover>
              <PopoverTrigger className=" hover:bg-green-500 rounded-sm hover:text-white">
                <SlOptions className="cursor-pointer  w-[30px] h-[25px]  px-0.5 py-1" />
              </PopoverTrigger>
              <PopoverContent className="w-[130px] border border-green-500 bg-amber-50 px-1 py-1">
                <div>
                  <ul className="divide-y divide-gray-200">
                    <Link
                      href={
                        user
                          ? `/member/dashboard/my-blogs/details/${data.id}`
                          : `/blogs/${data.id}`
                      }
                      passHref>
                      <li className="cursor-pointer hover:bg-green-500 flex gap-1 hover:text-white px-1 text-green-500 pb-0.5">
                        <Eye className="relative top-1 " size={17} />
                        View
                      </li>
                    </Link>
                    {userId === data.authorId && (
                      <>
                        <Link
                          href={`/member/dashboard/my-blogs/update/${data.id}`}>
                          <li className="cursor-pointer flex gap-1 hover:bg-green-500 hover:text-white px-1  pt-0.5 border-t border-green-500 text-green-500">
                            <Edit className="relative top-1" size={17} />
                            Update
                          </li>
                        </Link>
                        <li
                          onClick={() => deleteBlog(data.id)}
                          className="cursor-pointer flex gap-1 hover:bg-red-500 hover:text-white px-1 border-t border-green-500 text-red-500 pt-0.5">
                          <Trash className="relative top-1" size={17} /> Delete
                        </li>
                      </>
                    )}
                  </ul>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <div className="flex justify-center  p-3">
          <div>
            <h1 className="text-xl font font-semibold">
              {data.title.split(" ").slice(0, 4).join(" ")}
            </h1>
            <p className="border-b border-green-900 pb-2">
              {data.description.split(" ").slice(0, 10).join(" ")}
            </p>
            <div className="flex justify-between pt-1">
              <p className="text-sm text-sky-400 italic">
                {timeAgo.split(" ").slice(1, 3).join(" ")} ago
              </p>
              <div className="flex gap-4 mt-1">
                <div className="flex gap-2 bg-green-500 px-2 py-1 rounded-full">
                  <div className="flex gap-0.5 border-r cursor-pointer pr-1 text-white text-[19px]">
                    <p>
                      {
                        vote?.isVoted && vote?.value === "up" ? <BiSolidLike onClick={removeVote} /> : <AiOutlineLike onClick={() => addVote("up")} />
                      }
                    </p>
                    <p className="text-sm">{data.up_votes || 0}</p>
                  </div>
                  <p className=" cursor-pointer pr-1 text-white text-[19px]">
                    {
                      vote?.isVoted && vote?.value === "down" ? <AiFillDislike onClick={removeVote} /> : <AiOutlineDislike onClick={() => addVote("down")} />
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
