import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { noteSchema } from "@/schemas/note";
import { z } from "zod";
import Link from "next/link";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function EditForm({
  id,
  title,
  content,
  setIsEditing,
}: {
  id: string;
  title: string;
  content: string;
  setIsEditing: (value: boolean) => void;
}) {
  const { toast } = useToast();

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async () => {
      const res = await fetch(`/api/notes/update/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: form.getValues("title"),
          content: form.getValues("content"),
          id,
        }),
      });
      return await res.json();
    },
    onSuccess: () => {
      toast({
        title: "Note updated",
        variant: "success",
      });
      queryClient.invalidateQueries({ queryKey: ["notes", "note"] });
      setIsEditing(false);
    },
  });

  const form = useForm<z.infer<typeof noteSchema>>({
    resolver: zodResolver(noteSchema),
    defaultValues: {
      title: title,
      content: content,
    },
  });

  function onSubmit(values: z.infer<typeof noteSchema>) {
    mutation.mutate();
  }
  return (
    <div>
      <div className="w-full min-w-24 lg:w-96">
        {" "}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>Enter note title</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Textarea defaultValue={content} {...field} />
                  </FormControl>
                  <FormDescription>Enter note content</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-4">
              <Button type="submit" variant={"primary"}>
                Save
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
