"use client";
import { TBlog } from "@/types/blog.types";
import Image from "next/image";
import { SlOptions } from "react-icons/sl";
import { formatDistanceToNow } from 'date-fns';
import { MdOutlineInsertComment } from "react-icons/md";
import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
import { BiSolidLike } from "react-icons/bi";
import { useState } from "react";
import { createVote, undoVote } from "@/services/vote";
import { AiFillDislike } from "react-icons/ai";


interface IBlogCard {
    data: TBlog,
    refresh: () => void;
}
const BlogCard = ({ data, refresh }: IBlogCard) => {
    const timeAgo = formatDistanceToNow(new Date(data.createdAt), { addSuffix: true });
    const [isLiked, setIsLiked] = useState(false);
    const [isDisLiked, setIsDisLiked] = useState(false);
    const isUpvoted = data.up_votes > 0;
    const isDownvoted = data.down_votes > 0;
    const addVote = async (value: string) => {
        const voteData = {
            blogId: data.id,
            value: value
        }
        try {
            const res = await createVote(voteData);
            if (res.success) {
                if (isDisLiked) {
                    setIsDisLiked(false)
                }
                refresh();
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
    }
    const addDisLike = async () => {
        setIsDisLiked(true);
        addVote("down");
    }
    const removeDisLike = async () => {
        removeVote()
    }

    return (
        <div>
            <div className="flex flex-col bg-green-50 relative border-green-500 border rounded-md">
                <div className="flex  relative">
                    <Image className="w-full rounded-t-md" src={data.images[0]} alt="blogImg" height={200} width={300} />
                </div>
                <div className="flex justify-between mx-4 mt-3">
                    <p className="  bg-green-900 text-white px-2 rounded-full">{data.category}</p>
                    <p className="text-[15px] cursor-pointer"><SlOptions />
                    </p>
                </div>
                <div className="flex justify-center  p-3">
                    <div>
                        <h1 className="text-xl font font-semibold">{data.title.split(' ').slice(0, 4).join(" ")}</h1>
                        <p className="border-b border-green-900 pb-2">{data.description.split(' ').slice(0, 13).join(" ")}</p>
                        <div className="flex justify-between pt-1">
                            <p className="text-sm text-sky-400 italic">{timeAgo.split(' ').slice(1, 3).join(' ')} ago</p>
                            <div className="flex gap-4 mt-1">
                                <div className="flex gap-2 bg-green-500 px-2 py-1 rounded-full">
                                    <div className="flex gap-0.5 border-r cursor-pointer pr-1 text-white text-[19px]">
                                        <p >
                                            {
                                                isLiked || isUpvoted ? <BiSolidLike onClick={removeVote} /> : <AiOutlineLike onClick={() => addVote("up")} />
                                            }
                                        </p>

                                        <p className="text-sm">{data.up_votes || 0}</p>
                                    </div>
                                    <p className=" cursor-pointer pr-1 text-white text-[19px]">
                                        {
                                            isDisLiked || isDownvoted ? <AiFillDislike onClick={removeDisLike} /> : <AiOutlineDislike onClick={addDisLike} />

                                        }

                                    </p>
                                </div>
                                <p className="mt-1">
                                    <MdOutlineInsertComment className="text-green-500 text-[20px] cursor-pointer" />
                                </p>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    );
};

export default BlogCard;