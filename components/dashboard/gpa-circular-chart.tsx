"use client";

import { Target } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface GPACircularChartProps {
	cgpa: number;
	targetGpa: number;
}

export function GPACircularChart({ cgpa, targetGpa }: GPACircularChartProps) {
	const percentage = Math.min((cgpa / 4.0) * 100, 100);
	const circumference = 2 * Math.PI * 45;
	const strokeDashoffset = circumference - (percentage / 100) * circumference;

	return (
		<Card className="col-span-12 lg:col-span-4 bg-[#1a1a1a] border-[#2a2a2a] rounded-3xl overflow-hidden">
			<CardHeader className="pb-2">
				<div className="flex items-center gap-2">
					<Target className="h-5 w-5 text-orange-400" />
					<CardTitle className="text-lg font-semibold text-white">
						Progress
					</CardTitle>
				</div>
			</CardHeader>
			<CardContent className="flex items-center justify-center py-6">
				<div className="relative">
					{/* Outer circle */}
					<svg width="160" height="160" className="transform -rotate-90">
						{/* Background circle */}
						<circle
							cx="80"
							cy="80"
							r="65"
							stroke="#2a2a2a"
							strokeWidth="12"
							fill="none"
						/>
						{/* Progress circle */}
						<circle
							cx="80"
							cy="80"
							r="65"
							stroke="url(#gradient)"
							strokeWidth="12"
							fill="none"
							strokeLinecap="round"
							strokeDasharray={circumference}
							strokeDashoffset={strokeDashoffset}
							className="transition-all duration-1000"
						/>
						<defs>
							<linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
								<stop offset="0%" stopColor="#f97316" />
								<stop offset="100%" stopColor="#ef4444" />
							</linearGradient>
						</defs>
					</svg>

					{/* Center content */}
					<div className="absolute inset-0 flex flex-col items-center justify-center">
						<span className="text-4xl font-bold text-white">
							{cgpa.toFixed(2)}
						</span>
						<span className="text-xs text-gray-500 mt-1">
							of {targetGpa} target
						</span>
					</div>
				</div>
			</CardContent>

			{/* Stats below */}
			<div className="px-6 pb-6 grid grid-cols-2 gap-4">
				<div className="text-center p-3 rounded-2xl bg-[#252525]">
					<p className="text-2xl font-bold text-white">
						{((cgpa / targetGpa) * 100).toFixed(0)}%
					</p>
					<p className="text-xs text-gray-500 mt-1">To Target</p>
				</div>
				<div className="text-center p-3 rounded-2xl bg-[#252525]">
					<p className="text-2xl font-bold text-orange-400">
						{(targetGpa - cgpa).toFixed(2)}
					</p>
					<p className="text-xs text-gray-500 mt-1">Points Needed</p>
				</div>
			</div>
		</Card>
	);
}
