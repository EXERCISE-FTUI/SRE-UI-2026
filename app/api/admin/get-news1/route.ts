import { sql } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const params = req.nextUrl.searchParams;
        const news_id = params.get("news_id");

        const result = await sql`
            select * from news where news_id = ${news_id}
        ` as Record<string, any>[];

        if (result.length == 0) {
            return NextResponse.json({
                success: false,
                message: "News tidak ditemukan",
            }, {
                status: 404
            });
        }

        return NextResponse.json({
            success: true,
            message: "News berhasil didapat",
            data: result[0]
        }, {
            status: 200
        });
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: error,
        }, {
            status: 500
        });
    }
}