import Image from "next/image";
import localFont from "next/font/local";
import { cn } from "@/lib/utils";

const headingFont = localFont({
  src: "../../public/fonts/font.woff2",
});

export default function Logo() {
  return (
    <div className="flex items-center gap-x-1 hover:cursor-pointer hover:opacity-85">
      <Image src="/logo.png" height={30} width={30} alt="Logo" />
      <h4
        className={cn(
          "scroll-m-20 text-xl font-semibold tracking-tight",
          headingFont.className
        )}
      >
        Notes
      </h4>
    </div>
  );
}
