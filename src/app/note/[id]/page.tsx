"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type Props = {
  params: {
    id: string;
  };
};

export default function NotePage({ params }: Props) {
  const noteId = params.id;

  const query = useQuery({
    queryKey: ["notes"],
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
              <h2 className="break-words text-2xl font-semibold">
                {query.data.note.title}
              </h2>
              <p className="mt-2 break-words">{query.data.note.content}</p>
              <div className="mt-4 flex gap-4">
                <Button variant={"primary"} asChild>
                  <Link href={`/note/${noteId}/edit`}>Edit</Link>
                </Button>
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
