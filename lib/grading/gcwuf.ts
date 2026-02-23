// GCWUF Grading Engine - Quality Points Table System
// Strategy: Quality Points (QP) Lookup Table
// Formula: GPA = Sum(Quality Points) / Sum(Credit Hours)

import type { GradeResult, LetterGrade } from "@/types/grading";

const CREDIT_HOUR_CAPS: Record<number, number> = {
    5: 100,
    4: 80,
    3: 60,
    2: 40,
    1: 20,
};

// Official GCWUF Quality Points Lookup Table
const QUALITY_POINTS_TABLE: Record<number, Record<number, number>> = {
    // 5 Credit Hours (Max 100)
    5: {
        40: 5.00, 41: 5.50, 42: 6.00, 43: 6.50, 44: 7.00, 45: 7.50, 46: 8.00, 47: 8.50, 48: 9.00, 49: 9.50,
        50: 10.00, 51: 10.50, 52: 10.50, 53: 11.00, 54: 11.50, 55: 11.50, 56: 12.00, 57: 12.50, 58: 12.50, 59: 13.00,
        60: 13.50, 61: 13.50, 62: 14.00, 63: 14.50, 64: 14.50, 65: 15.00, 66: 15.50, 67: 15.50, 68: 16.00, 69: 16.50,
        70: 16.50, 71: 17.00, 72: 17.50, 73: 17.50, 74: 18.00, 75: 18.50, 76: 19.00, 77: 19.00, 78: 19.50, 79: 19.50,
        80: 20.00 // Marks >= 80 give max 20 QP
    },
    // 4 Credit Hours (Max 80)
    4: {
        32: 4.00, 33: 4.40, 34: 5.20, 35: 5.60, 36: 6.00, 37: 6.40, 38: 7.20, 39: 7.60,
        40: 8.00, 41: 8.40, 42: 8.80, 43: 8.80, 44: 9.20, 45: 9.60, 46: 10.00, 47: 10.40,
        48: 10.80, 49: 10.80, 50: 11.20, 51: 11.60, 52: 12.00, 53: 12.00, 54: 12.40, 55: 12.80,
        56: 13.20, 57: 13.60, 58: 14.00, 59: 14.40, 60: 14.80, 61: 14.80, 62: 15.20, 63: 15.60,
        64: 16.00 // Marks >= 64 give max 16 QP
    },
    // 3 Credit Hours (Max 60)
    3: {
        24: 3.00, 25: 3.60, 26: 3.90, 27: 4.50, 28: 5.10, 29: 5.40,
        30: 6.00, 31: 6.30, 32: 6.60, 33: 6.90, 34: 7.20, 35: 7.50, 36: 8.10, 37: 8.40, 38: 8.70,
        39: 9.00, 40: 9.30, 41: 9.60, 42: 9.90, 43: 10.20, 44: 10.50, 45: 11.10, 46: 11.40, 47: 11.70,
        48: 12.00 // Marks >= 48 give max 12 QP
    },
    // 2 Credit Hours (Max 40)
    2: {
        16: 2.00, 17: 2.60, 18: 3.00, 19: 3.60,
        20: 4.00, 21: 4.40, 22: 4.60, 23: 5.00, 24: 5.40, 25: 5.60, 26: 6.00, 27: 6.40, 28: 6.60, 29: 7.00,
        30: 7.40, 31: 7.60, 32: 8.00 // Marks >= 32 give max 8 QP
    },
    // 1 Credit Hour (Max 20)
    1: {
        8: 1.00, 9: 1.50, 10: 2.00, 11: 2.30, 12: 2.70, 13: 3.00, 14: 3.30, 15: 3.70,
        16: 4.00 // Marks >= 16 give max 4 QP
    }
};

