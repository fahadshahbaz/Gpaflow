"use client";

import Link from "next/link";
import { useActionState } from "react";
import { type AuthState, signUp, signInWithGoogle } from "@/lib/supabase/auth";
import { GoogleIcon } from "@/components/ui/google-icon";

const initialState: AuthState = {};

export default function SignupPage() {
	const [state, formAction, pending] = useActionState(signUp, initialState);

	return (
		<>
			<div className="text-center">
				<h1 className="text-2xl font-bold text-gray-900">Create account</h1>
				<p className="mt-2 text-gray-500">
					Start tracking your academic journey
				</p>
			</div>

			<div className="bg-white rounded-2xl p-8 card-shadow border border-gray-100">
				{state.error && (
					<div className="rounded-lg bg-red-50 border border-red-100 p-3 text-sm text-red-600 mb-5">
						{state.error}
					</div>
				)}

				{state.success && (
					<div className="rounded-lg bg-green-50 border border-green-100 p-3 text-sm text-green-600 mb-5">
						{state.success}
					</div>
				)}

				{/* Google Sign-Up */}
				<form action={signInWithGoogle}>
					<button
						type="submit"
						className="w-full flex items-center justify-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-2.5 font-medium text-gray-700 transition hover:bg-gray-50 hover:border-gray-300 active:scale-[0.98]"
					>
						<GoogleIcon />
						Continue with Google
					</button>
				</form>

				{/* Divider */}
				<div className="relative my-6">
					<div className="absolute inset-0 flex items-center">
						<div className="w-full border-t border-gray-200" />
					</div>
					<div className="relative flex justify-center text-sm">
						<span className="bg-white px-3 text-gray-400">
							or continue with email
						</span>
					</div>
				</div>

				{/* Email/Password Form */}
				<form action={formAction} className="space-y-5">
					<div className="space-y-4">
						<div>
							<label
								htmlFor="name"
								className="block text-sm font-medium text-gray-600 mb-1.5"
							>
								Name
							</label>
							<input
								id="name"
								name="name"
								type="text"
								className="block w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all"
								placeholder="Your name"
							/>
							{state.fieldErrors?.name && (
								<p className="mt-1 text-sm text-red-500">
									{state.fieldErrors.name[0]}
								</p>
							)}
						</div>

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
						{pending ? "Creating account..." : "Create account"}
					</button>
				</form>
			</div>

			<p className="text-center text-sm text-gray-500">
				Already have an account?{" "}
				<Link
					href="/login"
					className="font-medium text-blue-500 hover:text-blue-600"
				>
					Sign in
				</Link>
			</p>
		</>
	);
}
