"use client";

import type { Semester } from "@/lib/supabase/queries";

interface ActivityDotsProps {
	semesters: Semester[];
}

// Generate activity data from semesters
function generateActivityData(semesters: Semester[]) {
	// Demo data if no semesters
	if (semesters.length === 0) {
		return {
			semesters: [
				{ name: "S1", subjects: 5 },
				{ name: "S2", subjects: 6 },
				{ name: "S3", subjects: 5 },
				{ name: "S4", subjects: 7 },
				{ name: "S5", subjects: 6 },
			],
			total: 29,
			avgPerSemester: 5.8,
			isDemo: true,
		};
	}

	const semesterData = semesters.map((s, i) => ({
		name: `S${i + 1}`,
		fullName: s.name,
		subjects: s.subjects?.length || 0,
	}));

	const total = semesterData.reduce((sum, s) => sum + s.subjects, 0);
	const avgPerSemester = semesters.length > 0 ? total / semesters.length : 0;

	return {
		semesters: semesterData,
		total,
		avgPerSemester: Number(avgPerSemester.toFixed(1)),
		isDemo: false,
	};
}

export function ActivityDots({ semesters }: ActivityDotsProps) {
	const activity = generateActivityData(semesters);
	const maxSubjects = Math.max(...activity.semesters.map((s) => s.subjects), 8);

	// Get color intensity based on position (darker for more recent)
	const getColor = (
		semesterIndex: number,
		dotIndex: number,
		totalDots: number,
	) => {
		const isActive = dotIndex < totalDots;
		if (!isActive) return "bg-gray-100";

		// More recent semesters get darker colors
		const intensity = (semesterIndex + 1) / activity.semesters.length;
		if (intensity > 0.8) return "bg-green-600";
		if (intensity > 0.6) return "bg-green-500";
		if (intensity > 0.4) return "bg-green-400";
		if (intensity > 0.2) return "bg-green-300";
		return "bg-green-200";
	};

	return (
		<div className="bg-white rounded-3xl p-6 card-shadow h-full">
			<div className="flex items-start justify-between mb-4">
				<h3 className="text-lg font-semibold text-gray-900">Subjects</h3>
				{activity.isDemo && (
					<span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
						Demo
					</span>
				)}
			</div>

			{/* Big Number */}
			<div className="flex items-end gap-4 mb-5">
				<span className="text-4xl font-light text-gray-900 tracking-tight">
					{activity.total}
				</span>
				<div className="mb-1">
					<span className="text-sm text-gray-500">total subjects</span>
				</div>
				<div className="text-right mb-1 ml-auto">
					<p className="text-xs text-gray-500">avg per semester</p>
					<p className="text-sm font-semibold text-green-600">
						{activity.avgPerSemester}
					</p>
				</div>
			</div>

			{/* Semester Grid */}
			<div className="space-y-2">
				{activity.semesters.map((semester, semesterIndex) => (
					<div key={semester.name} className="flex items-center gap-3">
						<span className="text-xs text-gray-500 w-6 flex-shrink-0">
							{semester.name}
						</span>
						<div className="flex gap-1.5 flex-1">
							{Array.from({ length: maxSubjects }, (_, dotIndex) => (
								<div
									key={dotIndex}
									className={`h-3 w-3 rounded-full transition-all hover:scale-110 ${getColor(semesterIndex, dotIndex, semester.subjects)}`}
									title={
										dotIndex < semester.subjects
											? `Subject ${dotIndex + 1}`
											: ""
									}
								/>
							))}
						</div>
						<span className="text-xs font-medium text-gray-700 w-4 text-right">
							{semester.subjects}
						</span>
					</div>
				))}
			</div>

			{/* Legend */}
			<div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
				<div className="flex items-center gap-1.5">
					<div className="h-2.5 w-2.5 rounded-full bg-green-200" />
					<div className="h-2.5 w-2.5 rounded-full bg-green-400" />
					<div className="h-2.5 w-2.5 rounded-full bg-green-600" />
					<span className="text-xs text-gray-500 ml-1">Recent semesters</span>
				</div>
				<div className="flex items-center gap-1.5">
					<div className="h-2.5 w-2.5 rounded-full bg-gray-100" />
					<span className="text-xs text-gray-400">Empty</span>
				</div>
			</div>
		</div>
	);
}
