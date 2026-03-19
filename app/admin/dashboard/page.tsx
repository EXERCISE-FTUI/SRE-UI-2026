"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AdminSession } from "@/app/types/types";

export default function AdminLoginPage() {
    const [adminSession, setAdminSession] = useState<AdminSession | null>(null);
    const router = useRouter();
    useEffect(() => {
        const checkAuth = () => {
            const session = localStorage.getItem("admin_session");
            if (!session) {
                ("No admin session found, redirecting to login");
                router.push("/admin/login");
                return null;
            }
            try {
                const parsed = JSON.parse(session) as AdminSession;
                return parsed;
            } catch (error) {
                console.error("Error parsing admin session:", error);
                localStorage.removeItem("admin_session");
                router.push("/admin/login");
                return null;
            }
        };

        const admin = checkAuth();
        if (admin) {
            setAdminSession(admin);
        }

    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem("admin_session");
        router.push("/admin/login");
    };

    const handleArticles = () => {
        router.push("/admin/articles");
    }

    const handleNews = () => {
        router.push("/admin/news");
    }

    return (
        <div className="flex min-h-screen w-full  items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
            <div className="relative w-100 max-md:w-full h-125 flex justify-center items-center flex-col gap-y-10">
                <h1 className="text-[60px] font-bold text-center text-green1">
                    Hello, {adminSession?.username}
                </h1>

                <div className="relative w-full h-auto flex justify-center items-center flex-col gap-y-5">
                    <button 
                        className="w-full h-10 rounded-2xl bg-button-admin transition-transform duration-200 hover:scale-105"
                        onClick={handleArticles}
                    >
                        <h1 className="text-white">Article Management</h1>
                    </button>

                    <button 
                        className="w-full h-10 rounded-2xl bg-button-admin transition-transform duration-200 hover:scale-105"
                        onClick={handleNews}
                    >
                        <h1 className="text-white">
                            News Management
                        </h1>
                    </button>

                    <button 
                        className="w-1/2 h-10 rounded-2xl bg-red-900 transition-transform duration-200 hover:scale-105"
                        onClick={handleLogout}
                    >
                        <h1 className="text-white">
                            Logout
                        </h1>
                    </button>
                </div>
            </div>
        </div>
    );
}