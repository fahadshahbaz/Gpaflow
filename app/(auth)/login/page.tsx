"use client";

import Link from "next/link";
import { useActionState } from "react";
import { signIn, type AuthState } from "@/lib/supabase/auth";

const initialState: AuthState = {};

export default function LoginPage() {
    const [state, formAction, pending] = useActionState(signIn, initialState);

    return (
        <main className="min-h-screen flex items-center justify-center bg-zinc-950 p-4">
            <div className="w-full max-w-md space-y-8">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-white">Welcome back</h1>
                    <p className="mt-2 text-zinc-400">Sign in to your GPA Flow account</p>
                </div>

                <form action={formAction} className="mt-8 space-y-6">
                    {state.error && (
                        <div className="rounded-lg bg-red-500/10 border border-red-500/20 p-4 text-sm text-red-400">
                            {state.error}
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
                        {pending ? "Signing in..." : "Sign in"}
                    </button>

                    <div className="text-center">
                        <Link href="/forgot-password" className="text-sm text-zinc-400 hover:text-zinc-300">
                            Forgot your password?
                        </Link>
                    </div>
                </form>

                <p className="text-center text-sm text-zinc-400">
                    Don&apos;t have an account?{" "}
                    <Link href="/signup" className="font-medium text-emerald-500 hover:text-emerald-400">
                        Sign up
                    </Link>
                </p>
            </div>
        </main>
    );
}
