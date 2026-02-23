"use client";

import Link from "next/link";
import { useActionState } from "react";
import { type AuthState, forgotPassword } from "@/lib/supabase/auth";

const initialState: AuthState = {};

export default function ForgotPasswordPage() {
	const [state, formAction, pending] = useActionState(
		forgotPassword,
		initialState,
	);

	return (
		<>
			<div className="text-center">
				<h1 className="text-2xl font-bold text-gray-900">Forgot password</h1>
				<p className="mt-2 text-gray-500">
					Enter your email to receive a reset link
				</p>
			</div>

			<div className="bg-white rounded-2xl p-8 card-shadow border border-gray-100">
				<form action={formAction} className="space-y-5">
					{state.error && (
						<div className="rounded-lg bg-red-50 border border-red-100 p-3 text-sm text-red-600">
							{state.error}
						</div>
					)}

					{state.success && (
						<div className="rounded-lg bg-green-50 border border-green-100 p-3 text-sm text-green-600">
							{state.success}
						</div>
					)}

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
							type="email"
							required
							className="block w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all"
							placeholder="you@example.com"
						/>
					</div>

					<button
						type="submit"
						disabled={pending}
						className="w-full rounded-xl bg-blue-500 px-4 py-2.5 font-medium text-white transition hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
					>
						{pending ? "Sending..." : "Send reset link"}
					</button>
				</form>
			</div>

			<p className="text-center text-sm text-gray-500">
				Remember your password?{" "}
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
