"use server";

import {
	calculateCGPA,
	calculateGradePoint,
	calculateSGPA,
} from "@/lib/grading/numl";
import { createClient } from "@/lib/supabase/server";

export type Semester = {
	id: string;
	name: string;
	semester_number: number;
	year: number;
	sgpa: number;
	total_credit_hours: number;
	subjects: Subject[];
};

export type Subject = {
	id: string;
	name: string;
	obtained_marks: number;
	credit_hours: number;
	grade_point: number;
};

export async function getSemesters(userId: string): Promise<Semester[]> {
	const supabase = await createClient();

	const { data: semesters, error } = await supabase
		.from("semesters")
		.select(`
			id,
			name,
			semester_number,
			year,
			subjects (
				id,
				name,
				obtained_marks,
				credit_hours
			)
		`)
		.eq("user_id", userId)
		.order("semester_number", { ascending: true });

	if (error || !semesters) {
		console.error("Error fetching semesters:", error);
		return [];
	}

	return semesters.map((semester) => {
		const subjectsWithGrades = (semester.subjects || []).map((subject) => ({
			...subject,
			grade_point: calculateGradePoint(subject.obtained_marks),
		}));

		const sgpa = calculateSGPA(
			subjectsWithGrades.map((s: Subject) => ({
				gradePoint: s.grade_point,
				creditHours: s.credit_hours,
			})),
		);

		const totalCreditHours = subjectsWithGrades.reduce(
			(sum: number, s: Subject) => sum + s.credit_hours,
			0,
		);

		return {
			id: semester.id,
			name: semester.name,
			semester_number: semester.semester_number,
			year: semester.year,
			sgpa,
			total_credit_hours: totalCreditHours,
			subjects: subjectsWithGrades,
		};
	});
}

export type DashboardStats = {
	cgpa: number;
	totalCreditHours: number;
	semesterCount: number;
	targetGpa: number;
};

export async function getDashboardStats(
	userId: string,
): Promise<DashboardStats> {
	const semesters = await getSemesters(userId);

	const cgpa = calculateCGPA(
		semesters.map((s) => ({
			sgpa: s.sgpa,
			totalCreditHours: s.total_credit_hours,
		})),
	);

	const totalCreditHours = semesters.reduce(
		(sum, s) => sum + s.total_credit_hours,
		0,
	);

	return {
		cgpa,
		totalCreditHours,
		semesterCount: semesters.length,
		targetGpa: 3.5, // default target, could be stored in user profile
	};
}
