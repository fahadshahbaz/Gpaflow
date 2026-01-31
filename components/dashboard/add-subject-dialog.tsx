"use client";

import { Plus } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
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
import { calculateGradePoint, getLetterGrade } from "@/lib/grading/numl";
import { createSubject } from "@/lib/supabase/mutations";

interface AddSubjectDialogProps {
	semesterId: string;
	semesterName: string;
	trigger?: React.ReactNode;
}

export function AddSubjectDialog({
	semesterId,
	semesterName,
	trigger,
}: AddSubjectDialogProps) {
	const [open, setOpen] = useState(false);
	const [name, setName] = useState("");
	const [marks, setMarks] = useState("");
	const [creditHours, setCreditHours] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	// Real-time grade preview
	const gradePreview = useMemo(() => {
		const marksNum = Number.parseFloat(marks);
		if (Number.isNaN(marksNum) || marksNum < 0 || marksNum > 100) {
			return null;
		}
		return {
			letterGrade: getLetterGrade(marksNum),
			gradePoint: calculateGradePoint(marksNum),
		};
	}, [marks]);

	function resetForm() {
		setName("");
		setMarks("");
		setCreditHours("");
		setError(null);
	}

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();

		const trimmedName = name.trim();
		const marksNum = Number.parseFloat(marks);
		const creditHoursNum = Number.parseInt(creditHours, 10);

		// Client-side validation
		if (!trimmedName) {
			setError("Subject name is required");
			return;
		}
		if (Number.isNaN(marksNum) || marksNum < 0 || marksNum > 100) {
			setError("Marks must be between 0 and 100");
			return;
		}
		if (
			Number.isNaN(creditHoursNum) ||
			creditHoursNum < 1 ||
			creditHoursNum > 6
		) {
			setError("Credit hours must be between 1 and 6");
			return;
		}

		setLoading(true);
		setError(null);

		try {
			await createSubject(semesterId, {
				name: trimmedName,
				obtained_marks: marksNum,
				credit_hours: creditHoursNum,
			});
			setOpen(false);
			resetForm();
		} catch (err: unknown) {
			setError(err instanceof Error ? err.message : "Failed to add subject");
		} finally {
			setLoading(false);
		}
	}

	return (
		<Dialog
			open={open}
			onOpenChange={(isOpen) => {
				setOpen(isOpen);
				if (!isOpen) resetForm();
			}}
		>
			<DialogTrigger asChild>
				{trigger || (
					<Button
						variant="ghost"
						size="sm"
						className="text-orange-400 hover:text-orange-300 hover:bg-orange-500/10 h-8"
					>
						<Plus className="h-4 w-4 mr-1" />
						Add subject
					</Button>
				)}
			</DialogTrigger>
			<DialogContent className="bg-[#1a1a1a] border-[#2a2a2a] sm:max-w-[480px]">
				<DialogHeader className="space-y-1">
					<DialogTitle className="text-lg font-semibold text-white">
						Add Subject
					</DialogTitle>
					<DialogDescription className="text-gray-500 text-sm">
						Add a subject to {semesterName}
					</DialogDescription>
				</DialogHeader>

				<form onSubmit={handleSubmit} className="space-y-4 pt-2">
					{/* Subject Name */}
					<Field>
						<FieldLabel className="text-gray-400 text-sm font-medium mb-1.5 block">
							Subject Name
						</FieldLabel>
						<Input
							placeholder="e.g. Calculus, Programming Fundamentals"
							value={name}
							onChange={(e) => setName(e.target.value)}
							className="bg-[#252525] border-[#333333] h-10 text-white placeholder:text-gray-600 focus:border-orange-500/50"
							disabled={loading}
						/>
					</Field>

					{/* Marks and Credit Hours - Side by side */}
					<div className="grid grid-cols-2 gap-4">
						<Field>
							<FieldLabel className="text-gray-400 text-sm font-medium mb-1.5 block">
								Obtained Marks
							</FieldLabel>
							<Input
								type="number"
								placeholder="0 - 100"
								min={0}
								max={100}
								step="0.1"
								value={marks}
								onChange={(e) => setMarks(e.target.value)}
								className="bg-[#252525] border-[#333333] h-10 text-white placeholder:text-gray-600 focus:border-orange-500/50"
								disabled={loading}
							/>
						</Field>
						<Field>
							<FieldLabel className="text-gray-400 text-sm font-medium mb-1.5 block">
								Credit Hours
							</FieldLabel>
							<Input
								type="number"
								placeholder="1 - 6"
								min={1}
								max={6}
								value={creditHours}
								onChange={(e) => setCreditHours(e.target.value)}
								className="bg-[#252525] border-[#333333] h-10 text-white placeholder:text-gray-600 focus:border-orange-500/50"
								disabled={loading}
							/>
						</Field>
					</div>

					{/* Real-time Grade Preview */}
					<AnimatePresence>
						{gradePreview && (
							<motion.div
								initial={{ opacity: 0, y: -10 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -10 }}
								transition={{ duration: 0.2 }}
								className="p-3 rounded-lg bg-[#252525] border border-[#333333]"
							>
								<p className="text-xs text-gray-500 uppercase tracking-wider mb-2">
									Grade Preview
								</p>
								<div className="flex items-center justify-between">
									<div className="flex items-center gap-3">
										<Badge className="bg-orange-500/10 text-orange-400 border-orange-500/20 px-2.5 py-1 text-base font-semibold">
											{gradePreview.letterGrade}
										</Badge>
										<div>
											<p className="text-xl font-bold text-white">
												{gradePreview.gradePoint.toFixed(2)}
											</p>
											<p className="text-xs text-gray-500">Grade Points</p>
										</div>
									</div>
									<div className="text-right">
										<p className="text-base font-medium text-gray-300">
											{marks}%
										</p>
										<p className="text-xs text-gray-500">Percentage</p>
									</div>
								</div>
							</motion.div>
						)}
					</AnimatePresence>

					{/* Error Message */}
					<AnimatePresence>
						{error && (
							<motion.div
								initial={{ opacity: 0, height: 0 }}
								animate={{ opacity: 1, height: "auto" }}
								exit={{ opacity: 0, height: 0 }}
							>
								<FieldError className="text-red-400 text-sm">
									{error}
								</FieldError>
							</motion.div>
						)}
					</AnimatePresence>

					<DialogFooter className="gap-2 pt-2">
						<Button
							type="button"
							variant="ghost"
							onClick={() => setOpen(false)}
							disabled={loading}
							className="text-gray-400 hover:text-white hover:bg-[#252525] h-9 px-4"
						>
							Cancel
						</Button>
						<Button
							type="submit"
							disabled={loading || !name.trim() || !marks || !creditHours}
							className="bg-orange-500 hover:bg-orange-600 text-white font-medium h-9 px-4 disabled:opacity-50"
						>
							{loading ? (
								<span className="flex items-center gap-2">
									<span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
									Adding...
								</span>
							) : (
								"Add Subject"
							)}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
