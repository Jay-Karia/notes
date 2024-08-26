import Logo from "./Logo";
import Link from "next/link";
import { Button } from "./ui/button";

export default function Header() {
  return (
    <div className="flex h-12 w-full items-center justify-around border-b p-4">
      <div className="flex items-center space-x-4">
        <Link href="/">
          <Logo />
        </Link>
        <Button variant={"link"} asChild>
          <Link href="/new">New Note</Link>
        </Button>
      </div>
      <div className="flex space-x-4">
        <Button variant={"link"} asChild>
          <Link href="/login">Login</Link>
        </Button>
        <Button variant={"primary"} asChild>
          <Link href="/signup">Sign Up</Link>
        </Button>
      </div>
    </div>
  );
}
