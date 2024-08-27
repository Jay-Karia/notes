import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { deleteNote, getSpecificNote } from "@/lib/notes";

export const DELETE = auth(async function DELETE(req) {
  if (!req.auth || !req.auth.user)
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });

  try {
    const userId = req.auth.user.id;
    const { id } = await req.json();
    if (!id)
      return NextResponse.json({ message: "ID is required" }, { status: 400 });

    const note = await getSpecificNote(id);
    if (!note)
      return NextResponse.json({ message: "Note not found" }, { status: 404 });

    if (note.userId !== userId)
      return NextResponse.json(
        { message: "You are not authorized to delete this note" },
        { status: 403 }
      );

    await deleteNote(id);

    return NextResponse.json({ message: "Note deleted" });
  } catch {
    return NextResponse.json(
      { message: "Could not delete note" },
      { status: 500 }
    );
  }
});
