import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { getSpecificNote } from "@/lib/notes";
import Note from "@/types/note";

export const GET = auth(async function GET(req, { params }) {
  if (!req.auth || !req.auth.user)
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });

  try {
    const userId = req.auth.user.id;
    const id = params?.id as string | undefined;

    if (!id)
      return NextResponse.json({ message: "ID is required" }, { status: 400 });

    const note: Note | null = await getSpecificNote(id);

    if (!note)
      return NextResponse.json(
        { message: "Could not find note" },
        { status: 404 }
      );

    if (note.userId !== userId)
      return NextResponse.json(
        { message: "Unauthorized to view this note" },
        { status: 403 }
      );

    return NextResponse.json({ note });
  } catch {
    return NextResponse.json(
      { message: "Could not fetch note" },
      { status: 500 }
    );
  }
});
