import { NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { auth } from "@/auth";
import type { NextRequest } from "next/server";

// The context parameter type for dynamic routes
interface Params {
  params: { id: string };
}

export async function DELETE(req: NextRequest, context: Params) {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = context.params;

  // Check if the message belongs to the logged-in user
  const messages = await sql`
    SELECT id FROM messages
    WHERE id = ${id} AND user_id = ${session.user.id}
  `;

  if (messages.length === 0) {
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
