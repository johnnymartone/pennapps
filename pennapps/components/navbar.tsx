import { AuthButton } from "@/components/auth-button";
import Link from "next/link";
import Image from "next/image";

export default async function Navbar() {
  return (
    <nav className="w-full flex justify-center h-16 sticky top-0 z-50 bg-neutral-900 backdrop-blur-md supports-[backdrop-filter]:bg-white/5 border-b border-white/20 shadow-sm">
      <div className="w-full max-w-7xl mx-auto flex justify-between items-center p-3 px-5 text-sm">
        <div className="flex gap-5 items-center font-semibold">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.png" alt="PlanIt" width={32} height={32} />
            <h1 className="text-2xl font-semibold">PlanIt</h1>
          </Link>
        </div>
        <AuthButton />
      </div>
    </nav>
  );
}


