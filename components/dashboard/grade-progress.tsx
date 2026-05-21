"use client";

import { useMemo } from "react";
import { Award } from "lucide-react";
import type { Semester } from "@/types/grading";

interface GradeProgressProps {
	semesters: Semester[];
}

interface GradeBreakdown {
	grade: string;
	count: number;
	percentage: number;
	color: string;
}

export function GradeProgress({ semesters }: GradeProgressProps) {
	const breakdown = useMemo<GradeBreakdown[]>(() => {
		const allSubjects = semesters.flatMap((s) => s.subjects || []);

		const gradeGroups = {
			"A/A+": 0,
			"B/B+": 0,
			"C/C+": 0,
			"D & Below": 0,
		};

		for (const subject of allSubjects) {
			const grade = subject.letter_grade || "";
			if (grade.startsWith("A")) gradeGroups["A/A+"]++;
			else if (grade.startsWith("B")) gradeGroups["B/B+"]++;
			else if (grade.startsWith("C")) gradeGroups["C/C+"]++;
			else if (grade) gradeGroups["D & Below"]++;
		}

		const total = allSubjects.length;
		const colors = {
			"A/A+": "linear-gradient(to right, #34d399, #10b981)",
			"B/B+": "linear-gradient(to right, #60a5fa, #2563eb)",
			"C/C+": "linear-gradient(to right, #fbbf24, #d97706)",
			"D & Below": "linear-gradient(to right, #f43f5e, #e11d48)",
		};

		return Object.entries(gradeGroups).map(([grade, count]) => ({
			grade,
			count,
			percentage: total > 0 ? Math.round((count / total) * 100) : 0,
			color: colors[grade as keyof typeof colors],
		}));
	}, [semesters]);

	const totalSubjects = useMemo(
		() => breakdown.reduce((sum, b) => sum + b.count, 0),
		[breakdown],
	);

	const topGradePercentage = breakdown[0]?.percentage || 0;

	return (
		<div className="card-skeuo rounded-[32px] p-5 h-full flex flex-col justify-between">
			<div>
				<div className="flex items-start justify-between mb-4">
					<div>
						<h3 className="text-lg font-semibold text-slate-800">
							Grade Distribution
						</h3>
						{totalSubjects > 0 && (
							<div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-emerald-200/50 bg-emerald-50/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.6),0_1.5px_3px_rgba(0,0,0,0.03)] mt-1.5">
								<span className="text-xs font-normal text-emerald-600">
									{topGradePercentage}% A's
								</span>
							</div>
						)}
					</div>
					<div className="icon-skeuo-raised h-9 w-9 rounded-xl border border-slate-200/80 shadow-[inset_0_1px_0_#ffffff,0_2px_4px_rgba(0,0,0,0.02)] text-slate-400/90 flex items-center justify-center flex-shrink-0">
						<Award className="h-4.5 w-4.5" />
					</div>
				</div>

				{/* Big Number */}
				<div className="flex items-end gap-3 mb-3.5">
					<span className="text-4xl font-light text-slate-800 tracking-tight">
						{totalSubjects}
					</span>
					<div className="mb-1">
						<span className="text-sm text-slate-400 font-normal">subjects</span>
					</div>
				</div>

				{/* Progress Bars or Empty State */}
				{totalSubjects === 0 ? (
					<div className="text-center py-8 text-slate-400 text-sm font-normal">
						No subjects added yet
					</div>
				) : (
					<div className="space-y-2.5">
						{breakdown.map((item) => (
							<div key={item.grade}>
								<div className="flex items-center justify-between mb-1.5">
									<span className="text-sm text-slate-500 font-normal">{item.grade}</span>
									<span className="text-sm font-normal text-slate-700">
										{item.count}
									</span>
								</div>
								<div className="h-3 bg-slate-100/90 rounded-full shadow-[inset_0_1.5px_3px_rgba(0,0,0,0.06),0_1px_0_rgba(255,255,255,0.8)] border border-slate-200/20 p-[1px] overflow-hidden">
									<div
										className="h-full rounded-full transition-all duration-500 shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_1px_2px_rgba(0,0,0,0.12)]"
										style={{
											width: `${item.percentage}%`,
											backgroundImage: `repeating-linear-gradient(90deg, transparent 0px, transparent 3px, rgba(255,255,255,0.15) 3px, rgba(255,255,255,0.15) 5px), ${item.color}`,
										}}
									/>
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
}
