export interface BaseContentRecord {
    title: string;
    slug: string;
    cover_url: string;
    content: string;
    created_at: Date;
    updated_at: Date;
    is_recommended: boolean;
}

export interface News extends BaseContentRecord {
    news_id: string;
}

export interface Article extends BaseContentRecord {
    article_id: string;
}