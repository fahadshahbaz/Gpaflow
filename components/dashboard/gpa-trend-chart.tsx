"use client";

import {
	Activity,
	BarChart3,
	LineChart as LineChartIcon,
	Target,
	TrendingDown,
	TrendingUp,
} from "lucide-react";
import { motion } from "motion/react";
import * as React from "react";
import {
	Area,
	Bar,
	BarChart,
	CartesianGrid,
	Cell,
	ComposedChart,
	Line,
	LineChart,
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
	projected: number | null;
	credits: number;
	semesterId: string;
}

// Demo data
const demoData: ChartDataPoint[] = [
	{
		name: "S1",
		semester: "Semester 1",
		sgpa: 3.2,
		cgpa: 3.2,
		projected: 3.5,
		credits: 15,
		semesterId: "1",
	},
	{
		name: "S2",
		semester: "Semester 2",
		sgpa: 3.5,
		cgpa: 3.35,
		projected: 3.52,
		credits: 18,
		semesterId: "2",
	},
	{
		name: "S3",
		semester: "Semester 3",
		sgpa: 3.6,
		cgpa: 3.43,
		projected: 3.54,
		credits: 16,
		semesterId: "3",
	},
	{
		name: "S4",
		semester: "Semester 4",
		sgpa: 3.4,
		cgpa: 3.43,
		projected: 3.56,
		credits: 17,
		semesterId: "4",
	},
	{
		name: "S5",
		semester: "Semester 5",
		sgpa: 3.7,
		cgpa: 3.48,
		projected: 3.58,
		credits: 15,
		semesterId: "5",
	},
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

			const remainingSemesters = 8 - (index + 1);
			const projected =
				remainingSemesters > 0 && targetGpa
					? (targetGpa * (cumulativeCredits + remainingSemesters * 15) -
							cumulativePoints) /
						(remainingSemesters * 15)
					: null;

			return {
				name: `S${index + 1}`,
				semester: semester.name,
				sgpa: Number(semester.sgpa.toFixed(2)),
				cgpa: Number(cgpa.toFixed(2)),
				projected: projected !== null ? Number(projected.toFixed(2)) : null,
				credits: semester.total_credit_hours,
				semesterId: semester.id,
			};
		});
	}, [semesters, targetGpa]);

	const trend = React.useMemo(() => {
		if (chartData.length < 2) return null;
		const first = chartData[0].cgpa;
		const last = chartData[chartData.length - 1].cgpa;
		const change = last - first;
		const percentChange = first > 0 ? (change / first) * 100 : 0;
		return {
			direction: change >= 0 ? "up" : ("down" as const),
			change: Math.abs(change).toFixed(2),
			percent: Math.abs(percentChange).toFixed(1),
		};
	}, [chartData]);

	const hasEnoughData = semesters.length >= 2;

	return (
		<Card className="col-span-12 lg:col-span-8 bg-[#1a1a1a] border-[#2a2a2a] rounded-3xl overflow-hidden">
			<CardHeader className="pb-2">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-3">
						<div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
							<Activity className="h-5 w-5 text-white" />
						</div>
						<div>
							<CardTitle className="text-lg font-semibold text-white">
								GPA Trend
							</CardTitle>
							{trend && (
								<motion.div
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									className="flex items-center gap-1.5 mt-0.5"
								>
									{trend.direction === "up" ? (
										<>
											<TrendingUp className="h-3.5 w-3.5 text-orange-400" />
											<span className="text-xs text-orange-400 font-medium">
												+{trend.change}
											</span>
										</>
									) : (
										<>
											<TrendingDown className="h-3.5 w-3.5 text-red-400" />
											<span className="text-xs text-red-400 font-medium">
												-{trend.change}
											</span>
										</>
									)}
									<span className="text-xs text-gray-500">
										from first semester
									</span>
								</motion.div>
							)}
						</div>
					</div>
					<div className="flex items-center gap-1 bg-[#252525] rounded-xl p-1">
						<Button
							variant="ghost"
							size="sm"
							onClick={() => setView("line")}
							className={cn(
								"h-8 px-3 text-xs font-medium transition-all rounded-lg",
								view === "line"
									? "bg-[#333333] text-white"
									: "text-gray-500 hover:text-gray-300",
							)}
						>
							<LineChartIcon className="h-3.5 w-3.5 mr-1.5" />
							Trend
						</Button>
						<Button
							variant="ghost"
							size="sm"
							onClick={() => setView("bar")}
							className={cn(
								"h-8 px-3 text-xs font-medium transition-all rounded-lg",
								view === "bar"
									? "bg-[#333333] text-white"
									: "text-gray-500 hover:text-gray-300",
							)}
						>
							<BarChart3 className="h-3.5 w-3.5 mr-1.5" />
							Semesters
						</Button>
					</div>
				</div>
			</CardHeader>
			<CardContent className="pt-2">
				<div className="h-[300px] w-full">
					<ResponsiveContainer width="100%" height="100%">
						{view === "bar" ? (
							<BarChart
								data={chartData}
								margin={{ top: 20, right: 20, left: -10, bottom: 5 }}
							>
								<defs>
									<linearGradient
										id="barGradientOrange"
										x1="0"
										y1="0"
										x2="0"
										y2="1"
									>
										<stop offset="0%" stopColor="#f97316" stopOpacity={1} />
										<stop offset="100%" stopColor="#ea580c" stopOpacity={0.6} />
									</linearGradient>
								</defs>
								<CartesianGrid
									strokeDasharray="3 3"
									stroke="rgba(255,255,255,0.05)"
									vertical={false}
								/>
								<XAxis
									dataKey="name"
									stroke="rgba(255,255,255,0.1)"
									fontSize={12}
									tickLine={false}
									axisLine={false}
									tick={{ fill: "#737373" }}
								/>
								<YAxis
									stroke="rgba(255,255,255,0.1)"
									fontSize={12}
									tickLine={false}
									axisLine={false}
									tick={{ fill: "#737373" }}
									domain={[0, 4.5]}
									ticks={[0, 1, 2, 3, 4]}
								/>
								<Tooltip
									cursor={{ fill: "rgba(249, 115, 22, 0.05)" }}
									content={({ active, payload }) => {
										if (active && payload && payload.length) {
											const data = payload[0].payload as ChartDataPoint;
											return (
												<div className="bg-[#1a1a1a] border border-[#333333] rounded-xl px-4 py-3 shadow-2xl">
													<p className="text-xs text-gray-500 font-medium mb-2">
														{data.semester}
													</p>
													<div className="space-y-1">
														<div className="flex items-center justify-between gap-6">
															<span className="text-xs text-gray-400">
																SGPA
															</span>
															<span className="text-sm font-semibold text-orange-400">
																{data.sgpa}
															</span>
														</div>
														<div className="flex items-center justify-between gap-6">
															<span className="text-xs text-gray-400">
																CGPA
															</span>
															<span className="text-sm font-semibold text-white">
																{data.cgpa}
															</span>
														</div>
														<div className="flex items-center justify-between gap-6">
															<span className="text-xs text-gray-400">
																Credits
															</span>
															<span className="text-sm text-gray-500">
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
								{targetGpa && (
									<ReferenceLine
										y={targetGpa}
										stroke="#f59e0b"
										strokeDasharray="5 5"
										strokeWidth={2}
									/>
								)}
								<Bar
									dataKey="sgpa"
									fill="url(#barGradientOrange)"
									radius={[8, 8, 0, 0]}
									maxBarSize={60}
								/>
							</BarChart>
						) : (
							<ComposedChart
								data={chartData}
								margin={{ top: 20, right: 20, left: -10, bottom: 5 }}
							>
								<defs>
									<linearGradient
										id="lineGradientOrange"
										x1="0"
										y1="0"
										x2="0"
										y2="1"
									>
										<stop offset="5%" stopColor="#f97316" stopOpacity={0.3} />
										<stop offset="95%" stopColor="#f97316" stopOpacity={0} />
									</linearGradient>
								</defs>
								<CartesianGrid
									strokeDasharray="3 3"
									stroke="rgba(255,255,255,0.05)"
									vertical={false}
								/>
								<XAxis
									dataKey="name"
									stroke="rgba(255,255,255,0.1)"
									fontSize={12}
									tickLine={false}
									axisLine={false}
									tick={{ fill: "#737373" }}
								/>
								<YAxis
									stroke="rgba(255,255,255,0.1)"
									fontSize={12}
									tickLine={false}
									axisLine={false}
									tick={{ fill: "#737373" }}
									domain={[0, 4.5]}
									ticks={[0, 1, 2, 3, 4]}
								/>
								<Tooltip
									cursor={{ stroke: "rgba(249, 115, 22, 0.3)", strokeWidth: 2 }}
									content={({ active, payload }) => {
										if (active && payload && payload.length) {
											const data = payload[0].payload as ChartDataPoint;
											return (
												<div className="bg-[#1a1a1a] border border-[#333333] rounded-xl px-4 py-3 shadow-2xl">
													<p className="text-xs text-gray-500 font-medium mb-2">
														{data.semester}
													</p>
													<div className="space-y-1">
														<div className="flex items-center justify-between gap-6">
															<span className="text-xs text-gray-400">
																CGPA
															</span>
															<span className="text-sm font-semibold text-orange-400">
																{data.cgpa}
															</span>
														</div>
														<div className="flex items-center justify-between gap-6">
															<span className="text-xs text-gray-500">
																SGPA
															</span>
															<span className="text-sm text-gray-400">
																{data.sgpa}
															</span>
														</div>
														{data.projected && (
															<div className="flex items-center justify-between gap-6">
																<span className="text-xs text-amber-500/80">
																	Required
																</span>
																<span className="text-sm text-amber-400">
																	{data.projected}
																</span>
															</div>
														)}
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
										stroke="#f59e0b"
										strokeDasharray="5 5"
										strokeWidth={2}
									/>
								)}
								<Area
									type="monotone"
									dataKey="cgpa"
									fill="url(#lineGradientOrange)"
									stroke="none"
								/>
								<Line
									type="monotone"
									dataKey="cgpa"
									stroke="#f97316"
									strokeWidth={3}
									dot={{
										fill: "#171717",
										stroke: "#f97316",
										strokeWidth: 3,
										r: 5,
									}}
									activeDot={{
										r: 7,
										fill: "#f97316",
										stroke: "#171717",
										strokeWidth: 3,
									}}
								/>
							</ComposedChart>
						)}
					</ResponsiveContainer>
				</div>
				{targetGpa && (
					<div className="flex items-center justify-between mt-4">
						<div className="flex items-center gap-2">
							<div className="w-6 h-0 border-t-2 border-dashed border-amber-500" />
							<span className="text-xs text-gray-500">
								Target:{" "}
								<span className="text-amber-500 font-medium">{targetGpa}</span>
							</span>
						</div>
						{!hasEnoughData && (
							<span className="text-[10px] text-gray-600 italic">
								Demo data shown
							</span>
						)}
					</div>
				)}
			</CardContent>
		</Card>
	);
}
