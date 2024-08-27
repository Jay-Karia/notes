import Note from "@/types/note";
import Link from "next/link";
import { FaTrash } from "react-icons/fa";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cn } from "@/lib/utils";

import { useToast } from "@/components/ui/use-toast";

const COLORS = [
  "bg-red-50",
  "bg-blue-50",
  "bg-green-50",
  "bg-yellow-50",
  "bg-indigo-50",
  "bg-purple-50",
  "bg-pink-50",
  "bg-gray-100",
  "bg-red-100",
  "bg-blue-100",
  "bg-green-100",
];

export default function SpecificNote({ note }: { note: Note }) {
  const { toast } = useToast();

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
      toast({
        title: "Note deleted",
        variant: "success",
      });
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  function truncate(str: string, n: number): string {
    const length = str.length;
    if (length > n) {
      return str.substring(0, n) + "...";
    }
    return str;
  }

  return (
    <div
      className={cn(
        "mx-4 h-max max-h-80 w-max min-w-72 max-w-96 rounded-3xl p-4",
        COLORS[Math.floor(Math.random() * COLORS.length)]
      )}
    >
      <div>
        <Link href={`/note/${note.id}`}>
          <h4 className="text-lg font-semibold hover:cursor-pointer">
            {truncate(note.title, 35)}
          </h4>
        </Link>
        <p className="hidden text-muted-foreground sm:block">
          {truncate(note.content, 320)}
        </p>
        <p className="block text-muted-foreground sm:hidden">
          {truncate(note.content, 180)}
        </p>
      </div>
      <div className="float-right">
        <FaTrash
          className="mt-6 hover:cursor-pointer"
          onClick={() => {
            mutation.mutate();
          }}
        />
      </div>
    </div>
  );
}
