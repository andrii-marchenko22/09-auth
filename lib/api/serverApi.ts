import { api } from "@/app/api/api";
import { cookies } from "next/headers";
import { nextServer } from "./api";
import { User } from "@/types/user";

export const getUserFromServer = async () => {
  try {
    const cookieStore = await cookies();

    const accessToken = cookieStore.get("accessToken")?.value;
    const refreshToken = cookieStore.get("refreshToken")?.value;

    const cookieHeader = [
      accessToken ? `accessToken=${accessToken}` : null,
      refreshToken ? `refreshToken=${refreshToken}` : null,
    ]
      .filter(Boolean)
      .join("; ");

    const { data } = await api.get("/users/me", {
      headers: {
        Cookie: cookieHeader,
      },
    });

    return data;
  } catch (error) {
    console.error("Failed to fetch user on server:", error);
    return null;
  }
};

export const checkServerSession = async () => {
  const cookieStore = await cookies();
  const { data } = await nextServer.get("/auth/session", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return data;
};

export const getServerMe = async (): Promise<User> => {
  const cookieStore = await cookies();
  const { data } = await nextServer.get("auth/users/me", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};
