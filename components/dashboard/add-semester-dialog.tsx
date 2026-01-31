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

export function AddSemesterDialog() {
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

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-400 hover:to-red-400 text-white font-medium px-5 h-11 rounded-xl shadow-lg shadow-orange-500/20 transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/30 hover:-translate-y-0.5">
					<Plus className="mr-2 h-4 w-4" />
					New Semester
				</Button>
			</DialogTrigger>
			<DialogContent className="bg-[#1a1a1a] border-[#2a2a2a] sm:max-w-[440px] rounded-2xl shadow-2xl shadow-black/50">
				<DialogHeader className="space-y-3">
					<div className="flex items-center gap-3">
						<div className="h-10 w-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
							<Plus className="h-5 w-5 text-white" />
						</div>
						<div>
							<DialogTitle className="text-xl font-semibold text-white">
								Create Semester
							</DialogTitle>
							<DialogDescription className="text-gray-500 text-sm">
								Add a new semester to track your academic progress
							</DialogDescription>
						</div>
					</div>
				</DialogHeader>
				<form onSubmit={handleSubmit} className="space-y-6 pt-4">
					<Field>
						<FieldLabel className="text-gray-400 text-sm font-medium mb-2 block">
							Semester Name
						</FieldLabel>
						<Input
							placeholder="e.g. Semester 1, Fall 2024"
							value={name}
							onChange={(e) => setName(e.target.value)}
							className="bg-[#252525] border-[#333333] h-12 rounded-xl text-white placeholder:text-gray-600 focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20 transition-all"
							disabled={loading}
						/>
						<AnimatePresence>
							{error && (
								<motion.div
									initial={{ opacity: 0, height: 0 }}
									animate={{ opacity: 1, height: "auto" }}
									exit={{ opacity: 0, height: 0 }}
								>
									<FieldError className="mt-2 text-red-400 text-sm">
										{error}
									</FieldError>
								</motion.div>
							)}
						</AnimatePresence>
					</Field>
					<DialogFooter className="gap-3">
						<Button
							type="button"
							variant="ghost"
							onClick={() => setOpen(false)}
							disabled={loading}
							className="text-gray-400 hover:text-white hover:bg-[#252525] h-11 px-5"
						>
							Cancel
						</Button>
						<Button
							type="submit"
							disabled={loading || !name.trim()}
							className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-400 hover:to-red-400 text-white font-medium h-11 px-6 rounded-xl transition-all duration-300 disabled:opacity-50 shadow-lg shadow-orange-500/20"
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
