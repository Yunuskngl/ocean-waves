"use client"
import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import AppLayout from "./app-layout";
import { useAuthStore } from "@/app/store/auth-store";
import { initializeApp } from "../actions/initialize-app";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AUTH_ROUTES = ["/login", "/auth/forgot-password"];

const isAuthRoute = (pathname: string): boolean => {
  return AUTH_ROUTES.some((route) => pathname.startsWith(route));
};

export default function AuthLayout({ children }: AuthLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const hasInitializedRef = useRef(false);

  useEffect(() => {
    if (hasInitializedRef.current) return;
    hasInitializedRef.current = true;
    void initializeApp();
  }, []);


  useEffect(() => {
    const isAuthRouteCheck = isAuthRoute(pathname);

    if (!isAuthenticated && !isAuthRouteCheck) {
      router.replace("/login");
      return;
    }

    if (isAuthenticated && isAuthRouteCheck) {
      router.replace("/dashboard");
      return;
    }
  }, [pathname, router, isAuthenticated]);

  if (isAuthRoute(pathname)) {
    if (!isAuthenticated) {
      return <>{children}</>;
    }
    return null;
  }
  
  if (!isAuthenticated) {
    return null;
  }
  
  return <AppLayout>{children}</AppLayout>
}
