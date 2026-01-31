"use client";

import { Activity, BarChart3, LineChart as LineChartIcon } from "lucide-react";
import * as React from "react";
import {
	Area,
	Bar,
	BarChart,
	CartesianGrid,
	ComposedChart,
	Line,
	ReferenceLine,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Semester } from "@/lib/supabase/queries";
import { cn } from "@/lib/utils";

interface GPATrendChartProps {
	semesters: Semester[];
	targetGpa?: number;
}

type ChartView = "bar" | "line";

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
	const [view, setView] = React.useState<ChartView>("line");

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
		<Card className="col-span-12 lg:col-span-8 bg-[#141414] border-[#262626] rounded-xl">
			<CardHeader className="pb-2">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-2">
						<Activity className="h-4 w-4 text-gray-500" />
						<CardTitle className="text-sm font-medium text-white">
							GPA Trend
						</CardTitle>
						{isDemo && (
							<span className="text-[10px] text-gray-600 bg-[#1a1a1a] px-1.5 py-0.5 rounded">
								Demo
							</span>
						)}
					</div>
					<div className="flex items-center gap-0.5 bg-[#1a1a1a] rounded-lg p-0.5">
						<Button
							variant="ghost"
							size="sm"
							onClick={() => setView("line")}
							className={cn(
								"h-7 px-2.5 text-xs font-medium rounded-md",
								view === "line"
									? "bg-[#262626] text-white"
									: "text-gray-500 hover:text-gray-300",
							)}
						>
							<LineChartIcon className="h-3.5 w-3.5 mr-1" />
							Line
						</Button>
						<Button
							variant="ghost"
							size="sm"
							onClick={() => setView("bar")}
							className={cn(
								"h-7 px-2.5 text-xs font-medium rounded-md",
								view === "bar"
									? "bg-[#262626] text-white"
									: "text-gray-500 hover:text-gray-300",
							)}
						>
							<BarChart3 className="h-3.5 w-3.5 mr-1" />
							Bar
						</Button>
					</div>
				</div>
			</CardHeader>
			<CardContent className="pt-2">
				<div className="h-[260px] w-full">
					<ResponsiveContainer width="100%" height="100%">
						{view === "bar" ? (
							<BarChart
								data={chartData}
								margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
							>
								<CartesianGrid
									strokeDasharray="3 3"
									stroke="rgba(255,255,255,0.03)"
									vertical={false}
								/>
								<XAxis
									dataKey="name"
									stroke="transparent"
									fontSize={11}
									tickLine={false}
									axisLine={false}
									tick={{ fill: "#525252" }}
								/>
								<YAxis
									stroke="transparent"
									fontSize={11}
									tickLine={false}
									axisLine={false}
									tick={{ fill: "#525252" }}
									domain={[0, 4]}
									ticks={[0, 1, 2, 3, 4]}
								/>
								<Tooltip
									cursor={{ fill: "rgba(255,255,255,0.02)" }}
									content={({ active, payload }) => {
										if (active && payload && payload.length) {
											const data = payload[0].payload as ChartDataPoint;
											return (
												<div className="bg-[#1a1a1a] border border-[#262626] rounded-lg px-3 py-2 text-xs">
													<p className="text-gray-500 mb-1.5">
														{data.semester}
													</p>
													<div className="space-y-0.5">
														<div className="flex justify-between gap-4">
															<span className="text-gray-400">SGPA</span>
															<span className="text-orange-500 font-medium">
																{data.sgpa}
															</span>
														</div>
														<div className="flex justify-between gap-4">
															<span className="text-gray-400">CGPA</span>
															<span className="text-white font-medium">
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
								{targetGpa && (
									<ReferenceLine
										y={targetGpa}
										stroke="#525252"
										strokeDasharray="4 4"
										strokeWidth={1}
									/>
								)}
								<Bar
									dataKey="sgpa"
									fill="#f97316"
									radius={[4, 4, 0, 0]}
									maxBarSize={40}
								/>
							</BarChart>
						) : (
							<ComposedChart
								data={chartData}
								margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
							>
								<defs>
									<linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
										<stop offset="0%" stopColor="#f97316" stopOpacity={0.15} />
										<stop offset="100%" stopColor="#f97316" stopOpacity={0} />
									</linearGradient>
								</defs>
								<CartesianGrid
									strokeDasharray="3 3"
									stroke="rgba(255,255,255,0.03)"
									vertical={false}
								/>
								<XAxis
									dataKey="name"
									stroke="transparent"
									fontSize={11}
									tickLine={false}
									axisLine={false}
									tick={{ fill: "#525252" }}
								/>
								<YAxis
									stroke="transparent"
									fontSize={11}
									tickLine={false}
									axisLine={false}
									tick={{ fill: "#525252" }}
									domain={[0, 4]}
									ticks={[0, 1, 2, 3, 4]}
								/>
								<Tooltip
									cursor={{ stroke: "rgba(249, 115, 22, 0.2)", strokeWidth: 1 }}
									content={({ active, payload }) => {
										if (active && payload && payload.length) {
											const data = payload[0].payload as ChartDataPoint;
											return (
												<div className="bg-[#1a1a1a] border border-[#262626] rounded-lg px-3 py-2 text-xs">
													<p className="text-gray-500 mb-1.5">
														{data.semester}
													</p>
													<div className="space-y-0.5">
														<div className="flex justify-between gap-4">
															<span className="text-gray-400">CGPA</span>
															<span className="text-orange-500 font-medium">
																{data.cgpa}
															</span>
														</div>
														<div className="flex justify-between gap-4">
															<span className="text-gray-400">SGPA</span>
															<span className="text-gray-300">{data.sgpa}</span>
														</div>
													</div>
												</div>
											);
										}
										return null;
									}}
								/>
								{targetGpa && (
									<ReferenceLine
										y={targetGpa}
										stroke="#525252"
										strokeDasharray="4 4"
										strokeWidth={1}
									/>
								)}
								<Area
									type="monotone"
									dataKey="cgpa"
									fill="url(#areaGradient)"
									stroke="none"
								/>
								<Line
									type="monotone"
									dataKey="cgpa"
									stroke="#f97316"
									strokeWidth={2}
									dot={{
										fill: "#141414",
										stroke: "#f97316",
										strokeWidth: 2,
										r: 3,
									}}
									activeDot={{
										r: 4,
										fill: "#f97316",
										stroke: "#141414",
										strokeWidth: 2,
									}}
								/>
							</ComposedChart>
						)}
					</ResponsiveContainer>
				</div>
				<div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
					<div className="flex items-center gap-1.5">
						<div className="w-3 h-0.5 bg-orange-500 rounded" />
						<span>CGPA</span>
					</div>
					{targetGpa && (
						<div className="flex items-center gap-1.5">
							<div className="w-3 h-0 border-t border-dashed border-gray-500" />
							<span>Target: {targetGpa}</span>
						</div>
					)}
				</div>
			</CardContent>
		</Card>
	);
}
