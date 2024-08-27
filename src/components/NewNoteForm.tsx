"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { noteSchema } from "@/schemas/note";
import { z } from "zod";
import Link from "next/link";

import { Button } from "@/components/ui/button";
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

export default function NewNoteForm() {
  const { toast } = useToast();

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async () => {
      const res = await fetch(`/api/notes/add/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: form.getValues("title"),
          content: form.getValues("content"),
        }),
      });
      return await res.json();
    },
    onSuccess: () => {
      toast({
        title: "Note added",
        variant: "success",
      });
      form.reset();
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  const form = useForm<z.infer<typeof noteSchema>>({
    resolver: zodResolver(noteSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  function onSubmit(values: z.infer<typeof noteSchema>) {
    mutation.mutate();
  }

  return (
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
                  <Textarea {...field} />
                </FormControl>
                <FormDescription>Enter note content</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-4">
            <Button type="submit" variant={"primary"}>
              Add
            </Button>
            <Button variant={"secondary"} asChild>
              <Link href="/">Back</Link>
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
