import { api } from "@/app/api/api";
import { cookies } from "next/headers";

export const getUserFromServer = async () => {
  try {
    const cookieStore = cookies();

    const { data } = await api.get("/users/me", {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });
    return data;
  } catch (error) {
    console.error("Failed to fetch user on server:", error);
    return null;
  }
};
