"use client";

import Link from "next/link";
import { useActionState } from "react";
import { forgotPassword, type AuthState } from "@/lib/supabase/auth";

const initialState: AuthState = {};

export default function ForgotPasswordPage() {
    const [state, formAction, pending] = useActionState(forgotPassword, initialState);

    return (
        <main className="min-h-screen flex items-center justify-center bg-zinc-950 p-4">
            <div className="w-full max-w-md space-y-8">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-white">Forgot password</h1>
                    <p className="mt-2 text-zinc-400">Enter your email to receive a reset link</p>
                </div>

                <form action={formAction} className="mt-8 space-y-6">
                    {state.error && (
                        <div className="rounded-lg bg-red-500/10 border border-red-500/20 p-4 text-sm text-red-400">
                            {state.error}
                        </div>
                    )}

                    {state.success && (
                        <div className="rounded-lg bg-emerald-500/10 border border-emerald-500/20 p-4 text-sm text-emerald-400">
                            {state.success}
                        </div>
                    )}

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-zinc-300">
                            Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            className="mt-1 block w-full rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3 text-white placeholder-zinc-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                            placeholder="you@example.com"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={pending}
                        className="w-full rounded-lg bg-emerald-600 px-4 py-3 font-semibold text-white transition hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-zinc-950 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {pending ? "Sending..." : "Send reset link"}
                    </button>
                </form>

                <p className="text-center text-sm text-zinc-400">
                    Remember your password?{" "}
                    <Link href="/login" className="font-medium text-emerald-500 hover:text-emerald-400">
                        Sign in
                    </Link>
                </p>
            </div>
        </main>
    );
}
