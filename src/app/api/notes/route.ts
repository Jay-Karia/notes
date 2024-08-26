import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { getNotes } from "@/lib/notes";
import Note from "@/types/note";

export const GET = auth(async function GET(req) {
  if (!req.auth)
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });

  try {
    const notes: Note[] | null = await getNotes();

    if (!notes)
      return NextResponse.json({ message: "No notes found" }, { status: 404 });
    return NextResponse.json({ notes: notes });
  } catch {
    return NextResponse.json(
      { message: "Could not fetch notes" },
      { status: 500 }
    );
  }
});
