"use client";

import {
	BookOpen,
	ChevronDown,
	ChevronRight,
	ChevronUp,
	MoreVertical,
	Pencil,
	Plus,
	Trash2,
} from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getLetterGrade } from "@/lib/grading/numl";
import type { Semester, Subject } from "@/lib/supabase/queries";
import { AddSubjectDialog } from "./add-subject-dialog";
import { DeleteSemesterDialog } from "./delete-semester-dialog";
import { DeleteSubjectDialog } from "./delete-subject-dialog";
import { EditSemesterDialog } from "./edit-semester-dialog";
import { EditSubjectDialog } from "./edit-subject-dialog";

interface SemesterListProps {
	semesters: Semester[];
}

export function SemesterList({ semesters }: SemesterListProps) {
	const [editingSemester, setEditingSemester] = useState<Semester | null>(null);
	const [deletingSemester, setDeletingSemester] = useState<Semester | null>(
		null,
	);
	const [editingSubject, setEditingSubject] = useState<{
		subject: Subject;
		semesterId: string;
	} | null>(null);
	const [deletingSubject, setDeletingSubject] = useState<{
		subject: Subject;
		semesterId: string;
	} | null>(null);
	const [expandedSemesters, setExpandedSemesters] = useState<Set<string>>(
		new Set(),
	);

	const toggleExpanded = (semesterId: string) => {
		setExpandedSemesters((prev) => {
			const next = new Set(prev);
			if (next.has(semesterId)) {
				next.delete(semesterId);
			} else {
				next.add(semesterId);
			}
			return next;
		});
	};

	if (semesters.length === 0) {
		return (
			<Card className="bg-[#141414] border-[#262626] rounded-xl">
				<CardContent className="p-10 text-center">
					<div className="h-12 w-12 rounded-lg bg-[#1a1a1a] flex items-center justify-center mx-auto mb-4">
						<BookOpen className="h-6 w-6 text-gray-500" />
					</div>
					<h3 className="text-base font-medium text-white mb-1">
						No semesters yet
					</h3>
					<p className="text-sm text-gray-500 max-w-xs mx-auto">
						Start tracking your academic journey by adding your first semester
					</p>
				</CardContent>
			</Card>
		);
	}

	return (
		<>
			<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
				{semesters.map((semester, index) => (
					<Card
						key={semester.id}
						className="bg-[#141414] border-[#262626] rounded-xl hover:border-[#333] transition-colors"
					>
						<CardHeader className="pb-3 border-b border-[#1f1f1f]">
							<div className="flex items-center justify-between">
								<div className="flex items-center gap-2.5">
									<div className="h-8 w-8 rounded-lg bg-[#1a1a1a] flex items-center justify-center">
										<span className="text-sm font-medium text-gray-400">
											{index + 1}
										</span>
									</div>
									<CardTitle className="text-sm font-medium text-white">
										{semester.name}
									</CardTitle>
								</div>
								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<Button
											variant="ghost"
											size="icon"
											className="h-7 w-7 text-gray-500 hover:text-white hover:bg-[#1a1a1a]"
										>
											<MoreVertical className="h-3.5 w-3.5" />
										</Button>
									</DropdownMenuTrigger>
									<DropdownMenuContent
										align="end"
										className="bg-[#141414] border-[#262626] min-w-[130px]"
									>
										<DropdownMenuItem
											onClick={() => setEditingSemester(semester)}
											className="text-gray-300 hover:text-white hover:bg-[#1a1a1a] focus:bg-[#1a1a1a] cursor-pointer text-sm"
										>
											<Pencil className="h-3.5 w-3.5 mr-2 text-gray-500" />
											Edit
										</DropdownMenuItem>
										<DropdownMenuItem
											onClick={() => setDeletingSemester(semester)}
											className="text-red-400 hover:text-red-300 hover:bg-red-500/10 focus:bg-red-500/10 cursor-pointer text-sm"
										>
											<Trash2 className="h-3.5 w-3.5 mr-2" />
											Delete
										</DropdownMenuItem>
									</DropdownMenuContent>
								</DropdownMenu>
							</div>
							<div className="flex items-center gap-2 mt-2.5">
								<Badge className="bg-orange-500/10 text-orange-500 border-0 px-2 py-0.5 text-xs font-medium">
									{semester.sgpa.toFixed(2)} SGPA
								</Badge>
								<Badge
									variant="secondary"
									className="bg-[#1a1a1a] text-gray-500 border-0 text-xs"
								>
									{semester.total_credit_hours} CH
								</Badge>
							</div>
						</CardHeader>
						<CardContent className="p-3">
							{semester.subjects.length === 0 ? (
								<div className="py-3 text-center">
									<p className="text-sm text-gray-600 mb-2">No subjects yet</p>
									<AddSubjectDialog
										semesterId={semester.id}
										semesterName={semester.name}
										trigger={
											<Button
												variant="ghost"
												size="sm"
												className="text-orange-500 hover:text-orange-400 hover:bg-orange-500/5 h-7 text-xs"
											>
												Add subject{" "}
												<ChevronRight className="h-3.5 w-3.5 ml-0.5" />
											</Button>
										}
									/>
								</div>
							) : (
								<div className="space-y-1.5">
									{(expandedSemesters.has(semester.id)
										? semester.subjects
										: semester.subjects.slice(0, 4)
									).map((subject) => (
										<div
											key={subject.id}
											className="flex items-center justify-between rounded-lg bg-[#1a1a1a] px-2.5 py-2 text-sm group/subject"
										>
											<div className="flex items-center gap-2 flex-1 min-w-0">
												<span className="text-gray-300 truncate text-sm">
													{subject.name}
												</span>
											</div>
											<div className="flex items-center gap-1.5">
												<span className="text-orange-500 font-medium text-sm">
													{getLetterGrade(subject.obtained_marks)}
												</span>
												<span className="text-gray-600 text-xs">
													{subject.credit_hours}ch
												</span>
												<DropdownMenu>
													<DropdownMenuTrigger asChild>
														<Button
															variant="ghost"
															size="icon"
															className="h-5 w-5 text-gray-600 hover:text-white hover:bg-[#262626] opacity-0 group-hover/subject:opacity-100 transition-opacity"
														>
															<MoreVertical className="h-3 w-3" />
														</Button>
													</DropdownMenuTrigger>
													<DropdownMenuContent
														align="end"
														className="bg-[#141414] border-[#262626] min-w-[100px]"
													>
														<DropdownMenuItem
															onClick={() =>
																setEditingSubject({
																	subject,
																	semesterId: semester.id,
																})
															}
															className="text-gray-300 hover:text-white hover:bg-[#1a1a1a] focus:bg-[#1a1a1a] cursor-pointer text-xs"
														>
															<Pencil className="h-3 w-3 mr-1.5 text-gray-500" />
															Edit
														</DropdownMenuItem>
														<DropdownMenuItem
															onClick={() =>
																setDeletingSubject({
																	subject,
																	semesterId: semester.id,
																})
															}
															className="text-red-400 hover:text-red-300 hover:bg-red-500/10 focus:bg-red-500/10 cursor-pointer text-xs"
														>
															<Trash2 className="h-3 w-3 mr-1.5" />
															Delete
														</DropdownMenuItem>
													</DropdownMenuContent>
												</DropdownMenu>
											</div>
										</div>
									))}
									{semester.subjects.length > 4 && (
										<Button
											variant="ghost"
											size="sm"
											onClick={() => toggleExpanded(semester.id)}
											className="w-full text-gray-500 hover:text-white hover:bg-[#1a1a1a] h-7 text-xs"
										>
											{expandedSemesters.has(semester.id) ? (
												<>
													<ChevronUp className="h-3 w-3 mr-1" />
													Show less
												</>
											) : (
												<>
													<ChevronDown className="h-3 w-3 mr-1" />+
													{semester.subjects.length - 4} more
												</>
											)}
										</Button>
									)}
									<AddSubjectDialog
										semesterId={semester.id}
										semesterName={semester.name}
										trigger={
											<Button
												variant="ghost"
												size="sm"
												className="w-full text-gray-500 hover:text-orange-500 hover:bg-[#1a1a1a] h-7 text-xs mt-1"
											>
												<Plus className="h-3 w-3 mr-1" />
												Add Subject
											</Button>
										}
									/>
								</div>
							)}
						</CardContent>
					</Card>
				))}
			</div>

			{/* Semester Dialogs */}
			{editingSemester && (
				<EditSemesterDialog
					semesterId={editingSemester.id}
					currentName={editingSemester.name}
					open={!!editingSemester}
					onOpenChange={(open) => !open && setEditingSemester(null)}
				/>
			)}

			{deletingSemester && (
				<DeleteSemesterDialog
					semesterId={deletingSemester.id}
					semesterName={deletingSemester.name}
					subjectCount={deletingSemester.subjects.length}
					open={!!deletingSemester}
					onOpenChange={(open) => !open && setDeletingSemester(null)}
				/>
			)}

			{/* Subject Dialogs */}
			{editingSubject && (
				<EditSubjectDialog
					subject={editingSubject.subject}
					semesterId={editingSubject.semesterId}
					open={!!editingSubject}
					onOpenChange={(open) => !open && setEditingSubject(null)}
				/>
			)}

			{deletingSubject && (
				<DeleteSubjectDialog
					subjectId={deletingSubject.subject.id}
					subjectName={deletingSubject.subject.name}
					semesterId={deletingSubject.semesterId}
					open={!!deletingSubject}
					onOpenChange={(open) => !open && setDeletingSubject(null)}
				/>
			)}
		</>
	);
}
