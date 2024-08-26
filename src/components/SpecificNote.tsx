import Note from "@/types/note";
import Link from "next/link";
import { Button } from "./ui/button";
import { FaTrash } from "react-icons/fa";

import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

export default function SpecificNote({ note }: { note: Note }) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async () => {
      const res = await fetch(`/api/notes/delete/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: note.id }),
      });
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  return (
    <div className="min-w-44 rounded-lg border-2 p-4 hover:cursor-pointer">
      <Link href={`/note/${note.id}`}>
        <div>
          <h4 className="text-lg font-semibold">{note.title}</h4>
          <p className="text-muted-foreground">{note.content}</p>
        </div>
      </Link>
      <Button
        variant={"ghost"}
        size={"icon"}
        onClick={() => {
          mutation.mutate();
        }}
      >
        <FaTrash />
      </Button>
    </div>
  );
}
