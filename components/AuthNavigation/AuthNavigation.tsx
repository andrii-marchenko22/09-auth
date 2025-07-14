"use client";

import { useAuthStore } from "@/lib/store/authStore";
import css from "./AuthNavigation.module.css";
import { useRouter } from "next/navigation";
import { logout, checkSession, getMe } from "@/lib/api/clientApi";
import Link from "next/link";
import { useEffect } from "react";

const AuthNavigation = () => {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const setUser = useAuthStore((state) => state.setUser);
  const clearIsAuthenticated = useAuthStore(
    (state) => state.clearIsAuthenticated
  );
  const hasHydrated = useAuthStore((state) => state.hasHydrated);

  const handleLogout = async () => {
    await logout();
    clearIsAuthenticated();
    router.push("/sign-in");
  };

  useEffect(() => {
    const verifySession = async () => {
      const sessionActive = await checkSession();
      if (sessionActive) {
        const userData = await getMe();
        if (userData) {
          setUser(userData);
        } else {
          clearIsAuthenticated();
        }
      } else {
        clearIsAuthenticated();
      }
    };
    verifySession();
  }, [setUser, clearIsAuthenticated]);

  if (!hasHydrated) {
    return null;
  }

  return isAuthenticated ? (
    <>
      <li className={css.navigationItem}>
        <Link href="/profile" prefetch={false} className={css.navigationLink}>
          Profile
        </Link>
      </li>
      <li className={css.navigationItem}>
        <p className={css.userEmail}>User: {user?.username || user?.email}</p>
        <button className={css.logoutButton} onClick={handleLogout}>
          Logout
        </button>
      </li>
    </>
  ) : (
    <>
      <li className={css.navigationItem}>
        <Link href="/sign-in" prefetch={false} className={css.navigationLink}>
          Login
        </Link>
      </li>

      <li className={css.navigationItem}>
        <Link href="/sign-up" prefetch={false} className={css.navigationLink}>
          Sign up
        </Link>
      </li>
    </>
  );
};

export default AuthNavigation;
