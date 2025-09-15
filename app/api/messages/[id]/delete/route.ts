import { NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { auth } from "@/auth";

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = params;

  const messages = await sql`
    SELECT id FROM messages
    WHERE id = ${id} AND user_id = ${session.user.id}
  `;

  if (messages.length === 0) {
    return NextResponse.json({ error: "Message not found or unauthorized" }, { status: 404 });
  }

  await sql`
    DELETE FROM messages
    WHERE id = ${id}
  `;

  return NextResponse.json({ success: true });
}
