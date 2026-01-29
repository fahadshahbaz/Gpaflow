"use client";

import Link from "next/link";
import { useActionState } from "react";
import { signUp, type AuthState } from "@/lib/supabase/auth";

const initialState: AuthState = {};

export default function SignupPage() {
    const [state, formAction, pending] = useActionState(signUp, initialState);

    return (
        <main className="min-h-screen flex items-center justify-center bg-zinc-950 p-4">
            <div className="w-full max-w-md space-y-8">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-white">Create account</h1>
                    <p className="mt-2 text-zinc-400">Start tracking your academic journey</p>
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

                    <div className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-zinc-300">
                                Email
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="text"
                                className="mt-1 block w-full rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3 text-white placeholder-zinc-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                                placeholder="you@example.com"
                            />
                            {state.fieldErrors?.email && (
                                <p className="mt-1 text-sm text-red-400">{state.fieldErrors.email[0]}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-zinc-300">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                className="mt-1 block w-full rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3 text-white placeholder-zinc-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                                placeholder="••••••••"
                            />
                            {state.fieldErrors?.password && (
                                <p className="mt-1 text-sm text-red-400">{state.fieldErrors.password[0]}</p>
                            )}
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={pending}
                        className="w-full rounded-lg bg-emerald-600 px-4 py-3 font-semibold text-white transition hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-zinc-950 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {pending ? "Creating account..." : "Create account"}
                    </button>
                </form>

                <p className="text-center text-sm text-zinc-400">
                    Already have an account?{" "}
                    <Link href="/login" className="font-medium text-emerald-500 hover:text-emerald-400">
                        Sign in
                    </Link>
                </p>
            </div>
        </main>
    );
}
