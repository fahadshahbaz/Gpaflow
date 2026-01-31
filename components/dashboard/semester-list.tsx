"use client";

import {
	BookOpen,
	ChevronRight,
	MoreVertical,
	Pencil,
	Plus,
	Trash2,
} from "lucide-react";
import { motion } from "motion/react";
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

	if (semesters.length === 0) {
		return (
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
			>
				<Card className="bg-[#1a1a1a] border-[#2a2a2a] rounded-3xl">
					<CardContent className="p-12 text-center">
						<div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-orange-500/20 to-red-500/20 border border-orange-500/20 flex items-center justify-center mx-auto mb-5">
							<BookOpen className="h-7 w-7 text-orange-400" />
						</div>
						<h3 className="text-lg font-semibold text-white mb-2">
							No semesters yet
						</h3>
						<p className="text-sm text-gray-500 max-w-sm mx-auto mb-6">
							Start tracking your academic journey by adding your first semester
						</p>
						<Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-400 hover:to-red-400 text-white font-medium px-5 h-10 rounded-xl">
							<Plus className="mr-2 h-4 w-4" />
							Add First Semester
						</Button>
					</CardContent>
				</Card>
			</motion.div>
		);
	}

	return (
		<>
			<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
				{semesters.map((semester, index) => (
					<motion.div
						key={semester.id}
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{
							duration: 0.5,
							delay: index * 0.08,
						}}
					>
						<Card className="bg-[#1a1a1a] border-[#2a2a2a] rounded-3xl overflow-hidden hover:border-[#3a3a3a] transition-colors group">
							<CardHeader className="pb-3 border-b border-[#2a2a2a]">
								<div className="flex items-center justify-between">
									<div className="flex items-center gap-3">
										<div className="h-10 w-10 rounded-xl bg-gradient-to-br from-orange-500/20 to-red-500/20 border border-orange-500/20 flex items-center justify-center">
											<span className="text-sm font-bold text-orange-400">
												{index + 1}
											</span>
										</div>
										<CardTitle className="text-base font-semibold text-white group-hover:text-orange-200 transition-colors">
											{semester.name}
										</CardTitle>
									</div>
									<DropdownMenu>
										<DropdownMenuTrigger asChild>
											<Button
												variant="ghost"
												size="icon"
												className="h-8 w-8 text-gray-500 hover:text-white hover:bg-[#252525]"
											>
												<MoreVertical className="h-4 w-4" />
											</Button>
										</DropdownMenuTrigger>
										<DropdownMenuContent
											align="end"
											className="bg-[#1a1a1a] border-[#2a2a2a] min-w-[150px]"
										>
											<DropdownMenuItem
												onClick={() => setEditingSemester(semester)}
												className="text-gray-300 hover:text-white hover:bg-[#252525] focus:bg-[#252525] cursor-pointer"
											>
												<Pencil className="h-4 w-4 mr-2 text-gray-400" />
												Edit name
											</DropdownMenuItem>
											<DropdownMenuItem
												onClick={() => setDeletingSemester(semester)}
												className="text-red-400 hover:text-red-300 hover:bg-red-500/10 focus:bg-red-500/10 cursor-pointer"
											>
												<Trash2 className="h-4 w-4 mr-2" />
												Delete
											</DropdownMenuItem>
										</DropdownMenuContent>
									</DropdownMenu>
								</div>
								<div className="flex items-center gap-3 mt-3">
									<Badge className="bg-orange-500/10 text-orange-400 border-orange-500/20 px-2.5 py-0.5 text-xs font-semibold">
										{semester.sgpa.toFixed(2)} SGPA
									</Badge>
									<Badge
										variant="secondary"
										className="bg-[#252525] text-gray-400 border-[#333333] text-xs"
									>
										{semester.total_credit_hours} Credits
									</Badge>
								</div>
							</CardHeader>
							<CardContent className="p-4 pt-3">
								{semester.subjects.length === 0 ? (
									<div className="py-4 text-center">
										<p className="text-sm text-gray-500 italic mb-3">
											No subjects yet
										</p>
										<AddSubjectDialog
											semesterId={semester.id}
											semesterName={semester.name}
											trigger={
												<Button
													variant="ghost"
													size="sm"
													className="text-orange-400 hover:text-orange-300 hover:bg-orange-500/10 h-8"
												>
													Add subject <ChevronRight className="h-4 w-4 ml-1" />
												</Button>
											}
										/>
									</div>
								) : (
									<div className="space-y-2">
										{semester.subjects.slice(0, 4).map((subject, subIndex) => (
											<motion.div
												key={subject.id}
												initial={{ opacity: 0, x: -10 }}
												animate={{ opacity: 1, x: 0 }}
												transition={{ delay: subIndex * 0.05 }}
												className="flex items-center justify-between rounded-xl bg-[#252525]/50 px-3 py-2.5 text-sm border border-[#2a2a2a] hover:border-[#3a3a3a] hover:bg-[#252525] transition-all group/subject"
											>
												<div className="flex items-center gap-2 flex-1 min-w-0">
													<div className="h-1.5 w-1.5 rounded-full bg-orange-500/50 flex-shrink-0" />
													<span className="text-gray-300 font-medium group-hover/subject:text-white transition-colors truncate">
														{subject.name}
													</span>
												</div>
												<div className="flex items-center gap-2">
													<span className="text-orange-400 font-semibold text-sm">
														{getLetterGrade(subject.obtained_marks)}
													</span>
													<Badge
														variant="outline"
														className="text-[10px] border-[#333333] text-gray-500 px-1.5 h-5 min-w-8 justify-center bg-[#1a1a1a]"
													>
														{subject.credit_hours} CH
													</Badge>
													<DropdownMenu>
														<DropdownMenuTrigger asChild>
															<Button
																variant="ghost"
																size="icon"
																className="h-6 w-6 text-gray-600 hover:text-white hover:bg-[#333333] opacity-0 group-hover/subject:opacity-100 transition-opacity"
															>
																<MoreVertical className="h-3 w-3" />
															</Button>
														</DropdownMenuTrigger>
														<DropdownMenuContent
															align="end"
															className="bg-[#1a1a1a] border-[#2a2a2a] min-w-[120px]"
														>
															<DropdownMenuItem
																onClick={() =>
																	setEditingSubject({
																		subject,
																		semesterId: semester.id,
																	})
																}
																className="text-gray-300 hover:text-white hover:bg-[#252525] focus:bg-[#252525] cursor-pointer text-xs"
															>
																<Pencil className="h-3 w-3 mr-2 text-gray-400" />
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
																<Trash2 className="h-3 w-3 mr-2" />
																Delete
															</DropdownMenuItem>
														</DropdownMenuContent>
													</DropdownMenu>
												</div>
											</motion.div>
										))}
										{semester.subjects.length > 4 && (
											<Button
												variant="ghost"
												size="sm"
												className="w-full mt-2 text-gray-500 hover:text-white hover:bg-[#252525] h-8 text-xs"
											>
												View all {semester.subjects.length} subjects
											</Button>
										)}
										<div className="pt-2">
											<AddSubjectDialog
												semesterId={semester.id}
												semesterName={semester.name}
												trigger={
													<Button
														variant="ghost"
														size="sm"
														className="w-full text-orange-400 hover:text-orange-300 hover:bg-orange-500/10 h-8 text-xs border border-dashed border-orange-500/30 hover:border-orange-500/50"
													>
														<Plus className="h-3 w-3 mr-1" />
														Add Subject
													</Button>
												}
											/>
										</div>
									</div>
								)}
							</CardContent>
						</Card>
					</motion.div>
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
