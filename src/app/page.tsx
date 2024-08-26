import Link from "next/link";
import { FaGithub } from "react-icons/fa";

import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex w-max flex-col gap-y-4">
      Hello Notes
      <Button asChild variant={"outline"}>
        <Link href="https://github.com/Jay-Karia/notes" target="_blank">
          <FaGithub className="mr-2 h-4 w-4" />
          Source
        </Link>
      </Button>
    </div>
  );
}
