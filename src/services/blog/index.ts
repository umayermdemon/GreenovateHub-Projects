"use server";

import { ParamValue } from "next/dist/server/request/params";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

export const createBlog = async (blogData: FieldValues) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/blogs/write-blog`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
                Authorization: (await cookies()).get("accessToken")!.value,
            },
            body: JSON.stringify(blogData),
        });
        const result = await res.json();
        return result;
    } catch (error) {
        return Error(error as string);
    }
};
export const getAllBlogs = async () => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/blogs/get-all-blogs`, {
            method: "GET",
            headers: {
                "content-type": "application/json",
                Authorization: (await cookies()).get("accessToken")!.value,
            },
        });
        const result = await res.json();
        return result;
    } catch (error) {
        return Error(error as string);
    }
};
export const getMyBlogs = async () => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/blogs/get-my-blogs`, {
            method: "GET",
            headers: {
                "content-type": "application/json",
                Authorization: (await cookies()).get("accessToken")!.value,
            },
        });
        const result = await res.json();
        return result;
    } catch (error) {
        return Error(error as string);
    }
};
export const getSingleBlog = async (id: ParamValue) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/blogs/get-single-blog/${id}`, {
            method: "GET",
            headers: {
                "content-type": "application/json",
                Authorization: (await cookies()).get("accessToken")!.value,
            },
        });
        const result = await res.json();
        return result;
    } catch (error) {
        return Error(error as string);
    }
};
export const deleteMyBlog = async (blogId: string) => {
    console.log(blogId, "blogId");
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/blogs/delete-blog/${blogId}`, {
            method: "DELETE",
            headers: {
                "content-type": "application/json",
                Authorization: (await cookies()).get("accessToken")!.value,
            },
        });
        const result = await res.json();
        return result;
    } catch (error) {
        return Error(error as string);
    }
};