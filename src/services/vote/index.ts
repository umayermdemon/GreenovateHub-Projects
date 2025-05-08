import { FieldValues } from "react-hook-form";
import Cookies from "js-cookie";

export const createVote = async (data: FieldValues) => {
    try {
        const token = Cookies.get("accessToken");

        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/votes/create-vote`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                ...(token && { Authorization: token }), // only include if token exists
            },
            body: JSON.stringify(data),
        });

        // Check if response is OK
        if (!res.ok) {
            console.error("Response not OK:", res.status, res.statusText);
            return { success: false, status: res.status, message: res.statusText };
        }

        const result = await res.json();
        return result;
    } catch (error) {
        console.error("Vote submission failed:", error);
        return { success: false, message: "Network or server error." };
    }
};
export const undoVote = async (data: FieldValues) => {
    try {
        const token = Cookies.get("accessToken");

        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/votes/remove-vote`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                ...(token && { Authorization: token }), // only include if token exists
            },
            body: JSON.stringify(data),
        });

        // Check if response is OK
        if (!res.ok) {
            console.error("Response not OK:", res.status, res.statusText);
            return { success: false, status: res.status, message: res.statusText };
        }

        const result = await res.json();
        return result;
    } catch (error) {
        console.error("Vote submission failed:", error);
        return { success: false, message: "Network or server error." };
    }
};