export function getQualityPoints(
    obtainedMarks: number,
    creditHours: number,
    totalMarks: number,
): number {
    if (totalMarks <= 0) return 0;

    // Determine standard max marks for the credit hour
    const expectedMax = CREDIT_HOUR_CAPS[creditHours] || (creditHours * 20);

    // Normalize marks to the standard scale if necessary
    let normalizedMarks: number;
    if (Math.abs(totalMarks - expectedMax) < 0.1) {
        normalizedMarks = obtainedMarks;
    } else {
        normalizedMarks = (obtainedMarks / totalMarks) * expectedMax;
    }

    // Round to nearest whole number for table lookup
    const lookupKey = Math.round(normalizedMarks);

    const table = QUALITY_POINTS_TABLE[creditHours];
    if (!table) return 0;

    // Handle marks exceeding the capped maximum in the table
    const keys = Object.keys(table).map(Number).sort((a, b) => a - b);
    const maxKey = keys[keys.length - 1];

    if (lookupKey >= maxKey) {
        return table[maxKey];
    }

    return table[lookupKey] || 0;
}

export function getLetterGrade(
    obtainedMarks: number,
    creditHours: number,
    totalMarks?: number,
): LetterGrade {
    const total = totalMarks ?? (creditHours * 20);
    if (total === 0) return "F";

    const percentage = (obtainedMarks / total) * 100;

    // Standard GCWUF Grading Policy
    if (percentage >= 80) return "A";
    if (percentage >= 65) return "B";
    if (percentage >= 50) return "C";
    if (percentage >= 40) return "D";
    return "F";
}

export function calculateGradePoint(
    obtainedMarks: number,
    creditHours: number,
    totalMarks?: number,
): number {
    const total = totalMarks ?? (creditHours * 20);
    const qp = getQualityPoints(obtainedMarks, creditHours, total);

    if (creditHours === 0) return 0;

    return Math.round((qp / creditHours) * 100) / 100;
}

export function getGradeResult(
    obtainedMarks: number,
    creditHours: number,
    totalMarks?: number,
): GradeResult {
    const total = totalMarks ?? (creditHours * 20);
    const percentage = Math.round((obtainedMarks / total) * 100 * 100) / 100;

    return {
        letterGrade: getLetterGrade(obtainedMarks, creditHours, total),
        gradePoint: calculateGradePoint(obtainedMarks, creditHours, total),
        percentage,
    };
}

export function calculateSGPA(
    subjects: Array<{ marks: number; creditHours: number; totalMarks?: number }>,
): number {
    if (subjects.length === 0) return 0;

    let totalQualityPoints = 0;
    let totalCreditHours = 0;

    for (const s of subjects) {
        const total = s.totalMarks ?? (s.creditHours * 20);
        const qp = getQualityPoints(s.marks, s.creditHours, total);

        totalQualityPoints += qp;
        totalCreditHours += s.creditHours;
    }

    if (totalCreditHours === 0) return 0;
    return Math.round((totalQualityPoints / totalCreditHours) * 100) / 100;
}

export function calculateCGPA(
    semesters: Array<{ sgpa: number; totalCreditHours: number }>,
): number {
    if (semesters.length === 0) return 0;

    const totalWeightedPoints = semesters.reduce(
        (sum, s) => sum + s.sgpa * s.totalCreditHours,
        0,
    );
    const totalCreditHours = semesters.reduce(
        (sum, s) => sum + s.totalCreditHours,
        0,
    );

    if (totalCreditHours === 0) return 0;
    return Math.round((totalWeightedPoints / totalCreditHours) * 100) / 100;
}

export function calculateRequiredSGPA(
    currentCGPA: number,
    currentCredits: number,
    targetCGPA: number,
    nextSemesterCredits: number,
): number | null {
    if (nextSemesterCredits <= 0) return null;

    const currentWeightedSum = currentCGPA * currentCredits;
    const totalCreditsAfter = currentCredits + nextSemesterCredits;
    const requiredSGPA =
        (targetCGPA * totalCreditsAfter - currentWeightedSum) / nextSemesterCredits;

    if (requiredSGPA > 4.0) return null;
    if (requiredSGPA < 0) return 0;
    return Math.round(requiredSGPA * 100) / 100;
}
