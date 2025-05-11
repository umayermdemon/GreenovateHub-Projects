"use client";
import Image from "next/image";
import { SlOptions } from "react-icons/sl";
import { formatDistanceToNow } from "date-fns";
import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
import { BiSolidLike } from "react-icons/bi";
import { useState } from "react";
import { createVote, undoVote } from "@/services/vote";
import { AiFillDislike } from "react-icons/ai";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Edit, Eye, Trash2 } from "lucide-react";
import Swal from "sweetalert2";
import Link from "next/link";
import { useUser } from "@/context/UserContext";
import { TIdea } from "@/types/idea.types";
import { deleteMyIdea } from "@/services/idea";

interface IIdeaCard {
  data: TIdea;
  userId: string | undefined;
  refresh: () => void;
}

const IdeaCard = ({ data, refresh, userId }: IIdeaCard) => {
  const timeAgo = formatDistanceToNow(new Date(data.createdAt), {
    addSuffix: true,
  });
  const { user } = useUser();
  const [isLiked, setIsLiked] = useState(false);
  const [isDisLiked, setIsDisLiked] = useState(false);
  const isUpvoted = data.up_votes > 0;
  const isDownvoted = data.down_votes > 0;
  const addVote = async (value: string) => {
    const voteData = {
      blogId: data.id,
      value: value,
    };
    try {
      const res = await createVote(voteData);
      if (res.success) {
        if (isDisLiked) {
          setIsDisLiked(false);
        }
        refresh();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const removeVote = async () => {
    const voteData = {
      blogId: data.id,
    };
    try {
      const res = await undoVote(voteData);
      if (res.success) {
        refresh();
        if (isLiked) {
          setIsLiked(false);
        } else {
          setIsDisLiked(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  const addDisLike = async () => {
    setIsDisLiked(true);
    addVote("down");
  };
  const removeDisLike = async () => {
    removeVote();
  };
  const deleteIdea = async (id: string) => {
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
          const res = await deleteMyIdea(id);
          console.log(res);
          if (res.success) {
            refresh();
          }
        } catch (error) {
          console.log(error);
        }
        Swal.fire({
          title: "Deleted!",
          text: "Your Idea has been deleted.",
          icon: "success",
        });
      }
    });
  };

  return (
    <div>
      <div className="flex flex-col bg-amber-50 relative border-amber-500 border rounded-md lg:h-[450px]">
        <div className="flex  relative">
          <Image
            className="w-[410px] h-[250px] rounded-t-md"
            src={data.images[0] || "https://i.ibb.co.com/7d4G55NY/house-4811590-1280.jpg"}
            alt="image"
            height={200}
            width={300}
          />
        </div>
        <div className="flex justify-between mx-4 mt-3">
          <p className="  bg-green-900 text-white px-2 rounded-full">
            {data.category}
          </p>
          <div className="text-[15px] cursor-pointer">
            <Popover>
              <PopoverTrigger className=" hover:bg-amber-500 rounded-sm hover:text-white">
                <SlOptions className="cursor-pointer  w-[30px] h-[25px]  px-0.5 py-1" />
              </PopoverTrigger>
              <PopoverContent className="w-[130px] border border-amber-500 bg-green-50 px-1 py-1">
                <div>
                  <ul className="divide-y divide-gray-200">
                    <Link
                      href={
                        user
                          ? `/member/dashboard/my-ideas/details/${data.id}`
                          : `/blogs/${data.id}`
                      }
                      passHref>
                      <li className="cursor-pointer hover:bg-amber-500 flex gap-1 hover:text-white px-1 text-amber-600 pb-0.5">
                        <Eye className="relative top-1 " size={17} />
                        View
                      </li>
                    </Link>
                    {userId === data.authorId && (
                      <>
                        <Link
                          href={`/member/dashboard/my-ideas/update/${data.id}`}>
                          <li className="cursor-pointer flex gap-1 hover:bg-amber-500 hover:text-white px-1  pt-0.5 border-t border-amber-500 text-amber-600">
                            <Edit className="relative top-1" size={17} />
                            Update
                          </li>
                        </Link>
                        <li
                          onClick={() => deleteIdea(data.id)}
                          className="cursor-pointer flex gap-1 hover:bg-red-500 hover:text-white px-1 border-t border-amber-500 text-red-500 pt-0.5">
                          <Trash2 className="relative top-1" size={17} /> Delete
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
              <p className="text-sm text-amber-600 italic">
                {timeAgo.split(" ").slice(1, 3).join(" ")} ago
              </p>
              <div className="flex gap-4 mt-1">
                <div className="flex gap-2 bg-amber-500 px-2 py-1 rounded-full">
                  <div className="flex gap-0.5 border-r cursor-pointer pr-1 text-white text-[19px]">
                    <p>
                      {isLiked || isUpvoted ? (
                        <BiSolidLike onClick={removeVote} />
                      ) : (
                        <AiOutlineLike onClick={() => addVote("up")} />
                      )}
                    </p>

                    <p className="text-sm">{data.up_votes || 0}</p>
                  </div>
                  <p className=" cursor-pointer pr-1 text-white text-[19px]">
                    {isDisLiked || isDownvoted ? (
                      <AiFillDislike onClick={removeDisLike} />
                    ) : (
                      <AiOutlineDislike onClick={addDisLike} />
                    )}
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

export default IdeaCard;
