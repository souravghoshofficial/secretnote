import { NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { auth } from "@/auth";
import { encryptMessage, decryptMessage } from "@/lib/crypto";

export async function POST(req: Request) {
  try {
    const { username, content } = await req.json();
    if (!username || !content) {
      return NextResponse.json({ error: "Username and content required" }, { status: 400 });
    }

    const users = await sql`
      SELECT id, accepting_messages FROM users WHERE username = ${username}
    `;
    if (users.length === 0) return NextResponse.json({ error: "User not found" }, { status: 404 });

    const user = users[0];
    if (!user.accepting_messages) {
      return NextResponse.json({ error: "This user is not accepting messages." }, { status: 403 });
    }

    const { ciphertext, iv, authTag } = encryptMessage(content);

    await sql`
      INSERT INTO messages (user_id, encrypted_text, iv, auth_tag)
      VALUES (${user.id}, ${ciphertext}, ${iv}, ${authTag})
    `;

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Error in /api/messages POST:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}


export async function GET() {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const rows = await sql`
      SELECT id, encrypted_text, iv, auth_tag, created_at
      FROM messages
      WHERE user_id = ${session.user.id}
      ORDER BY created_at DESC
    `;

    const messages = rows.map((m: any) => ({
      id: m.id,
      content: decryptMessage(m.encrypted_text, m.iv, m.auth_tag),
      created_at: m.created_at,
    }));

    return NextResponse.json(messages);
  } catch (err) {
    console.error("Error in /api/messages GET:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}