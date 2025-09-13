import { sql } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const username = searchParams.get("username");

  if (!username) {
    return NextResponse.json({ available: false }, { status: 400 });
  }

  const rows = await sql`SELECT id FROM users WHERE username = ${username}`;

  return NextResponse.json({ available: rows.length === 0 });
}
