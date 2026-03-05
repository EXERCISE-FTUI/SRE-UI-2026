import { sql } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const username = searchParams.get("username");

        if (!username) {
            return Response.json({ success: false, message: "username tidak ada" }, { status: 400 });
        }

        const result = await sql`
            select id, username, created_at from admins where username = ${username} limit 1
        `;

        if (result.length === 0) {
            return NextResponse.json(
                { success: false, message: "admin tidak ditemukan" },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            data: result[0],
        });
        
    } catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        return NextResponse.json({ success: false, message }, { status: 500 });
    }
}