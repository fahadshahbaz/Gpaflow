"use client";

import { GraduationCap } from "lucide-react";
import Link from "next/link";
import { useActionState } from "react";
import { type AuthState, resetPassword } from "@/lib/supabase/auth";

const initialState: AuthState = {};

export default function ResetPasswordPage() {
	const [state, formAction, pending] = useActionState(
		resetPassword,
		initialState,
	);

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
					<h1 className="text-2xl font-bold text-gray-900">Reset password</h1>
					<p className="mt-2 text-gray-500">Enter your new password</p>
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
									htmlFor="password"
									className="block text-sm font-medium text-gray-600 mb-1.5"
								>
									New Password
								</label>
								<input
									id="password"
									name="password"
									type="password"
									required
									minLength={6}
									className="block w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all"
									placeholder="••••••••"
								/>
							</div>

							<div>
								<label
									htmlFor="confirmPassword"
									className="block text-sm font-medium text-gray-600 mb-1.5"
								>
									Confirm Password
								</label>
								<input
									id="confirmPassword"
									name="confirmPassword"
									type="password"
									required
									minLength={6}
									className="block w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all"
									placeholder="••••••••"
								/>
							</div>
						</div>

						<button
							type="submit"
							disabled={pending}
							className="w-full rounded-xl bg-blue-500 px-4 py-2.5 font-medium text-white transition hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
						>
							{pending ? "Resetting..." : "Reset password"}
						</button>
					</form>
				</div>
			</div>
		</main>
	);
}
