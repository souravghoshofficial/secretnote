import { NextResponse, type NextRequest } from "next/server";
import { sql } from "@/lib/db";
import { auth } from "@/auth";

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params; // ✅ await since it's a Promise

  // Check if the message belongs to the logged-in user
  const result = await sql`
    SELECT id FROM messages
    WHERE id = ${id} AND user_id = ${session.user.id}
  `;

  if (result.length === 0) {
    return NextResponse.json(
      { error: "Message not found or unauthorized" },
      { status: 404 }
    );
  }

  // Delete the message
  await sql`
    DELETE FROM messages
    WHERE id = ${id}
  `;

  return NextResponse.json({ success: true });
}
