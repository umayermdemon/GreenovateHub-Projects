"use server";

import { cookies } from "next/headers";

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
