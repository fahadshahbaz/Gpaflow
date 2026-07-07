// Grading Engine Factory
// Provides a unified interface to access grading functions based on university

import type { GradingEngine, UniversitySlug } from "@/types/grading";
import * as gcufEngine from "./gcuf";
import * as gcwufEngine from "./gcwuf";
import * as numlEngine from "./numl";

/**
 * Get the grading engine for a specific university
 */
export function getUniversityGradingEngine(
	university: UniversitySlug,
): GradingEngine {
	switch (university) {
		case "gcwuf":
			return {
				calculateGradePoint: gcwufEngine.calculateGradePoint,
				getLetterGrade: gcwufEngine.getLetterGrade,
				calculateSGPA: gcwufEngine.calculateSGPA,
				calculateCGPA: gcwufEngine.calculateCGPA,
			};
		case "gcuf_arts":
			return gcufEngine.artsEngine;
		case "gcuf_eng":
			return gcufEngine.engEngine;
		default:
			return {
				calculateGradePoint: (marks: number) =>
					numlEngine.calculateGradePoint(marks),
				getLetterGrade: (marks: number) => numlEngine.getLetterGrade(marks),
				calculateSGPA: numlEngine.calculateSGPA,
				calculateCGPA: numlEngine.calculateCGPA,
			};
	}
}

// Re-export individual engines for direct access if needed
export { gcwufEngine as gcwuf, numlEngine as numl, gcufEngine as gcuf };
