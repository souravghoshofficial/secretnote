// app/api/setup/route.ts
import { NextResponse } from "next/server";
import { sql } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { email, username } = await req.json();

    // check if username exists
    const existing = await sql`
      SELECT 1 FROM users WHERE username = ${username}
    `;

    if (existing.length > 0) {
      return NextResponse.json({ error: "Username already taken" }, { status: 400 });
    }

    // update user record
    await sql`
      UPDATE users
      SET username = ${username}
      WHERE email = ${email}
    `;

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to set username" }, { status: 500 });
  }
}
