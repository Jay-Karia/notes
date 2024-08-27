import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { getNotes } from "@/lib/notes";
import Note from "@/types/note";

export const GET = auth(async function GET(req) {
  if (!req.auth || !req.auth.user)
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });

  try {
    const userId = req.auth.user.id;
    const notes: Note[] | null = await getNotes();

    if (!notes)
      return NextResponse.json({ message: "No notes found" }, { status: 404 });

    const userNotes: Note[] = notes.filter((note) => note.userId === userId);

    return NextResponse.json({ notes: userNotes });
  } catch {
    return NextResponse.json(
      { message: "Could not fetch notes" },
      { status: 500 }
    );
  }
});
