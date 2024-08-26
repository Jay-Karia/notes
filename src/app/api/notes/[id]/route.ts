import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { getSpecificNote } from "@/lib/notes";
import Note from "@/types/note";

export const GET = auth(async function GET(req, { params }) {
  if (!req.auth)
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });

  try {
    const id = params?.id as string | undefined;
    if (!id)
      return NextResponse.json({ message: "ID is required" }, { status: 400 });

    const note: Note | null = await getSpecificNote(id);

    if (!note)
      return NextResponse.json(
        { message: "Could not find note" },
        { status: 404 }
      );
    return NextResponse.json({ note });
  } catch {
    return NextResponse.json(
      { message: "Could not fetch note" },
      { status: 500 }
    );
  }
});
