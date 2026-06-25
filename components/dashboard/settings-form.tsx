"use client";

import { Check, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { type AuthState, updateUserName } from "@/lib/supabase/auth";

interface SettingsFormProps {
	initialName: string;
	initialEmail: string;
}

export function SettingsForm({ initialName, initialEmail }: SettingsFormProps) {
	const router = useRouter();
	const [state, formAction, isPending] = useActionState<AuthState, FormData>(
		updateUserName,
		{},
	);

	// Refresh server components to update layouts (like TopNav) on success
	useEffect(() => {
		if (state.success) {
			router.refresh();
		}
	}, [state.success, router]);

	return (
		<div className="w-full max-w-xl mx-auto">
			{/* Settings Card */}
			<div className="bg-white border border-slate-200/60 shadow-sm rounded-2xl overflow-hidden">
				{/* Avatar / Profile Header */}
				<div className="p-6 sm:p-8 border-b border-slate-100 flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
					<div className="h-20 w-20 rounded-full bg-gradient-to-b from-blue-500 to-blue-600 flex items-center justify-center text-white border border-blue-500/20 shadow-sm flex-shrink-0 overflow-hidden">
						<span className="text-3xl font-bold">
							{initialName?.charAt(0)?.toUpperCase() ||
								initialEmail?.charAt(0)?.toUpperCase() ||
								"U"}
						</span>
					</div>
					<div>
						<h1 className="text-2xl font-bold text-slate-900">
							{initialName || "Your Profile"}
						</h1>
						<p className="text-sm text-slate-500 mt-1">{initialEmail}</p>
					</div>
				</div>

				{/* Form Section */}
				<div className="p-6 sm:p-8">
					<form action={formAction} className="space-y-6">
						{/* Name Field */}
						<div>
							<label
								htmlFor="name"
								className="block text-sm font-semibold text-slate-700 mb-2 cursor-pointer"
							>
								Display Name
							</label>
							<input
								type="text"
								id="name"
								name="name"
								defaultValue={initialName}
								placeholder="Enter your display name"
								className="w-full rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20 transition-all"
							/>
						</div>

						{/* Email Field (Read-only) */}
						<div>
							<span className="block text-sm font-semibold text-slate-700 mb-2">
								Email Address
							</span>
							<div className="w-full rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 text-sm text-slate-500 opacity-80 cursor-not-allowed">
								{initialEmail}
							</div>
							<p className="text-xs text-slate-400 font-medium mt-2">
								Email address cannot be changed
							</p>
						</div>

						{/* Status Messages */}
						{state.error && (
							<div className="rounded-xl bg-rose-50 border border-rose-100 p-3.5 animate-in fade-in slide-in-from-top-1 duration-200">
								<p className="text-sm font-medium text-rose-600">
									{state.error}
								</p>
							</div>
						)}

						{state.success && (
							<div className="rounded-xl bg-emerald-50 border border-emerald-100 p-3.5 flex items-center gap-2 animate-in fade-in slide-in-from-top-1 duration-200">
								<Check className="h-4 w-4 text-emerald-500" />
								<p className="text-sm font-medium text-emerald-600">
									{state.success}
								</p>
							</div>
						)}

						{/* Submit Button */}
						<div className="pt-2">
							<Button
								type="submit"
								variant="skeuoPrimary"
								disabled={isPending}
								className="w-full h-11 rounded-xl text-sm font-bold cursor-pointer"
							>
								{isPending ? (
									<>
										<Loader2 className="h-4 w-4 animate-spin mr-2" />
										Saving...
									</>
								) : (
									"Save Changes"
								)}
							</Button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
