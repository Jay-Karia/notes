import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { deleteNote } from "@/lib/notes";

export const DELETE = auth(async function DELETE(req) {
  if (!req.auth)
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });

  try {
    const { id } = await req.json();
    if (!id)
      return NextResponse.json({ message: "ID is required" }, { status: 400 });

    await deleteNote(id);

    return NextResponse.json({ message: "Note deleted" });
  } catch {
    return NextResponse.json(
      { message: "Could not delete note" },
      { status: 500 }
    );
  }
});
