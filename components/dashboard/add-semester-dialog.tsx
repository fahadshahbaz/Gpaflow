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
				<Button className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-4 h-9 rounded-lg">
					<Plus className="mr-1.5 h-4 w-4" />
					New Semester
				</Button>
			</DialogTrigger>
			<DialogContent className="bg-[#141414] border-[#262626] sm:max-w-[400px] rounded-xl">
				<DialogHeader>
					<DialogTitle className="text-lg font-semibold text-white">
						Create Semester
					</DialogTitle>
					<DialogDescription className="text-gray-500 text-sm">
						Add a new semester to track your academic progress
					</DialogDescription>
				</DialogHeader>
				<form onSubmit={handleSubmit} className="space-y-4 pt-2">
					<Field>
						<FieldLabel className="text-gray-400 text-sm mb-1.5 block">
							Semester Name
						</FieldLabel>
						<Input
							placeholder="e.g. Semester 1, Fall 2024"
							value={name}
							onChange={(e) => setName(e.target.value)}
							className="bg-[#1a1a1a] border-[#2a2a2a] h-10 rounded-lg text-white placeholder:text-gray-600 focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/20"
							disabled={loading}
						/>
						<AnimatePresence>
							{error && (
								<motion.div
									initial={{ opacity: 0, height: 0 }}
									animate={{ opacity: 1, height: "auto" }}
									exit={{ opacity: 0, height: 0 }}
								>
									<FieldError className="mt-1.5 text-red-400 text-sm">
										{error}
									</FieldError>
								</motion.div>
							)}
						</AnimatePresence>
					</Field>
					<DialogFooter className="gap-2 pt-2">
						<Button
							type="button"
							variant="ghost"
							onClick={() => setOpen(false)}
							disabled={loading}
							className="text-gray-400 hover:text-white hover:bg-[#1a1a1a] h-9 px-4"
						>
							Cancel
						</Button>
						<Button
							type="submit"
							disabled={loading || !name.trim()}
							className="bg-orange-500 hover:bg-orange-600 text-white font-medium h-9 px-4 rounded-lg disabled:opacity-50"
						>
							{loading ? (
								<span className="flex items-center gap-2">
									<span className="h-3.5 w-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
									Creating...
								</span>
							) : (
								"Create"
							)}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
