"use server";

import { ParamValue } from "next/dist/server/request/params";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

export const createIdea = async (ideaData: FieldValues) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/ideas/create-idea`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
                Authorization: (await cookies()).get("accessToken")!.value,
            },
            body: JSON.stringify(ideaData),
        });
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