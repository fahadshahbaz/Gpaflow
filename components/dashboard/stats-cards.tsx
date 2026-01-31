"use client";

import {
	BookOpen,
	Clock,
	GraduationCap,
	Target,
	TrendingDown,
	TrendingUp,
} from "lucide-react";
import { motion } from "motion/react";
import { Line, LineChart, ResponsiveContainer } from "recharts";
import { Card, CardContent } from "@/components/ui/card";

interface StatsCardsProps {
	cgpa: number;
	totalCreditHours: number;
	semesterCount: number;
	targetGpa: number;
}

// Sparkline data
const sparklineData = [
	{ value: 3.1 },
	{ value: 3.2 },
	{ value: 3.3 },
	{ value: 3.2 },
	{ value: 3.4 },
	{ value: 3.5 },
	{ value: 3.6 },
];

const creditData = [
	{ value: 12 },
	{ value: 15 },
	{ value: 18 },
	{ value: 16 },
	{ value: 15 },
	{ value: 17 },
	{ value: 18 },
];

export function StatsCards({
	cgpa,
	totalCreditHours,
	semesterCount,
	targetGpa,
}: StatsCardsProps) {
	const isTargetMet = cgpa >= targetGpa;
	const percentageToTarget = (cgpa / targetGpa) * 100;
	const percentageToMax = (cgpa / 4.0) * 100;

	return (
		<>
			{/* CGPA - Large Card */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className="col-span-12 md:col-span-6 lg:col-span-5"
			>
				<Card className="bg-[#1a1a1a] border-[#2a2a2a] rounded-3xl overflow-hidden h-full">
					<CardContent className="p-6 h-full flex flex-col">
						<div className="flex items-start justify-between mb-4">
							<div className="flex items-center gap-3">
								<div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center shadow-lg shadow-orange-500/20">
									<GraduationCap className="h-6 w-6 text-white" />
								</div>
								<div>
									<p className="text-sm text-gray-500">Cumulative GPA</p>
									<p className="text-4xl font-bold text-white">
										{cgpa.toFixed(2)}
									</p>
								</div>
							</div>
							<div
								className={`flex items-center gap-1 px-3 py-1.5 rounded-full ${isTargetMet ? "bg-orange-500/10" : "bg-red-500/10"}`}
							>
								{isTargetMet ? (
									<>
										<TrendingUp className="h-4 w-4 text-orange-400" />
										<span className="text-sm font-medium text-orange-400">
											On Track
										</span>
									</>
								) : (
									<>
										<TrendingDown className="h-4 w-4 text-red-400" />
										<span className="text-sm font-medium text-red-400">
											Below
										</span>
									</>
								)}
							</div>
						</div>

						{/* Progress bars */}
						<div className="space-y-3 mb-4">
							<div>
								<div className="flex items-center justify-between text-xs mb-1">
									<span className="text-gray-500">To target ({targetGpa})</span>
									<span className="text-orange-400 font-medium">
										{percentageToTarget.toFixed(1)}%
									</span>
								</div>
								<div className="h-2 bg-[#2a2a2a] rounded-full overflow-hidden">
									<div
										className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full transition-all duration-1000"
										style={{ width: `${Math.min(percentageToTarget, 100)}%` }}
									/>
								</div>
							</div>
							<div>
								<div className="flex items-center justify-between text-xs mb-1">
									<span className="text-gray-500">To maximum (4.0)</span>
									<span className="text-gray-400">
										{percentageToMax.toFixed(1)}%
									</span>
								</div>
								<div className="h-1.5 bg-[#2a2a2a] rounded-full overflow-hidden">
									<div
										className="h-full bg-gray-600 rounded-full"
										style={{ width: `${percentageToMax}%` }}
									/>
								</div>
							</div>
						</div>

						{/* Sparkline */}
						<div className="h-16 mt-auto">
							<ResponsiveContainer width="100%" height="100%">
								<LineChart data={sparklineData}>
									<Line
										type="monotone"
										dataKey="value"
										stroke="#f97316"
										strokeWidth={2}
										dot={false}
									/>
								</LineChart>
							</ResponsiveContainer>
						</div>
					</CardContent>
				</Card>
			</motion.div>

			{/* Credit Hours */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, delay: 0.1 }}
				className="col-span-6 md:col-span-3 lg:col-span-2"
			>
				<Card className="bg-[#1a1a1a] border-[#2a2a2a] rounded-3xl overflow-hidden h-full">
					<CardContent className="p-5 h-full flex flex-col">
						<div className="h-10 w-10 rounded-xl bg-[#252525] flex items-center justify-center mb-3">
							<Clock className="h-5 w-5 text-gray-400" />
						</div>
						<p className="text-3xl font-bold text-white">{totalCreditHours}</p>
						<p className="text-sm text-gray-500 mt-1">Credits</p>
						<div className="h-10 mt-auto">
							<ResponsiveContainer width="100%" height="100%">
								<LineChart data={creditData}>
									<Line
										type="monotone"
										dataKey="value"
										stroke="#6b7280"
										strokeWidth={2}
										dot={false}
									/>
								</LineChart>
							</ResponsiveContainer>
						</div>
					</CardContent>
				</Card>
			</motion.div>

			{/* Semesters */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, delay: 0.2 }}
				className="col-span-6 md:col-span-3 lg:col-span-2"
			>
				<Card className="bg-[#1a1a1a] border-[#2a2a2a] rounded-3xl overflow-hidden h-full">
					<CardContent className="p-5 h-full flex flex-col">
						<div className="flex items-center justify-between mb-3">
							<div className="h-10 w-10 rounded-xl bg-[#252525] flex items-center justify-center">
								<BookOpen className="h-5 w-5 text-gray-400" />
							</div>
							<span className="text-xs text-gray-500">of 8</span>
						</div>
						<p className="text-3xl font-bold text-white">{semesterCount}</p>
						<p className="text-sm text-gray-500 mt-1">Semesters</p>
						<div className="mt-auto pt-3">
							<div className="h-2 bg-[#2a2a2a] rounded-full overflow-hidden">
								<div
									className="h-full bg-gray-500 rounded-full"
									style={{ width: `${(semesterCount / 8) * 100}%` }}
								/>
							</div>
						</div>
					</CardContent>
				</Card>
			</motion.div>

			{/* Target GPA */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, delay: 0.3 }}
				className="col-span-12 md:col-span-6 lg:col-span-3"
			>
				<Card className="bg-gradient-to-br from-orange-500 to-red-500 border-0 rounded-3xl overflow-hidden h-full">
					<CardContent className="p-5 h-full flex flex-col justify-between">
						<div className="flex items-center justify-between">
							<div className="h-10 w-10 rounded-xl bg-white/20 flex items-center justify-center">
								<Target className="h-5 w-5 text-white" />
							</div>
						</div>
						<div>
							<p className="text-4xl font-bold text-white">
								{targetGpa.toFixed(2)}
							</p>
							<p className="text-sm text-orange-100/70 mt-1">Target GPA</p>
							<p className="text-xs text-orange-100/50 mt-2">
								{isTargetMet
									? "Target achieved! 🎉"
									: `${(targetGpa - cgpa).toFixed(2)} points needed`}
							</p>
						</div>
					</CardContent>
				</Card>
			</motion.div>
		</>
	);
}
