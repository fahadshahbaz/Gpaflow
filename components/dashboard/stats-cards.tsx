"use client";

import { BookOpen, Clock, GraduationCap, Target } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface StatsCardsProps {
	cgpa: number;
	totalCreditHours: number;
	semesterCount: number;
	targetGpa: number;
}

export function StatsCards({
	cgpa,
	totalCreditHours,
	semesterCount,
	targetGpa,
}: StatsCardsProps) {
	const isTargetMet = cgpa >= targetGpa;
	const percentageToTarget = Math.min((cgpa / targetGpa) * 100, 100);

	return (
		<>
			{/* CGPA Card */}
			<div className="col-span-12 sm:col-span-6 lg:col-span-3">
				<Card className="bg-[#141414] border-[#262626] rounded-xl h-full">
					<CardContent className="p-5">
						<div className="flex items-center justify-between mb-3">
							<div className="h-9 w-9 rounded-lg bg-orange-500/10 flex items-center justify-center">
								<GraduationCap className="h-4.5 w-4.5 text-orange-500" />
							</div>
							<span
								className={`text-xs font-medium px-2 py-0.5 rounded ${isTargetMet ? "bg-green-500/10 text-green-500" : "bg-yellow-500/10 text-yellow-500"}`}
							>
								{isTargetMet ? "On Track" : "Below Target"}
							</span>
						</div>
						<p className="text-3xl font-semibold text-white">
							{cgpa.toFixed(2)}
						</p>
						<p className="text-sm text-gray-500 mt-1">Cumulative GPA</p>
						<div className="mt-3">
							<div className="h-1.5 bg-[#1a1a1a] rounded-full overflow-hidden">
								<div
									className="h-full bg-orange-500 rounded-full transition-all duration-500"
									style={{ width: `${percentageToTarget}%` }}
								/>
							</div>
							<p className="text-xs text-gray-600 mt-1.5">
								{percentageToTarget.toFixed(0)}% of target
							</p>
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Credit Hours */}
			<div className="col-span-6 sm:col-span-3 lg:col-span-2">
				<Card className="bg-[#141414] border-[#262626] rounded-xl h-full">
					<CardContent className="p-5">
						<div className="h-9 w-9 rounded-lg bg-[#1a1a1a] flex items-center justify-center mb-3">
							<Clock className="h-4.5 w-4.5 text-gray-400" />
						</div>
						<p className="text-3xl font-semibold text-white">
							{totalCreditHours}
						</p>
						<p className="text-sm text-gray-500 mt-1">Total Credits</p>
					</CardContent>
				</Card>
			</div>

			{/* Semesters */}
			<div className="col-span-6 sm:col-span-3 lg:col-span-2">
				<Card className="bg-[#141414] border-[#262626] rounded-xl h-full">
					<CardContent className="p-5">
						<div className="flex items-center justify-between mb-3">
							<div className="h-9 w-9 rounded-lg bg-[#1a1a1a] flex items-center justify-center">
								<BookOpen className="h-4.5 w-4.5 text-gray-400" />
							</div>
							<span className="text-xs text-gray-600">of 8</span>
						</div>
						<p className="text-3xl font-semibold text-white">{semesterCount}</p>
						<p className="text-sm text-gray-500 mt-1">Semesters</p>
						<div className="mt-3">
							<div className="h-1.5 bg-[#1a1a1a] rounded-full overflow-hidden">
								<div
									className="h-full bg-gray-600 rounded-full"
									style={{ width: `${(semesterCount / 8) * 100}%` }}
								/>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Target GPA */}
			<div className="col-span-12 sm:col-span-6 lg:col-span-5">
				<Card className="bg-[#141414] border-[#262626] rounded-xl h-full">
					<CardContent className="p-5">
						<div className="flex items-start justify-between">
							<div>
								<div className="h-9 w-9 rounded-lg bg-orange-500/10 flex items-center justify-center mb-3">
									<Target className="h-4.5 w-4.5 text-orange-500" />
								</div>
								<p className="text-3xl font-semibold text-white">
									{targetGpa.toFixed(2)}
								</p>
								<p className="text-sm text-gray-500 mt-1">Target GPA</p>
							</div>
							<div className="text-right">
								<p className="text-sm text-gray-500">
									{isTargetMet ? (
										<span className="text-green-500">Target achieved</span>
									) : (
										<>
											<span className="text-white font-medium">
												{(targetGpa - cgpa).toFixed(2)}
											</span>{" "}
											points needed
										</>
									)}
								</p>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</>
	);
}
