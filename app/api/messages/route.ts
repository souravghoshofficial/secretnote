import { NextResponse } from "next/server";
import { sql } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { username, content } = await req.json();

    if (!username || !content) {
      return NextResponse.json(
        { error: "Username and content are required" },
        { status: 400 }
      );
    }

    // find the user by username
    const users = await sql`
      SELECT id, accepting_messages FROM users WHERE username = ${username}
    `;

    if (users.length === 0) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    const user = users[0];

    if (!user.accepting_messages) {
      return NextResponse.json(
        { error: "This user is not accepting messages." },
        { status: 403 }
      );
    }

    // insert message
    await sql`
      INSERT INTO messages (user_id, content)
      VALUES (${user.id}, ${content})
    `;

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Error in /api/messages:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
