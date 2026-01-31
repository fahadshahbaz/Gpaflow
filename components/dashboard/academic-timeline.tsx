"use client";

import { Calendar, ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Semester } from "@/lib/supabase/queries";

interface AcademicTimelineProps {
	semesters: Semester[];
}

export function AcademicTimeline({ semesters }: AcademicTimelineProps) {
	// Sort semesters by semester_number
	const sortedSemesters = [...semesters].sort(
		(a, b) => a.semester_number - b.semester_number,
	);

	// Demo data if no real data
	const demoSemesters = [
		{
			id: "1",
			name: "Semester 1",
			sgpa: 3.2,
			total_credit_hours: 15,
			semester_number: 1,
		},
		{
			id: "2",
			name: "Semester 2",
			sgpa: 3.5,
			total_credit_hours: 18,
			semester_number: 2,
		},
		{
			id: "3",
			name: "Semester 3",
			sgpa: 3.6,
			total_credit_hours: 16,
			semester_number: 3,
		},
		{
			id: "4",
			name: "Semester 4",
			sgpa: 3.4,
			total_credit_hours: 17,
			semester_number: 4,
		},
		{
			id: "5",
			name: "Semester 5",
			sgpa: 3.7,
			total_credit_hours: 15,
			semester_number: 5,
		},
	];

	const displaySemesters =
		sortedSemesters.length > 0 ? sortedSemesters : demoSemesters;

	return (
		<Card className="col-span-12 lg:col-span-8 bg-[#1a1a1a] border-[#2a2a2a] rounded-3xl overflow-hidden">
			<CardHeader className="pb-3 flex flex-row items-center justify-between">
				<CardTitle className="text-lg font-semibold text-white flex items-center gap-2">
					<Calendar className="h-5 w-5 text-orange-400" />
					Academic Timeline
				</CardTitle>
				<span className="text-xs text-gray-500">
					{semesters.length > 0 ? "Your journey" : "Demo preview"}
				</span>
			</CardHeader>
			<CardContent className="pt-2">
				<div className="relative">
					{/* Timeline bar */}
					<div className="absolute top-6 left-0 right-0 h-1 bg-[#2a2a2a] rounded-full" />

					{/* Progress indicator */}
					<div
						className="absolute top-6 left-0 h-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-full transition-all duration-500"
						style={{ width: `${(displaySemesters.length / 8) * 100}%` }}
					/>

					{/* Semester dots */}
					<div className="flex justify-between relative pt-2">
						{displaySemesters.map((semester, index) => (
							<motion.div
								key={semester.id}
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: index * 0.1 }}
								className="flex flex-col items-center cursor-pointer group"
							>
								{/* Dot */}
								<div className="relative z-10 w-5 h-5 rounded-full bg-[#1a1a1a] border-2 border-orange-500 flex items-center justify-center group-hover:scale-125 transition-transform">
									<div className="w-2 h-2 rounded-full bg-orange-500" />
								</div>

								{/* Label */}
								<div className="mt-3 text-center">
									<p className="text-xs text-gray-500 group-hover:text-white transition-colors">
										S{index + 1}
									</p>
									<p className="text-sm font-semibold text-white mt-0.5">
										{semester.sgpa.toFixed(2)}
									</p>
									<p className="text-[10px] text-gray-600 mt-0.5">
										{semester.total_credit_hours} CH
									</p>
								</div>
							</motion.div>
						))}

						{/* Future semesters (dotted) */}
						{Array.from({
							length: Math.max(0, 8 - displaySemesters.length),
						}).map((_, i) => (
							<div
								key={`future-${i}`}
								className="flex flex-col items-center opacity-40"
							>
								<div className="relative z-10 w-5 h-5 rounded-full bg-[#1a1a1a] border-2 border-dashed border-[#3a3a3a] flex items-center justify-center">
									<div className="w-1.5 h-1.5 rounded-full bg-[#3a3a3a]" />
								</div>
								<div className="mt-3 text-center">
									<p className="text-xs text-gray-600">
										S{displaySemesters.length + i + 1}
									</p>
								</div>
							</div>
						))}
					</div>
				</div>

				{/* Timeline details */}
				<div className="mt-8 pt-4 border-t border-[#2a2a2a] flex items-center justify-between">
					<div className="flex items-center gap-6">
						<div>
							<p className="text-xs text-gray-500">Completed</p>
							<p className="text-lg font-semibold text-white">
								{displaySemesters.length} Semesters
							</p>
						</div>
						<div className="h-8 w-px bg-[#2a2a2a]" />
						<div>
							<p className="text-xs text-gray-500">Credits</p>
							<p className="text-lg font-semibold text-white">
								{displaySemesters.reduce(
									(sum, s) => sum + s.total_credit_hours,
									0,
								)}
							</p>
						</div>
						<div className="h-8 w-px bg-[#2a2a2a]" />
						<div>
							<p className="text-xs text-gray-500">Average</p>
							<p className="text-lg font-semibold text-orange-400">
								{(
									displaySemesters.reduce((sum, s) => sum + s.sgpa, 0) /
									displaySemesters.length
								).toFixed(2)}
							</p>
						</div>
					</div>

					<button
						type="button"
						className="flex items-center gap-1 text-sm text-gray-500 hover:text-orange-400 transition-colors"
					>
						View all <ChevronRight className="h-4 w-4" />
					</button>
				</div>
			</CardContent>
		</Card>
	);
}
