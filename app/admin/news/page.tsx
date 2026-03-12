"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { NewsType, ResponseType } from "@/app/types/types";

export default function NewsPage() {
    const router = useRouter();
    const [news, setNews] = useState<NewsType[]>([]);
    const getNews = async () => {
        try {
            const responseGet = await fetch(`/api/admin/get-news`, {
                method: 'GET',
            })

            if (!responseGet.ok) {
                throw new Error("Failed to fetch news");
            }

            const res: ResponseType<NewsType[]> = await responseGet.json()
            if (res.success) {
                setNews(res.data)
            } else {
                alert(res.message);
            }
        } catch (err) {
            console.error("Failed to fetch news:", err)
        }
    }

    useEffect(() => {
        getNews();
    }, [])

    const handleCreate = () => {
        router.push("/admin/news/create");
    }

    const handleEdit = (news_id: string) => {
        router.push(`/admin/news/${news_id}`);
    }

    const handleDelete = async (news_id: string) => {
        try {
            const resData = await fetch(`/api/admin/delete-news?news_id=${encodeURIComponent(news_id)}`, {
                method: "DELETE"
            })

            const data: ResponseType<NewsType> = await resData.json();
            if (data.success) {
                alert(data.data.title + " berhasil dihapus");
                getNews();
            } else {
                alert(data.message);
            }
        } catch (error) {
            alert(error);
        }
    }

    return (
        <div className="flex min-h-screen w-full items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-40 py-20">
            <div className="relative w-full max-md:w-full h-auto flex justify-start items-center flex-col gap-y-10">
                <div className="absolute  right-0 top-0 flex flex-col gap-y-2">
                    <button
                        className="rounded-full bg-green1 w-20 h-20 max-md:w-10 max-md:h-10 flex justify-center items-center transition-transform duration-200 hover:scale-104"
                        onClick={handleCreate}
                    >
                        <span className="text-[80px] max-md:text-[20px] font-light">+</span>
                    </button>
                    <h1 className="font-bold text-[20px] max-md:text-[12px] text-center text-green1">
                        Create
                    </h1>
                </div>

                <h1 className="text-[60px] w-3/4 max-md:text-[40px] font-bold text-center text-green1">
                    News Management
                </h1>

                <div className="relative w-full h-auto flex justify-center items-center flex-wrap flex-row gap-x-20 gap-y-5 mt-5">
                    {news.map((news) => (
                        <div key={news.news_id} className="w-65">
                            <div
                                className="relative h-45 rounded-xl overflow-hidden bg-gray-300 bg-cover bg-center"
                                style={{ backgroundImage: `url(${news.cover_url})` }}
                            >
                                <div className="absolute bottom-3 left-0 right-0 flex justify-between px-4">
                                    <button
                                        className="bg-green1 w-23.5 text-white px-5 py-1 rounded-full text-sm font-light"
                                        onClick={() => handleEdit(news.news_id)}
                                    >
                                        EDIT
                                    </button>

                                    <button
                                        className="bg-red-500 w-23.5 text-white px-5 py-1 rounded-full text-sm font-light"
                                        onClick={() => handleDelete(news.news_id)}
                                    >
                                        DELETE
                                    </button>
                                </div>
                            </div>

                            <p className="mt-3 text-center text-gray-600 font-medium">
                                {news.title}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}