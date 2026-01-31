"use client";

import { Sparkles } from "lucide-react";
import type { Semester } from "@/lib/supabase/queries";

interface InsightCardProps {
	semesters: Semester[];
	cgpa: number;
}

function generateInsight(semesters: Semester[], cgpa: number) {
	if (semesters.length === 0) {
		return {
			percentage: "0%",
			title: "Start Your Journey",
			description:
				"Add your first semester to begin tracking your academic progress.",
			gradient: "from-blue-400 via-blue-500 to-indigo-600",
		};
	}

	if (semesters.length < 2) {
		return {
			percentage: `${((cgpa / 4) * 100).toFixed(0)}%`,
			title: "Great Start!",
			description: `You're at ${cgpa.toFixed(2)} CGPA. Keep adding semesters to track your progress.`,
			gradient: "from-blue-400 via-cyan-500 to-teal-500",
		};
	}

	// Compare last two semesters
	const lastSemester = semesters[semesters.length - 1];
	const prevSemester = semesters[semesters.length - 2];
	const improvement = lastSemester.sgpa - prevSemester.sgpa;
	const percentageChange = ((improvement / prevSemester.sgpa) * 100).toFixed(0);

	if (improvement > 0) {
		return {
			percentage: `+${percentageChange}%`,
			title: "GPA Improved!",
			description: `Your SGPA increased by ${improvement.toFixed(2)} compared to ${prevSemester.name}.`,
			gradient: "from-green-400 via-emerald-500 to-teal-500",
		};
	} else if (improvement < 0) {
		return {
			percentage: `${percentageChange}%`,
			title: "Room for Growth",
			description: `Focus on improvement. Your SGPA dropped by ${Math.abs(improvement).toFixed(2)} from last semester.`,
			gradient: "from-orange-400 via-amber-500 to-yellow-500",
		};
	} else {
		return {
			percentage: "Stable",
			title: "Consistent Performance",
			description: "You maintained your SGPA. Keep up the steady progress!",
			gradient: "from-blue-400 via-indigo-500 to-purple-500",
		};
	}
}

export function InsightCard({ semesters, cgpa }: InsightCardProps) {
	const insight = generateInsight(semesters, cgpa);

	return (
		<div
			className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${insight.gradient} p-6 text-white`}
		>
			{/* Decorative circles */}
			<div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/10" />
			<div className="absolute -right-4 top-8 h-16 w-16 rounded-full bg-white/10" />
			<div className="absolute -bottom-6 -left-6 h-24 w-24 rounded-full bg-white/10" />

			{/* Content */}
			<div className="relative z-10">
				<div className="flex items-center gap-2 mb-4">
					<Sparkles className="h-4 w-4" />
					<span className="text-xs font-medium uppercase tracking-wider opacity-90">
						Insights
					</span>
				</div>

				<p className="text-5xl font-light tracking-tight mb-3">
					{insight.percentage}
				</p>

				<h3 className="text-lg font-semibold mb-1">{insight.title}</h3>

				<p className="text-sm opacity-90 leading-relaxed">
					{insight.description}
				</p>
			</div>
		</div>
	);
}
