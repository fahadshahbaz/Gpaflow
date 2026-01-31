"use client";

import { Pencil } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
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
import { calculateGradePoint, getLetterGrade } from "@/lib/grading/numl";
import { updateSubject } from "@/lib/supabase/mutations";

interface EditSubjectDialogProps {
	subject: {
		id: string;
		name: string;
		obtained_marks: number;
		credit_hours: number;
	};
	semesterId: string;
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

export function EditSubjectDialog({
	subject,
	semesterId,
	open,
	onOpenChange,
}: EditSubjectDialogProps) {
	const [name, setName] = useState(subject.name);
	const [marks, setMarks] = useState(String(subject.obtained_marks));
	const [creditHours, setCreditHours] = useState(String(subject.credit_hours));
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	// Reset form when subject changes
	useEffect(() => {
		setName(subject.name);
		setMarks(String(subject.obtained_marks));
		setCreditHours(String(subject.credit_hours));
		setError(null);
	}, [subject]);

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
			await updateSubject(subject.id, semesterId, {
				name: trimmedName,
				obtained_marks: marksNum,
				credit_hours: creditHoursNum,
			});
			onOpenChange(false);
		} catch (err: unknown) {
			setError(err instanceof Error ? err.message : "Failed to update subject");
		} finally {
			setLoading(false);
		}
	}

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="bg-[#1a1a1a] border-[#2a2a2a] sm:max-w-[480px] rounded-2xl shadow-2xl shadow-black/50">
				<DialogHeader className="space-y-3">
					<div className="flex items-center gap-3">
						<div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center">
							<Pencil className="h-5 w-5 text-white" />
						</div>
						<div>
							<DialogTitle className="text-xl font-semibold text-white">
								Edit Subject
							</DialogTitle>
							<DialogDescription className="text-gray-500 text-sm">
								Update subject details
							</DialogDescription>
						</div>
					</div>
				</DialogHeader>

				<form onSubmit={handleSubmit} className="space-y-5 pt-4">
					{/* Subject Name */}
					<Field>
						<FieldLabel className="text-gray-400 text-sm font-medium mb-2 block">
							Subject Name
						</FieldLabel>
						<Input
							placeholder="e.g. Calculus, Programming Fundamentals"
							value={name}
							onChange={(e) => setName(e.target.value)}
							className="bg-[#252525] border-[#333333] h-12 rounded-xl text-white placeholder:text-gray-600 focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20 transition-all"
							disabled={loading}
						/>
					</Field>

					{/* Marks and Credit Hours - Side by side */}
					<div className="grid grid-cols-2 gap-4">
						<Field>
							<FieldLabel className="text-gray-400 text-sm font-medium mb-2 block">
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
								className="bg-[#252525] border-[#333333] h-12 rounded-xl text-white placeholder:text-gray-600 focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20 transition-all"
								disabled={loading}
							/>
						</Field>
						<Field>
							<FieldLabel className="text-gray-400 text-sm font-medium mb-2 block">
								Credit Hours
							</FieldLabel>
							<Input
								type="number"
								placeholder="1 - 6"
								min={1}
								max={6}
								value={creditHours}
								onChange={(e) => setCreditHours(e.target.value)}
								className="bg-[#252525] border-[#333333] h-12 rounded-xl text-white placeholder:text-gray-600 focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20 transition-all"
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
								className="p-4 rounded-xl bg-gradient-to-br from-[#252525] to-[#1f1f1f] border border-[#333333]"
							>
								<p className="text-xs text-gray-500 uppercase tracking-wider mb-3">
									Grade Preview
								</p>
								<div className="flex items-center justify-between">
									<div className="flex items-center gap-3">
										<Badge className="bg-orange-500/10 text-orange-400 border-orange-500/20 px-3 py-1.5 text-lg font-bold">
											{gradePreview.letterGrade}
										</Badge>
										<div>
											<p className="text-2xl font-bold text-white">
												{gradePreview.gradePoint.toFixed(2)}
											</p>
											<p className="text-xs text-gray-500">Grade Points</p>
										</div>
									</div>
									<div className="text-right">
										<p className="text-lg font-semibold text-gray-300">
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

					<DialogFooter className="gap-3 pt-2">
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
							disabled={loading || !name.trim() || !marks || !creditHours}
							className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-400 hover:to-indigo-400 text-white font-medium h-11 px-6 rounded-xl transition-all duration-300 disabled:opacity-50 shadow-lg shadow-blue-500/20"
						>
							{loading ? (
								<span className="flex items-center gap-2">
									<span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
									Saving...
								</span>
							) : (
								"Save Changes"
							)}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
