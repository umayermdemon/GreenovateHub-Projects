export const loginUser = async (payload: {
  email: string;
  password: string;
}) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error("Login failed");
  }

  const data = await res.json();
  return data;
};
