import { sql } from "@/lib/db";
import { NextResponse, NextRequest } from "next/server";

export async function DELETE(req: NextRequest) {
    try {
        const params = req.nextUrl.searchParams;
        const article_id = params.get("article_id");

        const result = await sql`
            delete from articles where article_id = ${article_id} returning *
        ` as Record<string, any>[];

        if (result.length == 0) {
            return NextResponse.json({
                success: false,
                message: "Artikel tidak ditemukan"
            }, {
                status: 404
            });
        }

        return NextResponse.json({
            success: true,
            message: "Artikel berhasil dihapus",
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