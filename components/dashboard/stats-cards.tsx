"use client";

import { useMemo } from "react";
import { TrendingDown, TrendingUp } from "lucide-react";
import type { Semester } from "@/lib/supabase/queries";

interface StatsCardsProps {
	cgpa: number;
	totalCreditHours: number;
	semesterCount: number;
	targetGpa: number;
	semesters: Semester[];
}

export function StatsCards({
	cgpa,
	totalCreditHours,
	semesterCount,
	targetGpa,
	semesters,
}: StatsCardsProps) {
	// Calculate actual GPA change from last two semesters
	const gpaChange = useMemo(() => {
		if (semesters.length < 2) return null;
		const lastSGPA = semesters[semesters.length - 1].sgpa;
		const prevSGPA = semesters[semesters.length - 2].sgpa;
		return lastSGPA - prevSGPA;
	}, [semesters]);

	const isTargetMet = cgpa >= targetGpa;
	const percentageToTarget =
		targetGpa > 0 ? Math.min((cgpa / targetGpa) * 100, 100) : 0;

	return (
		<>
			{/* CGPA Card - Large Featured */}
			<div className="col-span-12 md:col-span-6 lg:col-span-4">
				<div className="bg-white rounded-3xl p-6 card-shadow h-full">
					<div className="flex items-center justify-between mb-2">
						<h3 className="text-sm font-medium text-gray-500">
							Cumulative GPA
						</h3>
					</div>
					<div className="flex items-end gap-3 mb-4">
						<span className="text-5xl font-light text-gray-900 tracking-tight">
							{cgpa.toFixed(2)}
						</span>
						{gpaChange !== null && (
							<div
								className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium mb-2 ${gpaChange >= 0
										? "bg-green-50 text-green-600"
										: "bg-red-50 text-red-600"
									}`}
							>
								{gpaChange >= 0 ? (
									<TrendingUp className="h-3.5 w-3.5" />
								) : (
									<TrendingDown className="h-3.5 w-3.5" />
								)}
								{gpaChange >= 0 ? "+" : ""}
								{gpaChange.toFixed(2)}
							</div>
						)}
					</div>

					{/* Progress to target */}
					<div className="space-y-2">
						<div className="flex items-center justify-between text-sm">
							<span className="text-gray-500">Progress to Target</span>
							<span className="font-medium text-gray-900">
								{targetGpa.toFixed(2)}
							</span>
						</div>
						<div className="h-2 bg-gray-100 rounded-full overflow-hidden">
							<div
								className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full transition-all duration-500"
								style={{ width: `${percentageToTarget}%` }}
							/>
						</div>
					</div>
				</div>
			</div>

			{/* Credit Hours */}
			<div className="col-span-6 md:col-span-3 lg:col-span-2">
				<div className="bg-white rounded-3xl p-6 card-shadow h-full">
					<h3 className="text-sm font-medium text-gray-500 mb-2">
						Total Credits
					</h3>
					<span className="text-4xl font-light text-gray-900 tracking-tight">
						{totalCreditHours}
					</span>
					<p className="text-sm text-gray-400 mt-2">credit hours</p>
				</div>
			</div>

			{/* Semesters */}
			<div className="col-span-6 md:col-span-3 lg:col-span-2">
				<div className="bg-white rounded-3xl p-6 card-shadow h-full">
					<h3 className="text-sm font-medium text-gray-500 mb-2">Semesters</h3>
					<div className="flex items-end gap-2">
						<span className="text-4xl font-light text-gray-900 tracking-tight">
							{semesterCount}
						</span>
						<span className="text-lg text-gray-400 mb-1">/ 8</span>
					</div>
					<div className="mt-3 h-1.5 bg-gray-100 rounded-full overflow-hidden">
						<div
							className="h-full bg-gray-400 rounded-full"
							style={{ width: `${(semesterCount / 8) * 100}%` }}
						/>
					</div>
				</div>
			</div>

			{/* Target GPA */}
			<div className="col-span-12 md:col-span-6 lg:col-span-4">
				<div className="bg-white rounded-3xl p-6 card-shadow h-full">
					<div className="flex items-center justify-between mb-2">
						<h3 className="text-sm font-medium text-gray-500">Target GPA</h3>
						{semesterCount > 0 && (
							<span
								className={`px-2.5 py-1 rounded-full text-xs font-medium ${isTargetMet
										? "bg-green-50 text-green-600"
										: "bg-amber-50 text-amber-600"
									}`}
							>
								{isTargetMet ? "Achieved" : "In Progress"}
							</span>
						)}
					</div>
					<span className="text-5xl font-light text-gray-900 tracking-tight">
						{targetGpa.toFixed(2)}
					</span>
					<div className="mt-4 flex items-center gap-4">
						{!isTargetMet && semesterCount > 0 && (
							<p className="text-sm text-gray-500">
								<span className="font-semibold text-blue-600">
									{(targetGpa - cgpa).toFixed(2)}
								</span>{" "}
								points needed
							</p>
						)}
					</div>
				</div>
			</div>
		</>
	);
}
