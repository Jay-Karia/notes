import localFont from "next/font/local";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";
import AllNotes from "@/components/AllNotes";

const headingFont = localFont({
  src: "../../public/fonts/font.woff2",
});

export default function Home() {
  return (
    <div className="flex w-full flex-col justify-center gap-24 pt-4">
      <div className="flex flex-col items-center gap-y-8">
        <div>
          <h1
            className={cn(
              "scroll-m-20 text-center text-3xl font-extrabold tracking-tight lg:text-4xl",
              headingFont.className
            )}
          >
            Welcome to <span className="text-amber-400">Notes</span>
          </h1>
          <p className="text-center text-sm text-muted-foreground">
            Simple note talking application
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center space-x-2 sm:space-x-4">
          <Button size={"sm"} asChild variant={"primary"}>
            <Link href="/new">Add Note</Link>
          </Button>
          <Button size={"sm"} variant={"outline"} asChild>
            <Link href="https://github.com/Jay-Karia/notes" target="_blank">
              <FaGithub className="mr-2" />
              Source
            </Link>
          </Button>
        </div>
      </div>
      <div className="flex justify-center">
        <AllNotes />
      </div>
    </div>
  );
}
