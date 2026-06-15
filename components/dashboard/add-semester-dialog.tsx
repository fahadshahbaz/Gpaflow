"use client";

import { Plus } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { createSemester } from "@/lib/supabase/mutations";

const MAX_SEMESTERS = 8;

export function AddSemesterDialog({
	semesterCount = 0,
}: {
	semesterCount?: number;
}) {
	const isMaxReached = semesterCount >= MAX_SEMESTERS;
	const [open, setOpen] = useState(false);
	const [name, setName] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		if (!name.trim()) return;

		setLoading(true);
		setError(null);

		try {
			await createSemester(name);
			setOpen(false);
			setName("");
		} catch (err: unknown) {
			setError(
				err instanceof Error ? err.message : "Failed to create semester",
			);
		} finally {
			setLoading(false);
		}
	}

	if (isMaxReached) {
		return (
			<Button
				disabled
				className="bg-slate-100 text-slate-400 border border-slate-200/60 font-extrabold px-4 h-9 rounded-xl opacity-50 flex items-center justify-center text-xs"
				title="Maximum of 8 semesters reached"
			>
				<Plus className="mr-1.5 h-4 w-4" />
				New Semester
			</Button>
		);
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant="skeuoPrimary" className="h-9 px-4 rounded-xl flex items-center justify-center text-xs font-extrabold cursor-pointer">
					<Plus className="mr-1.5 h-4 w-4" />
					New Semester
				</Button>
			</DialogTrigger>
			<DialogContent className="bg-white border-gray-200 sm:max-w-[420px] rounded-2xl shadow-xl">
				<DialogHeader>
					<DialogTitle className="text-lg font-semibold text-gray-900">
						Create Semester
					</DialogTitle>
					<DialogDescription className="text-gray-500 text-sm">
						Add a new semester to track your academic progress
					</DialogDescription>
				</DialogHeader>
				<form onSubmit={handleSubmit} className="space-y-4 pt-2">
					<Field>
						<FieldLabel className="text-gray-600 text-sm mb-2 block font-medium">
							Semester Name
						</FieldLabel>
						<Input
							placeholder="e.g. Semester 1, Fall 2024"
							value={name}
							onChange={(e) => setName(e.target.value)}
							className="w-full rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 h-11 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/10 transition-colors shadow-[inset_0_1.5px_3px_rgba(0,0,0,0.06)]"
							disabled={loading}
						/>
						<AnimatePresence>
							{error && (
								<motion.div
									initial={{ opacity: 0, transform: "translateY(-4px)" }}
									animate={{ opacity: 1, transform: "translateY(0px)" }}
									exit={{ opacity: 0, transform: "translateY(-4px)" }}
									transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
								>
									<FieldError className="mt-2 text-destructive text-sm">
										{error}
									</FieldError>
								</motion.div>
							)}
						</AnimatePresence>
					</Field>
					<DialogFooter className="gap-2 pt-2">
						<Button
							type="button"
							variant="skeuoWhite"
							onClick={() => setOpen(false)}
							disabled={loading}
							className="h-10 px-4 rounded-xl text-xs font-bold cursor-pointer"
						>
							Cancel
						</Button>
						<Button
							type="submit"
							variant="skeuoPrimary"
							disabled={loading || !name.trim()}
							className="h-10 px-5 rounded-xl text-xs font-extrabold cursor-pointer disabled:opacity-50"
						>
							{loading ? (
								<span className="flex items-center gap-2">
									<span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
									Creating...
								</span>
							) : (
								"Create Semester"
							)}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
