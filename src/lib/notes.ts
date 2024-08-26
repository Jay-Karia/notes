"use server";

import db from "@/lib/db";
import Note from "@/types/note";

export async function getNotes(): Promise<Note[] | null> {
  const notes = await db.notes.findMany();

  if (notes && notes.length > 0) {
    return notes;
  }
  return null;
}

export async function addNote(title: string, content: string) {
  await db.notes.create({
    data: {
      title,
      content,
    },
  });
}

export async function getSpecificNote(id: string): Promise<Note | null> {
  const note = await db.notes.findUnique({
    where: {
      id,
    },
  });

  if (note) {
    return note;
  }
  return null;
}

export async function deleteNote(id: string) {
  await db.notes.delete({
    where: {
      id,
    },
  });
}

export async function updateNote(id: string, title: string, content: string) {
  await db.notes.update({
    where: {
      id,
    },
    data: {
      title,
      content,
    },
  });
}
