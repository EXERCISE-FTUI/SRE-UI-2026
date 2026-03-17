import { sql } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
    try {
        const { news_id, title, cover_url, content, is_recommended } = await req.json();
        const result = await sql`
            update news set title = ${title}, cover_url = ${cover_url}, content = ${content}, is_recommended = ${is_recommended} where news_id = ${news_id}  returning *
        `;

        if (result.length == 0) {
            return NextResponse.json({
                success: false,
                message: "news tidak ditemukan"
            }, {
                status: 404
            });
        }

        return NextResponse.json({
            success: true,
            message: "Berhasil mengedit news",
            data: result[0]
        }, {
            status: 200
        });
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: error
        }, {
            status: 500
        });
    }
} 