"use client";

import { usePathname } from "next/navigation";
import Footer from "@/components/footer";

export default function FooterController() {
  const pathname = usePathname() || "";
  const hideFooter = /^\/dashboard\/assignments\/(?!new\/?$)[^/]+\/?$/.test(pathname) || 
                     pathname === "/auth/login" || 
                     pathname === "/auth/sign-up" || 
                     pathname === "/auth/sign-up-success" ||
                     pathname === "/auth/forgot-password" ||
                     pathname === "/auth/update-password";

  if (hideFooter) return null;
  return <Footer />;
}


