// Grading Engine Factory
// Provides a unified interface to access grading functions based on university

import type { GradingEngine, UniversitySlug } from "@/types/grading";
import * as numlEngine from "./numl";
import * as gcuwfEngine from "./gcuwf";

/**
 * Get the grading engine for a specific university
 */
export function getUniversityGradingEngine(university: UniversitySlug): GradingEngine {
    switch (university) {
        case "gcuwf":
            return {
                calculateGradePoint: gcuwfEngine.calculateGradePoint,
                getLetterGrade: gcuwfEngine.getLetterGrade,
                calculateSGPA: gcuwfEngine.calculateSGPA,
                calculateCGPA: gcuwfEngine.calculateCGPA,
            };
        case "numl":
        default:
            return {
                calculateGradePoint: (marks: number) =>
                    numlEngine.calculateGradePoint(marks),
                getLetterGrade: (marks: number) => numlEngine.getLetterGrade(marks),
                calculateSGPA: (subjects) =>
                    numlEngine.calculateSGPA(
                        subjects.map((s) => ({
                            gradePoint: s.gradePoint ?? 0,
                            creditHours: s.creditHours,
                        })),
                    ),
                calculateCGPA: numlEngine.calculateCGPA,
            };
    }
}

// Re-export individual engines for direct access if needed
export { numlEngine as numl, gcuwfEngine as gcuwf };
