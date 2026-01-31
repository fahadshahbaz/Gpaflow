"use client";

import { Trash2 } from "lucide-react";
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
			<AlertDialogContent className="bg-[#1a1a1a] border-[#2a2a2a] rounded-2xl shadow-2xl shadow-black/50">
				<AlertDialogHeader className="space-y-3">
					<div className="flex items-center gap-3">
						<div className="h-10 w-10 rounded-xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center">
							<Trash2 className="h-5 w-5 text-white" />
						</div>
						<div>
							<AlertDialogTitle className="text-xl font-semibold text-white">
								Delete Subject
							</AlertDialogTitle>
							<AlertDialogDescription className="text-gray-500 text-sm">
								This action cannot be undone
							</AlertDialogDescription>
						</div>
					</div>
				</AlertDialogHeader>

				<div className="py-4">
					<p className="text-gray-300">
						Are you sure you want to delete{" "}
						<span className="font-semibold text-white">{subjectName}</span>?
						This will permanently remove this subject and recalculate your
						semester GPA.
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

				<AlertDialogFooter className="gap-3">
					<AlertDialogCancel
						disabled={loading}
						className="bg-transparent border-[#333333] text-gray-400 hover:text-white hover:bg-[#252525] h-11 px-5"
					>
						Cancel
					</AlertDialogCancel>
					<AlertDialogAction
						onClick={handleDelete}
						disabled={loading}
						className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-400 hover:to-red-500 text-white font-medium h-11 px-6 rounded-xl transition-all duration-300 disabled:opacity-50"
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
