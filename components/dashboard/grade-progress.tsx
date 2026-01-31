"use client";

import type { Semester } from "@/lib/supabase/queries";

interface GradeProgressProps {
	semesters: Semester[];
}

interface GradeBreakdown {
	grade: string;
	count: number;
	percentage: number;
	color: string;
}

function calculateGradeBreakdown(semesters: Semester[]): GradeBreakdown[] {
	// Collect all subjects across semesters
	const allSubjects = semesters.flatMap((s) => s.subjects || []);

	if (allSubjects.length === 0) {
		// Demo data
		return [
			{ grade: "A/A+", count: 12, percentage: 40, color: "bg-green-500" },
			{ grade: "B/B+", count: 9, percentage: 30, color: "bg-blue-500" },
			{ grade: "C/C+", count: 6, percentage: 20, color: "bg-amber-500" },
			{ grade: "D & Below", count: 3, percentage: 10, color: "bg-red-400" },
		];
	}

	// Count grades
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
		else gradeGroups["D & Below"]++;
	}

	const total = allSubjects.length;
	const colors = {
		"A/A+": "bg-green-500",
		"B/B+": "bg-blue-500",
		"C/C+": "bg-amber-500",
		"D & Below": "bg-red-400",
	};

	return Object.entries(gradeGroups).map(([grade, count]) => ({
		grade,
		count,
		percentage: total > 0 ? Math.round((count / total) * 100) : 0,
		color: colors[grade as keyof typeof colors],
	}));
}

export function GradeProgress({ semesters }: GradeProgressProps) {
	const breakdown = calculateGradeBreakdown(semesters);
	const totalSubjects = breakdown.reduce((sum, b) => sum + b.count, 0);
	const topGradePercentage = breakdown[0]?.percentage || 0;

	return (
		<div className="bg-white rounded-3xl p-6 card-shadow">
			<div className="flex items-start justify-between mb-4">
				<h3 className="text-lg font-semibold text-gray-900">
					Grade Distribution
				</h3>
				<button
					type="button"
					className="h-8 w-8 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-400"
					aria-label="More options"
				>
					<svg
						className="h-5 w-5"
						fill="currentColor"
						viewBox="0 0 20 20"
						aria-hidden="true"
					>
						<circle cx="4" cy="10" r="1.5" />
						<circle cx="10" cy="10" r="1.5" />
						<circle cx="16" cy="10" r="1.5" />
					</svg>
				</button>
			</div>

			{/* Big Number */}
			<div className="flex items-end gap-3 mb-6">
				<span className="text-5xl font-light text-gray-900 tracking-tight">
					{totalSubjects}
				</span>
				<div className="mb-2">
					<span className="text-sm text-gray-500">subjects</span>
				</div>
				<div className="ml-auto mb-2">
					<div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-50">
						<span className="text-xs font-semibold text-green-600">
							{topGradePercentage}% A's
						</span>
					</div>
				</div>
			</div>

			{/* Progress Bars */}
			<div className="space-y-4">
				{breakdown.map((item) => (
					<div key={item.grade}>
						<div className="flex items-center justify-between mb-2">
							<span className="text-sm text-gray-600">{item.grade}</span>
							<span className="text-sm font-medium text-gray-900">
								{item.count}
							</span>
						</div>
						<div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
							<div
								className={`h-full rounded-full transition-all duration-500 ${item.color}`}
								style={{
									width: `${item.percentage}%`,
									backgroundImage:
										"repeating-linear-gradient(90deg, transparent 0px, transparent 3px, rgba(255,255,255,0.3) 3px, rgba(255,255,255,0.3) 5px)",
								}}
							/>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
