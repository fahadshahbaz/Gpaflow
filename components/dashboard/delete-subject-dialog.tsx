"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { deleteSubject } from "@/lib/supabase/mutations";

interface DeleteSubjectDialogProps {
	subjectId: string;
	subjectName: string;
	semesterId: string;
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

export function DeleteSubjectDialog({
	subjectId,
	subjectName,
	semesterId,
	open,
	onOpenChange,
}: DeleteSubjectDialogProps) {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	async function handleDelete() {
		setLoading(true);
		setError(null);

		try {
			await deleteSubject(subjectId, semesterId);
			onOpenChange(false);
		} catch (err: unknown) {
			setError(err instanceof Error ? err.message : "Failed to delete subject");
		} finally {
			setLoading(false);
		}
	}

	return (
		<AlertDialog open={open} onOpenChange={onOpenChange}>
			<AlertDialogContent className="bg-[#1a1a1a] border-[#2a2a2a]">
				<AlertDialogHeader className="space-y-1">
					<AlertDialogTitle className="text-lg font-semibold text-white">
						Delete Subject
					</AlertDialogTitle>
					<AlertDialogDescription className="text-gray-500 text-sm">
						This action cannot be undone
					</AlertDialogDescription>
				</AlertDialogHeader>

				<div className="py-3">
					<p className="text-gray-300 text-sm">
						Are you sure you want to delete{" "}
						<span className="font-medium text-white">{subjectName}</span>? This
						will permanently remove this subject and recalculate your semester
						GPA.
					</p>

					<AnimatePresence>
						{error && (
							<motion.p
								initial={{ opacity: 0, height: 0 }}
								animate={{ opacity: 1, height: "auto" }}
								exit={{ opacity: 0, height: 0 }}
								className="mt-3 text-red-400 text-sm"
							>
								{error}
							</motion.p>
						)}
					</AnimatePresence>
				</div>

				<AlertDialogFooter className="gap-2">
					<AlertDialogCancel
						disabled={loading}
						className="bg-transparent border-[#333333] text-gray-400 hover:text-white hover:bg-[#252525] h-9 px-4"
					>
						Cancel
					</AlertDialogCancel>
					<AlertDialogAction
						onClick={handleDelete}
						disabled={loading}
						className="bg-red-500 hover:bg-red-600 text-white font-medium h-9 px-4 disabled:opacity-50"
					>
						{loading ? (
							<span className="flex items-center gap-2">
								<span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
								Deleting...
							</span>
						) : (
							"Delete Subject"
						)}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
