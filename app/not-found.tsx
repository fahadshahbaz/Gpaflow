import { GraduationCap, Home } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
    return (
        <main className="min-h-screen bg-[#f5f5f5] flex items-center justify-center px-6">
            <div className="text-center max-w-md">
                {/* Logo */}
                <div className="flex justify-center mb-8">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg shadow-blue-500/20">
                        <GraduationCap className="h-8 w-8 text-white" />
                    </div>
                </div>

                {/* 404 Text */}
                <h1 className="text-8xl font-bold text-gray-900 mb-4 tracking-tight">
                    4<span className="text-blue-500">0</span>4
                </h1>

                <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                    Page not found
                </h2>

                <p className="text-gray-500 mb-8">
                    Sorry, we couldn't find the page you're looking for. It might have
                    been moved or doesn't exist.
                </p>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors"
                    >
                        <Home className="h-4 w-4" />
                        Go home
                    </Link>
                    <Link
                        href="/dashboard"
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white hover:bg-gray-50 text-gray-700 font-medium rounded-lg border border-gray-200 transition-colors"
                    >
                        Dashboard
                    </Link>
                </div>
            </div>
        </main>
    );
}
