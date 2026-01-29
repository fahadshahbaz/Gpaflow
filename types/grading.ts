export type LetterGrade = "A+" | "A" | "B+" | "B" | "C+" | "C" | "D+" | "D" | "F";

export interface GradeResult {
    letterGrade: LetterGrade;
    gradePoint: number;
    percentage: number;
}

export interface Subject {
    id: string;
    semesterId: string;
    name: string;
    obtainedMarks: number;
    totalMarks: number;
    creditHours: number;
    gradePoint: number;
    letterGrade: LetterGrade;
}

export interface Semester {
    id: string;
    userId: string;
    semesterNumber: number;
    name: string;
    year: number;
    sgpa: number;
    totalCreditHours: number;
    subjects: Subject[];
}

export interface UserProfile {
    id: string;
    universityId: string;
    cgpa: number;
    totalCreditHours: number;
    createdAt: string;
    updatedAt: string;
}

export interface University {
    id: string;
    name: string;
    slug: string;
    gradingEngine: "numl" | "generic";
}
