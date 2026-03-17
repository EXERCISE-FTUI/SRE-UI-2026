import { sql } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const result = await sql`
            select * from news
        `;

        return NextResponse.json({
            success: true,
            message: "Berhasil mendapatkan semua news",
            data: result,
        });
    } catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        return NextResponse.json({ success: false, message }, { status: 500 });
    }
}