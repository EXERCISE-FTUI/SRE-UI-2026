import { sql } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { username, password } = await req.json();

  const result = await sql`
    SELECT verify_admin(${username}, ${password}) AS valid
  ` as Record<string, any>[];

  if (result[0].valid) {
    return NextResponse.json({ success: true });
  }

  return NextResponse.json(
    { success: false, message: "Invalid credentials" },
    { status: 401 }
  );
}