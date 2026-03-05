"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// type
interface AdminSession {
    id: string;
    username: string;
}

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

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md">
                <h1 className="text-green1">
                    Hello, {adminSession?.username}!
                </h1>
            </div>
        </div>
    );
}