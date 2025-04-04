"use client";
import React, { useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      // Redirect to the login page if no token is found
      router.push("/");
    }
  }, [router]);

  return <>{children}</>;
};

export default ProtectedRoute;