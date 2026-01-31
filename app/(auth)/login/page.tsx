"use client";

import { GraduationCap } from "lucide-react";
import Link from "next/link";
import { useActionState } from "react";
import { type AuthState, signIn } from "@/lib/supabase/auth";

const initialState: AuthState = {};

export default function LoginPage() {
	const [state, formAction, pending] = useActionState(signIn, initialState);

	return (
		<main className="min-h-screen flex items-center justify-center bg-[#f5f5f5] p-4">
			<div className="w-full max-w-md space-y-8">
				<div className="text-center">
					<Link
						href="/"
						className="inline-flex items-center justify-center gap-2.5 mb-6"
					>
						<div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-600">
							<GraduationCap className="h-6 w-6 text-white" />
						</div>
						<span className="text-2xl font-semibold text-gray-900 tracking-tight">
							GPAFlow
						</span>
					</Link>
					<h1 className="text-2xl font-bold text-gray-900">Welcome back</h1>
					<p className="mt-2 text-gray-500">Sign in to your account</p>
				</div>

				<div className="bg-white rounded-2xl p-8 card-shadow border border-gray-100">
					<form action={formAction} className="space-y-5">
						{state.error && (
							<div className="rounded-lg bg-red-50 border border-red-100 p-3 text-sm text-red-600">
								{state.error}
							</div>
						)}

						<div className="space-y-4">
							<div>
								<label
									htmlFor="email"
									className="block text-sm font-medium text-gray-600 mb-1.5"
								>
									Email
								</label>
								<input
									id="email"
									name="email"
									type="text"
									className="block w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all"
									placeholder="you@example.com"
								/>
								{state.fieldErrors?.email && (
									<p className="mt-1 text-sm text-red-500">
										{state.fieldErrors.email[0]}
									</p>
								)}
							</div>

							<div>
								<label
									htmlFor="password"
									className="block text-sm font-medium text-gray-600 mb-1.5"
								>
									Password
								</label>
								<input
									id="password"
									name="password"
									type="password"
									className="block w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all"
									placeholder="••••••••"
								/>
								{state.fieldErrors?.password && (
									<p className="mt-1 text-sm text-red-500">
										{state.fieldErrors.password[0]}
									</p>
								)}
							</div>
						</div>

						<button
							type="submit"
							disabled={pending}
							className="w-full rounded-xl bg-blue-500 px-4 py-2.5 font-medium text-white transition hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
						>
							{pending ? "Signing in..." : "Sign in"}
						</button>

						<div className="text-center">
							<Link
								href="/forgot-password"
								className="text-sm text-gray-500 hover:text-gray-700"
							>
								Forgot your password?
							</Link>
						</div>
					</form>
				</div>

				<p className="text-center text-sm text-gray-500">
					Don&apos;t have an account?{" "}
					<Link
						href="/signup"
						className="font-medium text-blue-500 hover:text-blue-600"
					>
						Sign up
					</Link>
				</p>
			</div>
		</main>
	);
}
