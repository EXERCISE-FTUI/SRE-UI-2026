import { sql } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { title, cover_url, content, is_recommended } = await req.json();

        if (!title || !cover_url || !content) {
            return NextResponse.json({
                success: false,
                error: "Tidak lengkap!",
            }, { status: 400 })
        }

        const result = await sql`
            insert into articles (title, cover_url, content, is_recommended) values (${title}, ${cover_url}, ${content}, ${is_recommended}) returning *
        `;

        return NextResponse.json({
            success: true,
            message: "Berhasil membuat artikel",
            payload: result
        }, {
            status: 200
        });
    } catch (err) {
        return NextResponse.json(
            { success: false, message: "Error menyimpan" },
            { status: 500 }
        );
    }
}