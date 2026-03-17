export type ArticleType = {
    article_id: string
    title: string
    cover_url: string
    content: string
    is_recommended: boolean
    created_at: string
    updated_at: string
}

export type NewsType = {
    news_id: string
    title: string
    cover_url: string
    content: string
    is_recommended: boolean
    created_at: string
    updated_at: string
}

export type ResponseType<T> = {
    success: boolean,
    message: string,
    data: T
}

export type AdminSession = {
    id: string;
    username: string;
}