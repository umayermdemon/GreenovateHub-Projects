/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

export const getMe = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/users/my-profile`,
      {
        method: "GET",
        headers: new Headers({
          "content-type": "application/json",
          Authorization: (await cookies()).get("accessToken")?.value || "",
        }),
      }
    );
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const result = await res.json();
    return result;
  } catch (error) {
    console.log(error);
    return Error(error as string);
  }
};
export const getSingleUSer = async (id: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/users/${id}`, {
      method: "GET",
      headers: new Headers({
        "content-type": "application/json",
        Authorization: (await cookies()).get("accessToken")?.value || "",
      }),
    });
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const result = await res.json();
    return result;
  } catch (error) {
    console.log(error);
    return Error(error as string);
  }
};

export const updateMyProfile = async (updateData: FieldValues) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/users/update-profile`,
      {
        method: "PATCH",
        headers: {
          Authorization: (await cookies()).get("accessToken")!.value,
        },
        body: JSON.stringify(updateData),
      }
    );
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};
