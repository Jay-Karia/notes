"use client";

import localFont from "next/font/local";
import { cn } from "@/lib/utils";
import SpecificNote from "@/components/SpecificNote";
import Note from "@/types/note";

import { useQuery } from "@tanstack/react-query";

const headingFont = localFont({
  src: "../../public/fonts/font.woff2",
});

export default function AllNotes() {
  const query = useQuery({
    queryKey: ["notes"],
    queryFn: async () => {
      const res = await fetch("/api/notes");
      return await res.json();
    },
  });

  return (
    <div className="flex w-full flex-col items-center gap-4">
      <h4
        className={cn(
          "scroll-m-20 border-b text-xl font-semibold tracking-tight",
          headingFont.className
        )}
      >
        All Notes
      </h4>

      <div className="mt-8 flex w-full flex-wrap justify-center gap-12">
        {query.isLoading ? (
          <div>Loading...</div>
        ) : query.isError ? (
          <div>Error: {query.error.message}</div>
        ) : (
          <>
            {query.data.notes ? (
              query.data.notes.map((note: Note) => (
                <SpecificNote key={note.id} note={note} />
              ))
            ) : (
              <>No notes found</>
            )}
          </>
        )}
      </div>
    </div>
  );
}
