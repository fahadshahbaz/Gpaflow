"use client";

import { ArrowUpRight, TrendingDown, TrendingUp } from "lucide-react";
import { Line, LineChart, ResponsiveContainer } from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import type { Semester } from "@/lib/supabase/queries";

interface QuickInsightsProps {
	semesters: Semester[];
	avgSGPA: number;
	bestSemester: Semester | null;
}

// Demo trend data
const trendData = [
	{ value: 3.1 },
	{ value: 3.3 },
	{ value: 3.2 },
	{ value: 3.5 },
	{ value: 3.4 },
	{ value: 3.6 },
	{ value: 3.7 },
];

export function QuickInsights({ avgSGPA, bestSemester }: QuickInsightsProps) {
	const trend = trendData[trendData.length - 1].value > trendData[0].value;

	return (
		<div className="col-span-12 lg:col-span-4 space-y-4">
			{/* Average SGPA Card */}
			<Card className="bg-[#1a1a1a] border-[#2a2a2a] rounded-3xl overflow-hidden">
				<CardContent className="p-5">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm text-gray-500 mb-1">Average SGPA</p>
							<div className="flex items-baseline gap-2">
								<span className="text-3xl font-bold text-white">
									{avgSGPA.toFixed(2)}
								</span>
								<div
									className={`flex items-center gap-0.5 text-xs ${trend ? "text-orange-400" : "text-red-400"}`}
								>
									{trend ? (
										<TrendingUp className="h-3 w-3" />
									) : (
										<TrendingDown className="h-3 w-3" />
									)}
									<span>+12%</span>
								</div>
							</div>
						</div>
						<div className="h-14 w-24">
							<ResponsiveContainer width="100%" height="100%">
								<LineChart data={trendData}>
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
					</div>
				</CardContent>
			</Card>

			{/* Best Semester Card */}
			<Card className="bg-gradient-to-br from-orange-500 to-red-500 border-0 rounded-3xl overflow-hidden">
				<CardContent className="p-5">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-orange-100/80 text-sm mb-1">
								Best Performance
							</p>
							<p className="text-xl font-bold text-white truncate max-w-[150px]">
								{bestSemester?.name || "No data"}
							</p>
						</div>
						<div className="text-right">
							<p className="text-3xl font-bold text-white">
								{bestSemester ? bestSemester.sgpa.toFixed(2) : "0.00"}
							</p>
							<p className="text-orange-100/60 text-xs">SGPA</p>
						</div>
					</div>
					<div className="mt-4 flex items-center gap-1 text-sm text-white/80 hover:text-white cursor-pointer transition-colors">
						View details <ArrowUpRight className="h-4 w-4" />
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
