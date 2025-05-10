"use server";

import { revalidateTag } from "next/cache";
import { ParamValue } from "next/dist/server/request/params";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

export const createIdea = async (ideaData: FieldValues) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/ideas/create-idea`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: (await cookies()).get("accessToken")!.value,
        },
        body: JSON.stringify(ideaData),
      }
    );
    revalidateTag("Ideas");
    const result = await res.json();
    return result;
  } catch (error) {
    return Error(error as string);
  }
};
export const getMyIdeas = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/ideas/get-my-ideas`,
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Authorization: (await cookies()).get("accessToken")!.value,
        },
        next: {
          tags: ["Ideas"],
        },
      }
    );
    const result = await res.json();
    return result;
  } catch (error) {
    return Error(error as string);
  }
};
export const getAllIdeas = async (options?: { category?: string, searchTerm?: string }) => {
    try {
        const params = new URLSearchParams();
        if (options?.searchTerm) {
            params.append("searchTerm", options.searchTerm);
        }
        if (options?.category) {
            params.append("category", options.category);
        }

 const query = params.toString() ? `?${params.toString()}` : "";
        const res = await fetch(

            `${process.env.NEXT_PUBLIC_BASE_URL}/ideas/get-all-ideas${query}`,
            {
                method: "GET",
                headers: {
                    "content-type": "application/json",
                    Authorization: (await cookies()).get("accessToken")!.value,
                },
            }
        );
        const result = await res.json();
        return result;
    } catch (error) {
        return Error(error as string);
    }
};
export const getSingleIdea = async (id: ParamValue) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/ideas/get-idea/${id}`,
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Authorization: (await cookies()).get("accessToken")!.value,
        },
      }
    );
    const result = await res.json();
    return result;
  } catch (error) {
    return Error(error as string);
  }
};
