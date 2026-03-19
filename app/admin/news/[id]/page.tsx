"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import FileUpload from "@/components/FileUpload"
import { useForm } from "react-hook-form"
import { useRouter, useParams } from "next/navigation"
import { NewsType, ResponseType } from "@/app/types/types"

import dynamic from "next/dynamic"
import "react-quill-new/dist/quill.snow.css"
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false })

export default function EditNewsPage() {
    const params = useParams();
    const router = useRouter();
    const [news, setNews] = useState<NewsType>();
    const [title, setTitle] = useState<string>("")
    const [content, setContent] = useState("")
    const [cover, setCover] = useState<File | string | null>(null)
    const [coverUrl, setCoverUrl] = useState("")
    const [is_recommended, setIs_recommended] = useState(false);
    const form = useForm({
        defaultValues: {
            title: "",
            coverUrl: "",
            content: "",
            is_recommended: false,
        }
    })

    useEffect(() => {
        const getNews = async () => {
            try {
                const res = await fetch(`/api/admin/get-news1?news_id=${params.id}`, {
                    method: "GET"
                });

                if (!res.ok) {
                    alert("Fetch tidak berhasil");
                }

                const resData : ResponseType<NewsType> = await res.json();
                if (resData.success) {
                    setNews(resData.data);
                } else {
                    alert(resData.message);
                }
            } catch (error) {
                console.error(error);
            }
        }

        getNews();
    }, [])

    useEffect(() => {
        if (news?.title && news?.cover_url && news?.content) {
            setTitle(news.title);
            setCover(news.cover_url);
            setContent(news.content);
            setCoverUrl(news.cover_url);
            setIs_recommended(news.is_recommended);
        }

    }, [news])

    const handleFileUpload = async (
        file: File | string | null,
        fileType: string
    ) => {
        if (!file) {
            if (fileType === "cover") {
                form.setValue("coverUrl", "")
                setCoverUrl("")
            }
            localStorage.setItem("formData", JSON.stringify(form.getValues()))
            return
        }

        if (typeof file === "string") return

        if (!file.type.includes("image")) {
            console.log("Only images are allowed")
            return
        }

        try {
            const uploadFormData = new FormData()
            uploadFormData.append("file", file)

            const response = await fetch("/api/admin/upload-cover", {
                method: "POST",
                body: uploadFormData
            })

            const data = await response.json()
            console.log(JSON.stringify(data));
            
            if (fileType === "cover") {
                form.setValue("coverUrl", data.coverUrl)
                setCoverUrl(data.coverUrl)  
                setCover(data.coverUrl)
            }

            localStorage.setItem("formData", JSON.stringify(form.getValues()))
        } catch (error) {
            console.log(error)
        }
    }

    const handleSubmit = async () => {
        const payload = {
            news_id: params.id,
            title,
            cover_url: coverUrl,
            content,
            is_recommended
        }

        if (!title || !coverUrl || !content) {
            alert("News belum lengkap!");
            return;
        }

        const res = await fetch("/api/admin/edit-news", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        })

        if (res.ok) {
            alert("news edited!");
            router.push('/admin/news');
        }
    }

    return (
        <div className="flex justify-center w-full py-16 bg-gray-50">
            <div className="w-225 max-md:w-full max-md:px-5 flex flex-col gap-8">
                <input
                    placeholder="Insert your title here"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="text-center text-4xl max-md:text-2xl text-green1 max-md:w-full font-bold outline-none border-b pb-3"
                />

                <div className="w-75 max-md:w-full">
                    <FileUpload
                        label="Upload Cover Picture"
                        acceptedFormats=".png,.jpg,.jpeg"
                        maxSize={1}
                        file={cover}
                        onChange={(file) => {
                            setCover(file)  
                            handleFileUpload(file, "cover")
                        }}
                    />
                </div>

                <label className="text-green1 font-bold text-[15px] flex justify-start  items-center">
                    <input 
                        type="checkbox"
                        checked={is_recommended}
                        onChange={(e) => setIs_recommended(e.target.checked)}
                        className="mr-2"
                    />

                    Recommend
                </label>

                <div className="bg-white rounded-lg border">
                    <style>{`
                        .ql-editor { color: black; }
                    `}</style>
                    <ReactQuill
                        theme="snow"
                        value={content}
                        onChange={setContent}
                        placeholder="Write your news here..."
                        className="h-75"
                    />
                </div>

                <div className="flex justify-end mt-10">
                    <Button onClick={handleSubmit} className="bg-green1 px-6 text-white">
                        Save
                    </Button>
                </div>
            </div>
        </div>
    )
}