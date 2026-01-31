import { AddSemesterDialog } from "@/components/dashboard/add-semester-dialog";
import { SemesterList } from "@/components/dashboard/semester-list";
import { getUser } from "@/lib/supabase/auth";
import { getSemesters } from "@/lib/supabase/queries";

export default async function SemestersPage() {
	const user = await getUser();
	const semesters = await getSemesters(user!.id);

	return (
		<div className="max-w-[1600px] mx-auto px-6 py-8">
			{/* Page Header */}
			<div className="flex items-center justify-between mb-8">
				<div>
					<h1 className="text-3xl font-light text-gray-900">
						<span className="font-medium">Semesters</span>
					</h1>
					<p className="text-gray-500 mt-1">
						Manage your academic records and subjects
					</p>
				</div>
				<AddSemesterDialog />
			</div>

			{/* Semester List */}
			<div className="bg-white rounded-3xl p-6 card-shadow">
				<div className="mb-6">
					<h2 className="text-lg font-semibold text-gray-900">
						Academic Records
					</h2>
					<p className="text-sm text-gray-500">
						{semesters.length === 0
							? "No semesters added yet. Add your first semester to get started."
							: `${semesters.length} semester${semesters.length > 1 ? "s" : ""} • Your semester-wise performance`}
					</p>
				</div>
				<SemesterList semesters={semesters} />
			</div>
		</div>
	);
}
