"use client";

import { AlertTriangle, Trash2 } from "lucide-react";
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
import { deleteSemester } from "@/lib/supabase/mutations";

interface DeleteSemesterDialogProps {
	semesterId: string;
	semesterName: string;
	subjectCount: number;
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

export function DeleteSemesterDialog({
	semesterId,
	semesterName,
	subjectCount,
	open,
	onOpenChange,
}: DeleteSemesterDialogProps) {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	async function handleDelete() {
		setLoading(true);
		setError(null);

		try {
			await deleteSemester(semesterId);
			onOpenChange(false);
		} catch (err: unknown) {
			setError(
				err instanceof Error ? err.message : "Failed to delete semester",
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
						<div className="h-10 w-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
							<AlertTriangle className="h-5 w-5 text-red-400" />
						</div>
						<div>
							<DialogTitle className="text-xl font-semibold text-white">
								Delete Semester
							</DialogTitle>
						</div>
					</div>
					<DialogDescription className="text-gray-400 text-sm pt-4">
						Are you sure you want to delete{" "}
						<span className="text-white font-medium">{semesterName}</span>?
						{subjectCount > 0 && (
							<span className="block mt-2 text-red-400/80 text-xs">
								This will also delete {subjectCount} subject
								{subjectCount > 1 ? "s" : ""} associated with this semester.
							</span>
						)}
					</DialogDescription>
				</DialogHeader>
				{error && (
					<p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
						{error}
					</p>
				)}
				<DialogFooter className="gap-3 pt-2">
					<Button
						type="button"
						variant="ghost"
						onClick={() => onOpenChange(false)}
						disabled={loading}
						className="text-gray-400 hover:text-white hover:bg-[#252525]"
					>
						Cancel
					</Button>
					<Button
						type="button"
						onClick={handleDelete}
						disabled={loading}
						className="bg-red-600 hover:bg-red-500 text-white font-medium h-11 px-6 rounded-xl transition-all disabled:opacity-50"
					>
						<Trash2 className="h-4 w-4 mr-2" />
						{loading ? "Deleting..." : "Delete"}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
