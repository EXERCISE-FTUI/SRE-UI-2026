"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Label } from "@radix-ui/react-label";
import { cn } from "@/lib/utils";
import { InputPassword } from "@/components/ui/InputPassword";

export default function AdminLoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const response = await fetch('/api/admin/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            })

            const data = await response.json();

            if (!data.success) {
                setError(data.message);
                return;
            }

            if (data.success === true) {
                const responseGet = await fetch(`/api/admin/get?username=${username}`, {
                    method: 'GET',
                })

                const dataGet = await responseGet.json();

                if (!dataGet.success) {
                    setError(data.message);
                    return;
                }

                localStorage.setItem("admin_session", JSON.stringify(dataGet.data));
                window.location.href = "/admin/dashboard";
            } else {
                ("Login failed: Invalid credentials");
                setError("Username atau password salah");
            }
        } catch (error: any) {
            console.error("Error during login process:", error);
            setError("Terjadi kesalahan saat login. Silakan coba lagi.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md">
                <div className="bg-white rounded-lg shadow-md p-6 sm:p-8">
                    <div className="flex flex-col items-center">
                        <h2 className="text-center text-2xl font-semibold text-yellow1 mb-6">
                            Login
                        </h2>
                    </div>

                    {error && (
                        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">
                            {error}
                        </div>
                    )}

                    <form className="space-y-6" onSubmit={handleLogin}>
                        <div>
                            <Label
                                htmlFor="username"
                                className="text-sm font-medium text-gray-700 block mb-2"
                            >
                                Username
                            </Label>
                            <input
                                id="username"
                                name="username"
                                type="text"
                                required
                                placeholder="Masukkan username"
                                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green2 focus:border-green2 focus:z-10 sm:text-sm"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>

                        <div>
                            <Label
                                htmlFor="password"
                                className="text-sm font-medium text-gray-700 block mb-2"
                            >
                                Password
                            </Label>
                            <InputPassword
                                id="password"
                                name="password"
                                placeholder="Masukkan password"
                                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green2 focus:border-green2 focus:z-150 sm:text-sm"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={loading}
                                className={cn(
                                    "group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green1 hover:bg-green0 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green0",
                                    loading && "opacity-70 cursor-not-allowed"
                                )}
                            >
                                {loading ? "Memproses..." : "Login"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}