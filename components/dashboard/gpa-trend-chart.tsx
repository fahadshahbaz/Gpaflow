"use client";

import { TrendingUp } from "lucide-react";
import { useMemo, useState } from "react";
import {
	Area,
	Bar,
	Cell,
	ComposedChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
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
	const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

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
		<div className="card-skeuo rounded-[32px] p-5 h-full flex flex-col justify-between">
			{/* Header */}
			<div className="flex items-start justify-between mb-2.5 select-none">
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
				<div className="flex flex-col justify-between flex-1 mt-1.5 min-h-[175px] relative">
					<div className="relative h-[135px] w-full mt-1">
						{/* Baseline Shelf */}
						<div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-slate-200/70 z-0 rounded-full" />

						{/* Recharts Chart */}
						<div className="absolute inset-0 z-10">
							<ResponsiveContainer width="100%" height="100%">
								<ComposedChart
									data={chartData}
									margin={{ top: 15, right: 2, left: 2, bottom: 0 }}
									barCategoryGap={6}
									onMouseMove={(state) => {
										if (state && state.activeTooltipIndex !== undefined) {
											setHoveredIndex(state.activeTooltipIndex);
										} else {
											setHoveredIndex(null);
										}
									}}
									onMouseLeave={() => setHoveredIndex(null)}
								>
									<defs>
										<linearGradient
											id="activeBarGradient"
											x1="0"
											y1="0"
											x2="0"
											y2="1"
										>
											<stop
												offset="0%"
												stopColor="var(--primary)"
												stopOpacity={1}
											/>
											<stop
												offset="100%"
												stopColor="#1d4ed8"
												stopOpacity={0.95}
											/>
										</linearGradient>
										<linearGradient
											id="fadedBarGradient"
											x1="0"
											y1="0"
											x2="0"
											y2="1"
										>
											<stop offset="0%" stopColor="#e2e8f0" stopOpacity={0.4} />
											<stop
												offset="100%"
												stopColor="#cbd5e1"
												stopOpacity={0.2}
											/>
										</linearGradient>
										<linearGradient
											id="connectorGradient"
											x1="0"
											y1="0"
											x2="0"
											y2="1"
										>
											<stop
												offset="0%"
												stopColor="var(--primary)"
												stopOpacity={0.08}
											/>
											<stop
												offset="100%"
												stopColor="var(--primary)"
												stopOpacity={0.0}
											/>
										</linearGradient>
									</defs>

									<XAxis dataKey="name" hide={true} />
									<YAxis hide={true} domain={[0, 4.1]} />

									<Tooltip
										cursor={false}
										allowEscapeViewBox={{ x: true, y: true }}
										content={({ active, payload }) => {
											if (active && payload && payload.length) {
												const data = payload[0].payload as ChartDataPoint;
												return (
													<div className="flex flex-col items-center select-none pointer-events-none transition-all duration-150 animate-fade-in -translate-x-1/2">
														{/* Floating Pill */}
														<div className="bg-slate-900/95 text-slate-100 border border-slate-800 rounded-full px-4 py-1.5 shadow-[0_12px_30px_rgba(15,23,42,0.25)] flex items-center gap-2.5 text-[11px] font-medium backdrop-blur-md">
															<span className="text-white font-bold">
																{data.semester}
															</span>
															<span className="h-3 w-[1px] bg-slate-800" />
															<span className="flex items-center gap-1">
																<span className="text-slate-400 font-normal">
																	SGPA:
																</span>
																<span className="text-primary-foreground font-semibold">
																	{data.sgpa.toFixed(2)}
																</span>
															</span>
															<span className="h-3 w-[1px] bg-slate-800" />
															<span className="flex items-center gap-1">
																<span className="text-slate-400 font-normal">
																	CGPA:
																</span>
																<span className="text-slate-200 font-semibold">
																	{data.cgpa.toFixed(2)}
																</span>
															</span>
														</div>
														{/* Hollow pointer dot */}
														<div className="flex flex-col items-center mt-1.5">
															<div className="h-2.5 w-[1px] bg-slate-400/50" />
															<div className="h-2 w-2 rounded-full border border-primary bg-white shadow-[0_0_8px_rgba(59,130,246,0.5)] mt-0.5 animate-pulse" />
														</div>
													</div>
												);
											}
											return null;
										}}
									/>

									{/* Histogram bars */}
									<Bar dataKey="sgpa" radius={[4, 4, 0, 0]} maxBarSize={48}>
										{chartData.map((_entry, index) => {
											const isHovered = hoveredIndex === index;
											const isLatest = index === chartData.length - 1;

											let fillUrl = "url(#activeBarGradient)";
											let opacity = 0.85;
											let stroke = "var(--primary)";
											let strokeOpacity = 0.5;

											if (hoveredIndex !== null) {
												if (isHovered) {
													fillUrl = "url(#activeBarGradient)";
													opacity = 1.0;
													stroke = "var(--primary)";
													strokeOpacity = 1.0;
												} else {
													fillUrl = "url(#fadedBarGradient)";
													opacity = 0.25;
													stroke = "#cbd5e1";
													strokeOpacity = 0.15;
												}
											} else {
												if (isLatest) {
													fillUrl = "url(#activeBarGradient)";
													opacity = 1.0;
													stroke = "var(--primary)";
													strokeOpacity = 0.9;
												} else {
													fillUrl = "url(#activeBarGradient)";
													opacity = 0.45;
													stroke = "var(--primary)";
													strokeOpacity = 0.2;
												}
											}

											return (
												<Cell
													key={`cell-${index}`}
													fill={fillUrl}
													opacity={opacity}
													stroke={stroke}
													strokeOpacity={strokeOpacity}
													strokeWidth={1}
													className="transition-all duration-300"
												/>
											);
										})}
									</Bar>

									{/* Connecting shaded area region underneath */}
									<Area
										type="linear"
										dataKey="sgpa"
										stroke="transparent"
										fill="url(#connectorGradient)"
										activeDot={false}
										dot={false}
										tooltipType="none"
									/>
								</ComposedChart>
							</ResponsiveContainer>
						</div>
					</div>

					{/* Bottom Labels showing Semester numbers S1, S2, etc. and SGPA values */}
					<div className="flex w-full mt-2.5 select-none justify-between border-t border-slate-100/90 pt-2">
						{chartData.map((item, index) => {
							const isHovered = hoveredIndex === index;
							const isLatest = index === chartData.length - 1;
							return (
								<div
									key={item.name}
									className="flex-1 flex flex-col items-center justify-center text-center px-0.5 transition-all duration-300"
									style={{
										opacity: hoveredIndex !== null ? (isHovered ? 1 : 0.3) : 1,
									}}
								>
									<span
										className={`text-[10px] font-bold ${isLatest ? "text-primary" : "text-slate-400"}`}
									>
										{item.name}
									</span>
									<span
										className={`text-xs mt-0.5 font-semibold ${isLatest ? "text-primary font-bold" : "text-slate-600 font-medium"}`}
									>
										{item.sgpa.toFixed(2)}
									</span>
								</div>
							);
						})}
					</div>
				</div>
			) : (
				/* No-Data Mock Preview Grid with faint background lines and SVG curves */
				<div className="relative h-[254px] w-full flex flex-col items-center justify-center border border-slate-100 rounded-2xl bg-slate-50/20 overflow-hidden">
					{/* Mock Background Grid Lines */}
					<div className="absolute inset-0 grid grid-cols-6 grid-rows-4 opacity-[0.06] pointer-events-none">
						{Array.from({ length: 24 }).map((_, i) => (
							<div
								key={i}
								className="border-r border-b border-slate-400 border-dashed"
							/>
						))}
					</div>

					{/* Faint Mock Chart Path */}
					<svg
						className="absolute inset-0 w-full h-full opacity-[0.04] pointer-events-none"
						preserveAspectRatio="none"
						role="img"
						aria-label="Decorative Mock Chart Path"
					>
						<title>Decorative Mock Chart Path</title>
						{/* Mock bars */}
						<rect
							x="10%"
							y="60%"
							width="8%"
							height="40%"
							fill="var(--primary)"
							rx="3"
						/>
						<rect
							x="25%"
							y="45%"
							width="8%"
							height="55%"
							fill="var(--primary)"
							rx="3"
						/>
						<rect
							x="40%"
							y="55%"
							width="8%"
							height="45%"
							fill="var(--primary)"
							rx="3"
						/>
						<rect
							x="55%"
							y="30%"
							width="8%"
							height="70%"
							fill="var(--primary)"
							rx="3"
						/>
						<rect
							x="70%"
							y="40%"
							width="8%"
							height="60%"
							fill="var(--primary)"
							rx="3"
						/>
						<rect
							x="85%"
							y="20%"
							width="8%"
							height="80%"
							fill="var(--primary)"
							rx="3"
						/>

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
							Add your first semester grades to activate performance tracking &
							GPA trend analysis.
						</p>
					</div>
				</div>
			)}
		</div>
	);
}
