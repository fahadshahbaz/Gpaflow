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
	const latestCGPA = chartData[chartData.length - 1]?.cgpa || 0;
	const highestSGPA = Math.max(...chartData.map((d) => d.sgpa));

	return (
		<div className="col-span-12 bg-white rounded-3xl p-6 card-shadow">
			{/* Header */}
			<div className="flex items-start justify-between mb-6">
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

			{/* Stats Row */}
			<div className="flex flex-wrap gap-8 mb-6 pb-6 border-b border-gray-100">
				{chartData.map((item, index) => (
					<div key={item.name} className="min-w-[100px]">
						<p className="text-xs text-gray-500 mb-1">{item.semester}</p>
						<p
							className={`text-2xl font-light ${index === chartData.length - 1 ? "text-blue-600" : "text-gray-400"}`}
						>
							{item.sgpa.toFixed(2)}
						</p>
					</div>
				))}
			</div>

			{/* Chart */}
			<div className="h-[280px] w-full">
				<ResponsiveContainer width="100%" height="100%">
					<ComposedChart
						data={chartData}
						margin={{ top: 20, right: 20, left: -10, bottom: 0 }}
					>
						<defs>
							<linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
								<stop offset="0%" stopColor="#3b82f6" stopOpacity={0.8} />
								<stop offset="100%" stopColor="#3b82f6" stopOpacity={0.3} />
							</linearGradient>
							<linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
								<stop offset="0%" stopColor="#3b82f6" stopOpacity={0.1} />
								<stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
							</linearGradient>
							<pattern
								id="stripes"
								patternUnits="userSpaceOnUse"
								width="4"
								height="4"
								patternTransform="rotate(45)"
							>
								<line
									x1="0"
									y1="0"
									x2="0"
									y2="4"
									stroke="#3b82f6"
									strokeWidth="2"
									strokeOpacity="0.5"
								/>
							</pattern>
						</defs>
						<XAxis
							dataKey="name"
							stroke="transparent"
							fontSize={12}
							tickLine={false}
							axisLine={false}
							tick={{ fill: "#9ca3af" }}
							dy={10}
						/>
						<YAxis
							stroke="transparent"
							fontSize={12}
							tickLine={false}
							axisLine={false}
							tick={{ fill: "#9ca3af" }}
							domain={[0, 4]}
							ticks={[0, 1, 2, 3, 4]}
							dx={-10}
						/>
						<Tooltip
							cursor={{ fill: "transparent" }}
							content={({ active, payload }) => {
								if (active && payload && payload.length) {
									const data = payload[0].payload as ChartDataPoint;
									return (
										<div className="bg-white border border-gray-200 rounded-xl px-4 py-3 shadow-lg">
											<p className="text-sm font-medium text-gray-900 mb-2">
												{data.semester}
											</p>
											<div className="space-y-1.5">
												<div className="flex items-center justify-between gap-6">
													<span className="text-sm text-gray-500">SGPA</span>
													<span className="text-sm font-semibold text-blue-600">
														{data.sgpa}
													</span>
												</div>
												<div className="flex items-center justify-between gap-6">
													<span className="text-sm text-gray-500">CGPA</span>
													<span className="text-sm font-medium text-gray-900">
														{data.cgpa}
													</span>
												</div>
												<div className="flex items-center justify-between gap-6">
													<span className="text-sm text-gray-500">Credits</span>
													<span className="text-sm text-gray-600">
														{data.credits}
													</span>
												</div>
											</div>
										</div>
									);
								}
								return null;
							}}
						/>
						{/* Striped bars for SGPA */}
						<Bar
							dataKey="sgpa"
							fill="url(#stripes)"
							radius={[6, 6, 0, 0]}
							maxBarSize={60}
						/>
						{/* Area under CGPA line */}
						<Area
							type="stepAfter"
							dataKey="cgpa"
							fill="url(#areaGradient)"
							stroke="#3b82f6"
							strokeWidth={2}
						/>
					</ComposedChart>
				</ResponsiveContainer>
			</div>

			{/* Legend */}
			<div className="flex items-center gap-6 mt-4 pt-4 border-t border-gray-100">
				<div className="flex items-center gap-2">
					<div
						className="w-4 h-4 rounded bg-blue-500/30"
						style={{
							backgroundImage:
								"repeating-linear-gradient(45deg, #3b82f6 0px, #3b82f6 2px, transparent 2px, transparent 4px)",
						}}
					/>
					<span className="text-sm text-gray-500">SGPA</span>
				</div>
				<div className="flex items-center gap-2">
					<div className="w-4 h-0.5 bg-blue-500 rounded" />
					<span className="text-sm text-gray-500">CGPA Trend</span>
				</div>
				{targetGpa && (
					<div className="flex items-center gap-2">
						<div className="w-4 h-0.5 border-t-2 border-dashed border-gray-400" />
						<span className="text-sm text-gray-500">Target: {targetGpa}</span>
					</div>
				)}
			</div>
		</div>
	);
}
