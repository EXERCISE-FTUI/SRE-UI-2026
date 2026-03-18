import "server-only";

import { sql } from "@/lib/db";
import type { Article, News } from "@/types/database";

export async function getAllNews(): Promise<News[]> {
    const rows = (await sql`
        SELECT news_id, title, slug, cover_url, content, created_at, updated_at, is_recommended
        FROM news
        ORDER BY created_at DESC
    `) as News[];

    return rows;
}

export async function getNewsBySlug(slug: string): Promise<News | null> {
    const rows = (await sql`
        SELECT news_id, title, slug, cover_url, content, created_at, updated_at, is_recommended
        FROM news
        WHERE slug = ${slug}
        LIMIT 1
    `) as News[];

    return rows.length > 0 ? rows[0] : null;
}

export async function getRecommendedNews(): Promise<News[]> {
    const rows = (await sql`
        SELECT news_id, title, slug, cover_url, content, created_at, updated_at, is_recommended
        FROM news
        WHERE is_recommended = true
        ORDER BY created_at DESC
        LIMIT 4
    `) as News[];

    return rows;
}

export async function getAllArticles(): Promise<Article[]> {
    const rows = (await sql`
        SELECT article_id, title, slug, cover_url, content, created_at, updated_at, is_recommended
        FROM articles
        ORDER BY created_at DESC
    `) as Article[];

    return rows;
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
    const rows = (await sql`
        SELECT article_id, title, slug, cover_url, content, created_at, updated_at, is_recommended
        FROM articles
        WHERE slug = ${slug}
        LIMIT 1
    `) as Article[];

    return rows.length > 0 ? rows[0] : null;
}

export async function getRecommendedArticles(): Promise<Article[]> {
    const rows = (await sql`
        SELECT article_id, title, slug, cover_url, content, created_at, updated_at, is_recommended
        FROM articles
        WHERE is_recommended = true
        ORDER BY created_at DESC
        LIMIT 4
    `) as Article[];

    return rows;
}