"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import EditToggle from "@/components/EditToggle";

import localFont from "next/font/local";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import EditForm from "@/components/EditForm";

const headingFont = localFont({
  src: "../../../../public/fonts/font.woff2",
});

type Props = {
  params: {
    id: string;
  };
};

export default function NotePage({ params }: Props) {
  const noteId = params.id;
  const [isEditing, setIsEditing] = useState(false);

  const query = useQuery({
    queryKey: ["notes", "note"],
    queryFn: async () => {
      const res = await fetch(`/api/notes/${noteId}`);
      return await res.json();
    },
  });

  return (
    <div className="mt-6">
      {query.isLoading ? (
        <div>Loading...</div>
      ) : query.isError ? (
        <div>Error: {query.error.message}</div>
      ) : (
        <>
          {query.data.note ? (
            <div className="w-full min-w-24 lg:w-[650px]">
              {isEditing ? (
                <div>
                  <EditForm
                    id={noteId}
                    title={query.data.note.title}
                    content={query.data.note.content}
                    setIsEditing={setIsEditing}
                  />
                </div>
              ) : (
                <div>
                  <h2 className="break-words text-2xl font-semibold">
                    {query.data.note.title}
                  </h2>
                  <p className="mt-2 break-words">{query.data.note.content}</p>
                </div>
              )}
              <div className="mt-4 flex gap-4">
                <EditToggle isEditing={isEditing} setIsEditing={setIsEditing} />
                <Button variant={"secondary"} asChild>
                  <Link href="/">Back</Link>
                </Button>
              </div>
            </div>
          ) : (
            <>No note found</>
          )}
        </>
      )}
    </div>
  );
}
