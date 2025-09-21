import Link from "next/link";
import { Button } from "./ui/button";
import { createClient } from "@/lib/supabase/server";

export async function AuthButton() {
  const supabase = await createClient();

  const { data } = await supabase.auth.getClaims();

  const user = data?.claims;

  return user ? (
    <div className="flex items-center gap-4">
      <Link href={"/dashboard"}>
        <Button>
          Dashboard
        </Button>
      </Link>
    </div>
  ) : (
    <div className="flex gap-8 items-center">
        <Link href="/auth/login">Sign in</Link>
      <Button asChild size="lg" variant={"default"} className="bg-black hover:shadow-md hover:shadow-blue-950 transition-all duration-300">
        <Link href="/auth/sign-up">Sign up</Link>
      </Button>
    </div>
  );
}
