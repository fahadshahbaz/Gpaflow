"use client";

import {
	BookOpen,
	ChevronRight,
	MoreVertical,
	Pencil,
	Plus,
	Trash2,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getUniversityGradingEngine } from "@/lib/grading";
import type { Semester, Subject, UniversitySlug } from "@/types/grading";
import { AddSubjectDialog } from "./add-subject-dialog";
import { DeleteSemesterDialog } from "./delete-semester-dialog";
import { DeleteSubjectDialog } from "./delete-subject-dialog";
import { EditSemesterDialog } from "./edit-semester-dialog";
import { EditSubjectDialog } from "./edit-subject-dialog";

interface SemesterListProps {
	semesters: Semester[];
	university: UniversitySlug;
}

export function SemesterList({ semesters, university }: SemesterListProps) {
	const _engine = getUniversityGradingEngine(university);
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
	const [activeSemesterId, setActiveSemesterId] = useState<string | null>(null);

	const toggleExpanded = (semesterId: string) => {
		setActiveSemesterId((prev) => (prev === semesterId ? null : semesterId));
	};

	if (semesters.length === 0) {
		return (
			<div className="py-16 text-center">
				<div className="h-14 w-14 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-4">
					<BookOpen className="h-7 w-7 text-gray-400" />
				</div>
				<h3 className="text-lg font-medium text-gray-900 mb-1">
					No semesters yet
				</h3>
				<p className="text-sm text-gray-500 max-w-xs mx-auto">
					Start tracking your academic journey by adding your first semester
				</p>
			</div>
		);
	}

	return (
		<>
			<div className="space-y-3">
				{semesters.map((semester, index) => {
					const isCurrentExpanded = activeSemesterId === semester.id;

					return (
						<div
							key={semester.id}
							className="card-skeuo rounded-2xl overflow-hidden mb-3"
						>
							{/* Accordion Trigger Header */}
							<div
								onClick={() => toggleExpanded(semester.id)}
								onKeyDown={(e) => {
									if (e.key === "Enter" || e.key === " ") {
										toggleExpanded(semester.id);
									}
								}}
								role="button"
								tabIndex={0}
								className="flex items-center justify-between p-3 sm:p-4 cursor-pointer hover:bg-slate-50/50 transition-colors select-none"
							>
								<div className="flex items-center gap-2 sm:gap-3">
									{/* Tactile Inset Number Circle */}
									<div className="h-9 w-9 rounded-xl icon-skeuo-inset flex items-center justify-center">
										<span className="text-xs font-bold text-gray-500">
											{index + 1}
										</span>
									</div>
									<div>
										<h4 className="text-xs sm:text-sm font-bold text-gray-900 whitespace-nowrap">
											{semester.name}
										</h4>
										<p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
											{semester.year}
										</p>
									</div>
								</div>

								<div className="flex items-center gap-1.5 sm:gap-3">
									{/* Tactile Badges */}
									<span className="px-1.5 sm:px-3 py-0.5 sm:py-1.5 rounded-lg sm:rounded-xl icon-skeuo-raised text-blue-600 text-[10px] sm:text-xs font-bold">
										{semester.sgpa.toFixed(2)} SGPA
									</span>
									<span className="px-2.5 py-1.5 rounded-xl icon-skeuo-inset text-gray-500 text-xs font-medium hidden sm:inline">
										{semester.total_credit_hours} Credits
									</span>

									{/* Options Dropdown */}
									<DropdownMenu>
										<DropdownMenuTrigger asChild>
											<button
												type="button"
												className="h-8 w-8 rounded-full hover:bg-slate-200/50 flex items-center justify-center text-gray-400 cursor-pointer"
												aria-label="More options"
												onClick={(e) => e.stopPropagation()}
											>
												<MoreVertical className="h-4 w-4" />
											</button>
										</DropdownMenuTrigger>
										<DropdownMenuContent
											align="end"
											className="bg-white border-gray-200 min-w-[140px] rounded-xl shadow-lg z-50"
										>
											<DropdownMenuItem
												onClick={(e) => {
													e.stopPropagation();
													setEditingSemester(semester);
												}}
												className="cursor-pointer text-sm rounded-lg"
											>
												<Pencil className="h-4 w-4 mr-2 text-gray-400" />
												Edit
											</DropdownMenuItem>
											<DropdownMenuItem
												variant="destructive"
												onClick={(e) => {
													e.stopPropagation();
													setDeletingSemester(semester);
												}}
												className="cursor-pointer text-sm rounded-lg"
											>
												<Trash2 className="h-4 w-4 mr-2" />
												Delete
											</DropdownMenuItem>
										</DropdownMenuContent>
									</DropdownMenu>

									{/* Expand/Collapse Chevron Indicator */}
									<ChevronRight
										className={`h-4.5 w-4.5 text-gray-400 transition-transform duration-300 ${
											isCurrentExpanded ? "rotate-90" : ""
										}`}
									/>
								</div>
							</div>

							{/* Collapsible Panel Body */}
							<AnimatePresence initial={false}>
								{isCurrentExpanded && (
									<motion.div
										initial={{ height: 0, opacity: 0 }}
										animate={{ height: "auto", opacity: 1 }}
										exit={{ height: 0, opacity: 0 }}
										transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
										className="overflow-hidden"
									>
										<div className="p-4 border-t border-slate-100/90 bg-slate-50/20 space-y-2.5">
											{semester.subjects.length === 0 ? (
												<div className="py-8 text-center bg-white rounded-xl border border-slate-150 shadow-[0_2px_8px_rgba(15,23,42,0.01)]">
													<p className="text-sm text-gray-500 mb-3">
														No subjects added to this semester yet
													</p>
													<AddSubjectDialog
														semesterId={semester.id}
														semesterName={semester.name}
														university={university}
														trigger={
															<Button
																variant="ghost"
																size="sm"
																className="text-primary hover:text-primary-700 hover:bg-primary-50 h-8 text-xs font-bold"
															>
																Add subject
																<ChevronRight className="h-3.5 w-3.5 ml-1" />
															</Button>
														}
													/>
												</div>
											) : (
												<div className="space-y-2">
													{semester.subjects.map((subject) => (
														<div
															key={subject.id}
															className="flex items-center justify-between rounded-xl bg-slate-50/50 border border-slate-200/50 px-4 py-3 text-sm group/subject hover:bg-slate-50 transition-colors shadow-[inset_0_1px_0_#ffffff]"
														>
															<span className="text-gray-700 truncate flex-1 font-semibold">
																{subject.name}
															</span>
															<div className="flex items-center gap-3">
																<span className="px-2.5 py-1 rounded-lg icon-skeuo-raised text-blue-650 font-extrabold text-xs">
																	{subject.letter_grade}
																</span>
																<span className="text-gray-400 font-bold text-xs uppercase tracking-wider">
																	{subject.credit_hours} CH
																</span>
																<DropdownMenu>
																	<DropdownMenuTrigger asChild>
																		<button
																			type="button"
																			className="h-6 w-6 rounded-full hover:bg-gray-200 flex items-center justify-center text-gray-400 opacity-0 group-hover/subject:opacity-100 transition-opacity cursor-pointer"
																			aria-label="Subject options"
																			onClick={(e) => e.stopPropagation()}
																		>
																			<MoreVertical className="h-3.5 w-3.5" />
																		</button>
																	</DropdownMenuTrigger>
																	<DropdownMenuContent
																		align="end"
																		className="bg-white border-gray-200 min-w-[110px] rounded-xl shadow-lg z-50"
																	>
																		<DropdownMenuItem
																			onClick={(e) => {
																				e.stopPropagation();
																				setEditingSubject({
																					subject,
																					semesterId: semester.id,
																				});
																			}}
																			className="cursor-pointer text-xs rounded-lg"
																		>
																			<Pencil className="h-3.5 w-3.5 mr-2 text-gray-400" />
																			Edit
																		</DropdownMenuItem>
																		<DropdownMenuItem
																			variant="destructive"
																			onClick={(e) => {
																				e.stopPropagation();
																				setDeletingSubject({
																					subject,
																					semesterId: semester.id,
																				});
																			}}
																			className="cursor-pointer text-xs rounded-lg"
																		>
																			<Trash2 className="h-3.5 w-3.5 mr-2" />
																			Delete
																		</DropdownMenuItem>
																	</DropdownMenuContent>
																</DropdownMenu>
															</div>
														</div>
													))}

													<AddSubjectDialog
														semesterId={semester.id}
														semesterName={semester.name}
														university={university}
														trigger={
															<button
																type="button"
																className="w-full text-slate-500 hover:text-blue-600 hover:bg-blue-50/20 rounded-xl py-2.5 text-xs font-bold flex items-center justify-center gap-1 transition-colors duration-200 ease-out border border-dashed border-slate-200 hover:border-blue-400/50 cursor-pointer"
															>
																<Plus className="h-3.5 w-3.5" />
																Add Subject
															</button>
														}
													/>
												</div>
											)}
										</div>
									</motion.div>
								)}
							</AnimatePresence>
						</div>
					);
				})}
			</div>

			{/* Semester Dialogs */}
			{editingSemester ? (
				<EditSemesterDialog
					semesterId={editingSemester.id}
					currentName={editingSemester.name}
					open={!!editingSemester}
					onOpenChange={(open) => !open && setEditingSemester(null)}
				/>
			) : null}

			{deletingSemester ? (
				<DeleteSemesterDialog
					semesterId={deletingSemester.id}
					semesterName={deletingSemester.name}
					subjectCount={deletingSemester.subjects.length}
					open={!!deletingSemester}
					onOpenChange={(open) => !open && setDeletingSemester(null)}
				/>
			) : null}

			{/* Subject Dialogs */}
			{editingSubject ? (
				<EditSubjectDialog
					subject={editingSubject.subject}
					semesterId={editingSubject.semesterId}
					university={university}
					open={!!editingSubject}
					onOpenChange={(open) => !open && setEditingSubject(null)}
				/>
			) : null}

			{deletingSubject ? (
				<DeleteSubjectDialog
					subjectId={deletingSubject.subject.id}
					subjectName={deletingSubject.subject.name}
					semesterId={deletingSubject.semesterId}
					open={!!deletingSubject}
					onOpenChange={(open) => !open && setDeletingSubject(null)}
				/>
			) : null}
		</>
	);
}
