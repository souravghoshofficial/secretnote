import { auth } from "@/auth";
import { sql } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { accepting } = await req.json();

  const [row] = await sql`
    UPDATE users
    SET accepting_messages = ${accepting}
    WHERE id = ${session.user.id}
    RETURNING accepting_messages
  `;

  return NextResponse.json({ success: true, accepting: row.accepting_messages });
}
