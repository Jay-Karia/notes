import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { updateNote, getSpecificNote } from "@/lib/notes";
import Note from "@/types/note";

export const PUT = auth(async function PUT(req) {
  if (!req.auth || !req.auth.user)
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });

  try {
    const userId = req.auth.user.id;
    const { id, title, content } = await req.json();
    if (!id || !title || !content)
      return NextResponse.json(
        { message: "ID, title, and content are required" },
        { status: 400 }
      );

    const note: Note | null = await getSpecificNote(id);

    if (!note)
      return NextResponse.json({ message: "Note not found" }, { status: 404 });

    if (note.userId !== userId)
      return NextResponse.json(
        { message: "You are not authorized to update this note" },
        { status: 403 }
      );

    await updateNote(id, title, content);

    return NextResponse.json({ message: "Note updated" });
  } catch {
    return NextResponse.json(
      { message: "Could not update note" },
      { status: 500 }
    );
  }
});
