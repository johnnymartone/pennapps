import { AuthButton } from "@/components/auth-button";
import Link from "next/link";

export default async function Navbar() {
  return (
    <nav className="w-full flex justify-center h-16 sticky top-0 z-50 bg-white/10 backdrop-blur-md supports-[backdrop-filter]:bg-white/40 border-b border-white/20 shadow-sm">
      <div className="w-full max-w-7xl mx-auto flex justify-between items-center p-3 px-5 text-sm">
        <div className="flex gap-5 items-center font-semibold">
          <Link href={"/"}>
            <h1 className="text-2xl font-bold">EduPlan</h1>
          </Link>
        </div>
        <AuthButton />
      </div>
    </nav>
  );
}


