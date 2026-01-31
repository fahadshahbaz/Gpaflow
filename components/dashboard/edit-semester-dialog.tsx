"use client";

import { Pencil } from "lucide-react";
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
} from "@/components/ui/dialog";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { updateSemester } from "@/lib/supabase/mutations";

interface EditSemesterDialogProps {
	semesterId: string;
	currentName: string;
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

export function EditSemesterDialog({
	semesterId,
	currentName,
	open,
	onOpenChange,
}: EditSemesterDialogProps) {
	const [name, setName] = useState(currentName);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		if (!name.trim() || name === currentName) {
			onOpenChange(false);
			return;
		}

		setLoading(true);
		setError(null);

		try {
			await updateSemester(semesterId, name);
			onOpenChange(false);
		} catch (err: unknown) {
			setError(
				err instanceof Error ? err.message : "Failed to update semester",
			);
		} finally {
			setLoading(false);
		}
	}

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="bg-[#1a1a1a] border-[#2a2a2a] sm:max-w-[425px] rounded-2xl">
				<DialogHeader>
					<div className="flex items-center gap-3">
						<div className="h-10 w-10 rounded-xl bg-[#252525] border border-[#333333] flex items-center justify-center">
							<Pencil className="h-5 w-5 text-gray-400" />
						</div>
						<div>
							<DialogTitle className="text-xl font-semibold text-white">
								Edit Semester
							</DialogTitle>
							<DialogDescription className="text-gray-500 text-sm">
								Update the name of this semester.
							</DialogDescription>
						</div>
					</div>
				</DialogHeader>
				<form onSubmit={handleSubmit} className="space-y-5 pt-4">
					<Field>
						<FieldLabel className="text-gray-400 text-sm font-medium mb-2 block">
							Semester Name
						</FieldLabel>
						<Input
							placeholder="e.g. Semester 1, Fall 2024"
							value={name}
							onChange={(e) => setName(e.target.value)}
							className="bg-[#252525] border-[#333333] h-11 rounded-xl text-white placeholder:text-gray-600 focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20 transition-all"
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
							onClick={() => onOpenChange(false)}
							disabled={loading}
							className="text-gray-400 hover:text-white hover:bg-[#252525] h-11 px-5"
						>
							Cancel
						</Button>
						<Button
							type="submit"
							disabled={loading || !name.trim() || name === currentName}
							className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-400 hover:to-red-400 text-white font-medium h-11 px-6 rounded-xl transition-all disabled:opacity-50"
						>
							{loading ? "Saving..." : "Save Changes"}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
