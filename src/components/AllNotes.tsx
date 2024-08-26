"use client";

import localFont from "next/font/local";
import { cn } from "@/lib/utils";
import { useState } from "react";

import Note from "@/types/note";

const headingFont = localFont({
  src: "../../public/fonts/font.woff2",
});

export default function AllNotes() {
  const [notes, setNotes] = useState<Note[]>([]);
  return (
    <div className="flex flex-col items-center gap-4">
      <h4
        className={cn(
          "scroll-m-20 border-b text-xl font-semibold tracking-tight",
          headingFont.className
        )}
      >
        All Notes
      </h4>
      <div className="">
        {notes.length === 0 ? (
          <p className="text-sm text-muted-foreground">No Notes found.</p>
        ) : (
          <ul>
            {notes.map((note) => (
              <li key={note.id}>
                <div>
                  <h3>{note.title}</h3>
                  <p>{note.content}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
