"use client";

import { useMemo } from "react";
import {
	Area,
	Bar,
	CartesianGrid,
	ComposedChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
import { TrendingUp } from "lucide-react";
import type { Semester } from "@/types/grading";

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

export function GPATrendChart({
	semesters,
	targetGpa = 3.5,
}: GPATrendChartProps) {
	const chartData = useMemo<ChartDataPoint[]>(() => {
		if (semesters.length === 0) return [];

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

	const hasData = chartData.length > 0;

	return (
		<div className="card-skeuo rounded-[32px] p-6 h-full flex flex-col justify-between">
			{/* Header */}
			<div className="flex items-start justify-between mb-4">
				<div>
					<h3 className="text-lg font-semibold text-slate-800">
						GPA Progression
					</h3>
					<p className="text-sm text-slate-500 font-normal">
						Semester-wise performance tracking
					</p>
				</div>
				<div className="icon-skeuo-raised h-9 w-9 rounded-xl border border-slate-200/80 shadow-[inset_0_1px_0_#ffffff,0_2px_4px_rgba(0,0,0,0.02)] text-slate-400/90 flex items-center justify-center flex-shrink-0">
					<TrendingUp className="h-4.5 w-4.5" />
				</div>
			</div>

			{hasData ? (
				<>
					{/* Stats Row with physically-inset digital LCD display modules */}
					<div className="flex flex-wrap gap-2.5 mb-4 pb-4 border-b border-slate-100/90">
						{chartData.map((item, index) => {
							const isLatest = index === chartData.length - 1;
							return (
								<div
									key={item.name}
									title={item.semester}
									className={`widget-skeuo-inset rounded-xl px-3 py-1.5 flex flex-col items-center justify-center min-w-[72px] border border-slate-200/50 shadow-[inset_0_1.5px_3px_rgba(0,0,0,0.04),0_1px_0_#ffffff] transition-all duration-200 ${
										isLatest
											? "bg-slate-50/30 border-primary/20 shadow-[inset_0_1.5px_3px_rgba(59,130,246,0.03),0_1px_0_#ffffff] scale-[1.02]"
											: "hover:bg-white"
									}`}
								>
									<span className="text-[10px] uppercase font-normal tracking-wider text-slate-400 mb-0.5">
										{item.name}
									</span>
									<span
										className={`text-sm font-normal ${
											isLatest ? "text-primary font-medium" : "text-slate-700"
										}`}
									>
										{item.sgpa.toFixed(2)}
									</span>
								</div>
							);
						})}
					</div>

					{/* Chart with Cartesian engineering grid lines */}
					<div className="h-[200px] w-full">
						<ResponsiveContainer width="100%" height="100%">
							<ComposedChart
								data={chartData}
								margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
							>
								<defs>
									<linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
										<stop
											offset="0%"
											stopColor="var(--primary)"
											stopOpacity={0.8}
										/>
										<stop
											offset="100%"
											stopColor="var(--primary)"
											stopOpacity={0.3}
										/>
									</linearGradient>
									<linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
										<stop
											offset="0%"
											stopColor="var(--primary)"
											stopOpacity={0.15}
										/>
										<stop
											offset="100%"
											stopColor="var(--primary)"
											stopOpacity={0}
										/>
									</linearGradient>
								</defs>
								<CartesianGrid
									vertical={false}
									stroke="#e2e8f0"
									strokeDasharray="3 3"
									opacity={0.6}
								/>
								<XAxis
									dataKey="name"
									stroke="transparent"
									fontSize={11}
									tickLine={false}
									axisLine={false}
									tick={{ fill: "var(--muted-foreground)" }}
									dy={5}
								/>
								<YAxis
									stroke="transparent"
									fontSize={11}
									tickLine={false}
									axisLine={false}
									tick={{ fill: "var(--muted-foreground)" }}
									domain={[0, 4]}
									ticks={[0, 1, 2, 3, 4]}
								/>
								<Tooltip
									cursor={{ fill: "transparent" }}
									content={({ active, payload }) => {
										if (active && payload && payload.length) {
											const data = payload[0].payload as ChartDataPoint;
											return (
												<div className="bg-white/90 backdrop-blur-md border border-slate-200/80 rounded-2xl px-3.5 py-2.5 shadow-[0_12px_28px_rgba(15,23,42,0.06),inset_0_1px_0_#ffffff]">
													<p className="text-xs font-normal text-slate-800 mb-1.5">
														{data.semester}
													</p>
													<div className="space-y-1.5">
														<div className="flex items-center justify-between gap-6">
															<span className="text-xs text-slate-400 font-normal">
																SGPA
															</span>
															<span className="text-xs font-normal text-primary">
																{data.sgpa}
															</span>
														</div>
														<div className="flex items-center justify-between gap-6">
															<span className="text-xs text-slate-400 font-normal">
																CGPA
															</span>
															<span className="text-xs font-normal text-slate-700">
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
								<Bar
									dataKey="sgpa"
									fill="url(#barGradient)"
									radius={[4, 4, 0, 0]}
									maxBarSize={40}
								/>
								<Area
									type="monotone"
									dataKey="cgpa"
									fill="url(#areaGradient)"
									stroke="var(--primary)"
									strokeWidth={2}
									dot={{ fill: "var(--primary)", strokeWidth: 0, r: 3 }}
									activeDot={{ fill: "var(--primary)", strokeWidth: 0, r: 5 }}
								/>
							</ComposedChart>
						</ResponsiveContainer>
					</div>

					{/* Legend */}
					<div className="flex items-center gap-6 mt-3 pt-3 border-t border-slate-100/90">
						<div className="flex items-center gap-2">
							<div className="w-3.5 h-3.5 rounded bg-primary/20 border border-primary/20 flex items-center justify-center">
								<div className="w-1.5 h-1.5 rounded-sm bg-primary/60" />
							</div>
							<span className="text-xs text-slate-400 font-normal">SGPA</span>
						</div>
						<div className="flex items-center gap-2">
							<div className="w-4 h-1 bg-primary rounded shadow-[0_1px_2px_rgba(0,0,0,0.15)]" />
							<span className="text-xs text-slate-400 font-normal">CGPA Trend</span>
						</div>
						{targetGpa && (
							<div className="flex items-center gap-2 ml-auto">
								<span className="text-xs text-slate-400 font-normal">
									Target: {targetGpa}
								</span>
							</div>
						)}
					</div>
				</>
			) : (
				/* No-Data Mock Preview Grid with faint background lines and SVG curves */
				<div className="relative h-[254px] w-full flex flex-col items-center justify-center border border-slate-100 rounded-2xl bg-slate-50/20 overflow-hidden">
					{/* Mock Background Grid Lines */}
					<div className="absolute inset-0 grid grid-cols-6 grid-rows-4 opacity-[0.06] pointer-events-none">
						{Array.from({ length: 24 }).map((_, i) => (
							<div key={i} className="border-r border-b border-slate-400 border-dashed" />
						))}
					</div>

					{/* Faint Mock Chart Path */}
					<svg className="absolute inset-0 w-full h-full opacity-[0.04] pointer-events-none" preserveAspectRatio="none">
						{/* Mock bars */}
						<rect x="10%" y="60%" width="8%" height="40%" fill="var(--primary)" rx="3" />
						<rect x="25%" y="45%" width="8%" height="55%" fill="var(--primary)" rx="3" />
						<rect x="40%" y="55%" width="8%" height="45%" fill="var(--primary)" rx="3" />
						<rect x="55%" y="30%" width="8%" height="70%" fill="var(--primary)" rx="3" />
						<rect x="70%" y="40%" width="8%" height="60%" fill="var(--primary)" rx="3" />
						<rect x="85%" y="20%" width="8%" height="80%" fill="var(--primary)" rx="3" />

						{/* Mock Trend Line */}
						<path
							d="M 14% 60% Q 29% 45% 44% 55% T 74% 40% T 89% 20%"
							fill="none"
							stroke="var(--primary)"
							strokeWidth="2.5"
							strokeDasharray="4 4"
						/>
						{/* Mock Dots */}
						<circle cx="14%" cy="60%" r="3.5" fill="var(--primary)" />
						<circle cx="29%" cy="45%" r="3.5" fill="var(--primary)" />
						<circle cx="44%" cy="55%" r="3.5" fill="var(--primary)" />
						<circle cx="59%" cy="30%" r="3.5" fill="var(--primary)" />
						<circle cx="74%" cy="40%" r="3.5" fill="var(--primary)" />
						<circle cx="89%" cy="20%" r="3.5" fill="var(--primary)" />
					</svg>

					{/* Content Call-To-Action */}
					<div className="relative z-10 flex flex-col items-center justify-center text-center p-6 select-none">
						<div className="icon-skeuo-raised h-12 w-12 rounded-2xl border border-slate-200/80 shadow-[inset_0_1px_0_#ffffff,0_2px_6px_rgba(0,0,0,0.03)] text-slate-400/90 flex items-center justify-center mb-3">
							<TrendingUp className="h-5 w-5" />
						</div>
						<h4 className="text-sm font-normal text-slate-700 mb-1">
							No Academic Data Yet
						</h4>
						<p className="text-xs text-slate-400 max-w-[260px] leading-relaxed font-normal">
							Add your first semester grades to activate performance tracking & GPA trend analysis.
						</p>
					</div>
				</div>
			)}
		</div>
	);
}
