import Logo from "./Logo";
import Link from "next/link";
import { Button } from "./ui/button";
import Menu from "./Menu";

import SignInButton from "./auth/SignIn";
import { auth } from "@/auth";
import UserAvatar from "./auth/UserAvatar";
import LogoutButton from "./auth/Logout";

export default async function Header() {
  const session = await auth();
  return (
    <div className="flex h-12 w-full items-center justify-around border-b p-4">
      <div className="flex items-center space-x-4">
        <Link href="/">
          <Logo />
        </Link>
      </div>
      {session?.user ? (
        <>
          <div className="flex items-center">
            <UserAvatar />
            <LogoutButton />
          </div>
        </>
      ) : (
        <>
          <div className="hidden space-x-4 sm:block">
            <SignInButton />
          </div>

          <div className="block sm:hidden">
            <Menu />
          </div>
        </>
      )}
    </div>
  );
}
