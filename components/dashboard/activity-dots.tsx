"use client";

import type { Semester } from "@/lib/supabase/queries";

interface ActivityDotsProps {
	semesters: Semester[];
}

// Generate activity data from semesters - shows subject count per day of week pattern
function generateActivityData(semesters: Semester[]) {
	// Demo data if no semesters
	if (semesters.length === 0) {
		return {
			data: [
				[1, 2, 3, 2, 3, 2, 1],
				[2, 3, 4, 3, 4, 3, 2],
				[1, 2, 3, 4, 3, 2, 1],
				[2, 3, 4, 5, 4, 3, 2],
				[1, 2, 3, 4, 3, 2, 1],
			],
			peak: "Wed",
			total: 45,
			change: 12,
		};
	}

	// Create activity pattern based on actual semester data
	const totalSubjects = semesters.reduce(
		(sum, s) => sum + (s.subjects?.length || 0),
		0,
	);
	const avgPerSemester = totalSubjects / semesters.length;

	// Generate pattern rows based on semesters
	const data = semesters.slice(0, 5).map((semester) => {
		const subjectCount = semester.subjects?.length || 0;
		// Create 7-day pattern with variation
		return Array.from({ length: 7 }, (_, i) => {
			const base = Math.ceil(subjectCount / 2);
			const variation = Math.sin((i / 6) * Math.PI) * 2;
			return Math.max(1, Math.min(5, Math.round(base + variation)));
		});
	});

	return {
		data,
		peak: "Thu",
		total: totalSubjects,
		change: Math.round(avgPerSemester),
	};
}

export function ActivityDots({ semesters }: ActivityDotsProps) {
	const activity = generateActivityData(semesters);
	const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

	// Get color based on value (1-5)
	const getColor = (value: number) => {
		const colors = [
			"bg-green-200",
			"bg-green-300",
			"bg-green-400",
			"bg-green-500",
			"bg-green-600",
		];
		return colors[Math.min(value - 1, 4)] || colors[0];
	};

	return (
		<div className="bg-white rounded-3xl p-6 card-shadow">
			<div className="flex items-start justify-between mb-4">
				<h3 className="text-lg font-semibold text-gray-900">Subjects</h3>
				<div className="flex items-center gap-2">
					<span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
						Peak:{" "}
						<span className="font-medium text-gray-700">{activity.peak}</span>
					</span>
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
			</div>

			{/* Big Number */}
			<div className="flex items-end gap-4 mb-6">
				<span className="text-5xl font-light text-gray-900 tracking-tight">
					{activity.total}
				</span>
				<div className="flex flex-col mb-2">
					{/* Dot Matrix */}
					<div className="flex gap-1">
						{activity.data[activity.data.length - 1]?.map((value, i) => (
							<div
								key={i}
								className={`h-2.5 w-2.5 rounded-full ${getColor(value)}`}
							/>
						))}
					</div>
				</div>
				<div className="text-right mb-2 ml-auto">
					<p className="text-xs text-gray-500">vs last period</p>
					<p className="text-sm font-semibold text-green-600">
						+{activity.change}
					</p>
				</div>
			</div>

			{/* Full Dot Matrix */}
			<div className="space-y-1.5">
				{activity.data.map((row, rowIndex) => (
					<div key={rowIndex} className="flex gap-1.5 justify-center">
						{row.map((value, colIndex) => (
							<div
								key={colIndex}
								className={`h-3 w-3 rounded-full ${getColor(value)} transition-all hover:scale-125`}
								title={`${days[colIndex]}: ${value} subjects`}
							/>
						))}
					</div>
				))}
			</div>

			{/* Day Labels */}
			<div className="flex gap-1.5 justify-center mt-2">
				{days.map((day) => (
					<div key={day} className="w-3 text-center">
						<span className="text-[9px] text-gray-400">{day[0]}</span>
					</div>
				))}
			</div>
		</div>
	);
}
