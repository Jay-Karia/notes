import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { addNote } from "@/lib/notes";

export const POST = auth(async function POST(req) {
  if (!req.auth)
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });

  try {
    const { title, content } = (await req.json()) as {
      title: string;
      content: string;
    };

    if (!title || !content)
      return NextResponse.json(
        { message: "Title and content are required" },
        { status: 400 }
      );

    await addNote(title, content);

    return NextResponse.json({ message: "Note added" });
  } catch (error) {
    return NextResponse.json(
      { message: "Could not add note" },
      { status: 500 }
    );
  }
});