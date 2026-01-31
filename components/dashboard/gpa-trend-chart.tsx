"use client";

import * as React from "react";
import {
	Area,
	Bar,
	ComposedChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
import type { Semester } from "@/lib/supabase/queries";

interface GPATrendChartProps {
	semesters: Semester[];
	targetGpa?: number;
}

interface ChartDataPoint {
	name: string;
	semester: string;
	sgpa: number;
	cgpa: number;
	credits: number;
}

// Demo data
const demoData: ChartDataPoint[] = [
	{ name: "S1", semester: "Semester 1", sgpa: 3.2, cgpa: 3.2, credits: 15 },
	{ name: "S2", semester: "Semester 2", sgpa: 3.5, cgpa: 3.35, credits: 18 },
	{ name: "S3", semester: "Semester 3", sgpa: 3.6, cgpa: 3.43, credits: 16 },
	{ name: "S4", semester: "Semester 4", sgpa: 3.4, cgpa: 3.43, credits: 17 },
	{ name: "S5", semester: "Semester 5", sgpa: 3.7, cgpa: 3.48, credits: 15 },
];

export function GPATrendChart({
	semesters,
	targetGpa = 3.5,
}: GPATrendChartProps) {
	const chartData = React.useMemo<ChartDataPoint[]>(() => {
		if (semesters.length === 0) return demoData;

		let cumulativePoints = 0;
		let cumulativeCredits = 0;

		return semesters.map((semester, index) => {
			const semesterPoints = semester.sgpa * semester.total_credit_hours;
			cumulativePoints += semesterPoints;
			cumulativeCredits += semester.total_credit_hours;
			const cgpa =
				cumulativeCredits > 0 ? cumulativePoints / cumulativeCredits : 0;

			return {
				name: `S${index + 1}`,
				semester: semester.name,
				sgpa: Number(semester.sgpa.toFixed(2)),
				cgpa: Number(cgpa.toFixed(2)),
				credits: semester.total_credit_hours,
			};
		});
	}, [semesters]);

	const isDemo = semesters.length === 0;

	return (
		<div className="bg-white rounded-3xl p-6 card-shadow h-full">
			{/* Header */}
			<div className="flex items-start justify-between mb-4">
				<div>
					<div className="flex items-center gap-3 mb-1">
						<h3 className="text-lg font-semibold text-gray-900">
							GPA Progression
						</h3>
						{isDemo && (
							<span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
								Demo Data
							</span>
						)}
					</div>
					<p className="text-sm text-gray-500">
						Semester-wise performance tracking
					</p>
				</div>
			</div>

			{/* Stats Row */}
			<div className="flex flex-wrap gap-6 mb-4 pb-4 border-b border-gray-100">
				{chartData.map((item, index) => (
					<div key={item.name}>
						<p className="text-xs text-gray-500 mb-0.5">{item.semester}</p>
						<p
							className={`text-xl font-light ${index === chartData.length - 1 ? "text-blue-600" : "text-gray-400"}`}
						>
							{item.sgpa.toFixed(2)}
						</p>
					</div>
				))}
			</div>

			{/* Chart */}
			<div className="h-[200px] w-full">
				<ResponsiveContainer width="100%" height="100%">
					<ComposedChart
						data={chartData}
						margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
					>
						<defs>
							<linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
								<stop offset="0%" stopColor="#3b82f6" stopOpacity={0.8} />
								<stop offset="100%" stopColor="#3b82f6" stopOpacity={0.3} />
							</linearGradient>
							<linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
								<stop offset="0%" stopColor="#3b82f6" stopOpacity={0.15} />
								<stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
							</linearGradient>
						</defs>
						<XAxis
							dataKey="name"
							stroke="transparent"
							fontSize={11}
							tickLine={false}
							axisLine={false}
							tick={{ fill: "#9ca3af" }}
							dy={5}
						/>
						<YAxis
							stroke="transparent"
							fontSize={11}
							tickLine={false}
							axisLine={false}
							tick={{ fill: "#9ca3af" }}
							domain={[0, 4]}
							ticks={[0, 1, 2, 3, 4]}
						/>
						<Tooltip
							cursor={{ fill: "transparent" }}
							content={({ active, payload }) => {
								if (active && payload && payload.length) {
									const data = payload[0].payload as ChartDataPoint;
									return (
										<div className="bg-white border border-gray-200 rounded-xl px-3 py-2 shadow-lg">
											<p className="text-xs font-medium text-gray-900 mb-1.5">
												{data.semester}
											</p>
											<div className="space-y-1">
												<div className="flex items-center justify-between gap-4">
													<span className="text-xs text-gray-500">SGPA</span>
													<span className="text-xs font-semibold text-blue-600">
														{data.sgpa}
													</span>
												</div>
												<div className="flex items-center justify-between gap-4">
													<span className="text-xs text-gray-500">CGPA</span>
													<span className="text-xs font-medium text-gray-900">
														{data.cgpa}
													</span>
												</div>
											</div>
										</div>
									);
								}
								return null;
							}}
						/>
						{/* Bars for SGPA */}
						<Bar
							dataKey="sgpa"
							fill="url(#barGradient)"
							radius={[4, 4, 0, 0]}
							maxBarSize={40}
						/>
						{/* Smooth line for CGPA */}
						<Area
							type="monotone"
							dataKey="cgpa"
							fill="url(#areaGradient)"
							stroke="#3b82f6"
							strokeWidth={2}
							dot={{ fill: "#3b82f6", strokeWidth: 0, r: 3 }}
							activeDot={{ fill: "#3b82f6", strokeWidth: 0, r: 5 }}
						/>
					</ComposedChart>
				</ResponsiveContainer>
			</div>

			{/* Legend */}
			<div className="flex items-center gap-6 mt-3 pt-3 border-t border-gray-100">
				<div className="flex items-center gap-2">
					<div className="w-3 h-3 rounded bg-blue-500/60" />
					<span className="text-xs text-gray-500">SGPA</span>
				</div>
				<div className="flex items-center gap-2">
					<div className="w-3 h-0.5 bg-blue-500 rounded" />
					<span className="text-xs text-gray-500">CGPA Trend</span>
				</div>
				{targetGpa && (
					<div className="flex items-center gap-2 ml-auto">
						<span className="text-xs text-gray-400">Target: {targetGpa}</span>
					</div>
				)}
			</div>
		</div>
	);
}
