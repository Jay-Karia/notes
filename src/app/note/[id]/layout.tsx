import localFont from "next/font/local";
import { cn } from "@/lib/utils";

const headingFont = localFont({
  src: "../../../../public/fonts/font.woff2",
});

export default function NoteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="p-4 pl-8 pt-8">
      <h3
        className={cn(
          "w-full min-w-24 scroll-m-20 border-b border-black text-2xl font-normal tracking-tight lg:w-[650px]",
          headingFont.className
        )}
      >
        Note
      </h3>
      {children}
    </div>
  );
}
