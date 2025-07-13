"use client";

import { Loader } from "@/components/Loader/Loader";
import { useAuthStore } from "@/lib/store/authStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface AuthLayoutProp {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProp) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const clearIsAuth = useAuthStore((state) => state.clearIsAuthenticated);
  useEffect(() => {
    clearIsAuth();
    router.refresh();
    setLoading(false);
  }, [clearIsAuth, router]);

  return <>{loading ? <Loader /> : children}</>;
};

export default AuthLayout;
