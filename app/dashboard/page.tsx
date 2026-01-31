import { Bell, Search } from "lucide-react";
import { AppSidebar } from "@/components/app-sidebar";
import { AcademicTimeline } from "@/components/dashboard/academic-timeline";
import { AddSemesterDialog } from "@/components/dashboard/add-semester-dialog";
import { GPACircularChart } from "@/components/dashboard/gpa-circular-chart";
import { GPATrendChart } from "@/components/dashboard/gpa-trend-chart";
import { QuickInsights } from "@/components/dashboard/quick-insights";
import { SemesterList } from "@/components/dashboard/semester-list";
import { StatsCards } from "@/components/dashboard/stats-cards";
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "@/components/ui/sidebar";
import { getUser } from "@/lib/supabase/auth";
import { getDashboardStats, getSemesters } from "@/lib/supabase/queries";

export default async function DashboardPage() {
	// User is guaranteed to exist here due to proxy protection
	const user = await getUser();

	const [stats, semesters] = await Promise.all([
		getDashboardStats(user!.id),
		getSemesters(user!.id),
	]);

	return (
		<SidebarProvider>
			<AppSidebar userEmail={user?.email} />
			<SidebarInset className="bg-[#0f0f0f]">
				{/* Top Navigation */}
				<header className="flex h-16 shrink-0 items-center gap-4 border-b border-[#2a2a2a] bg-[#0f0f0f]/95 backdrop-blur-xl px-6 sticky top-0 z-50">
					<SidebarTrigger className="-ml-2 text-gray-400 hover:text-white hover:bg-[#1a1a1a]" />

					<div className="flex items-center gap-2 text-sm">
						<span className="text-gray-400">Overview</span>
					</div>

					<div className="flex-1" />

					<div className="flex items-center gap-3">
						<div className="hidden md:flex items-center gap-3 px-4 py-2 bg-[#1a1a1a] rounded-xl border border-[#2a2a2a]">
							<Search className="h-4 w-4 text-gray-500" />
							<span className="text-sm text-gray-500">Search...</span>
						</div>
						<button
							type="button"
							className="h-10 w-10 rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] flex items-center justify-center text-gray-400 hover:text-white transition-colors"
						>
							<Bell className="h-5 w-5" />
						</button>
						<div className="h-10 w-10 rounded-xl bg-gradient-to-br from-gray-700 to-gray-600 flex items-center justify-center">
							<span className="text-sm font-medium text-white">
								{user?.email?.charAt(0).toUpperCase()}
							</span>
						</div>
					</div>
				</header>

				{/* Main Content */}
				<main className="flex-1 overflow-auto">
					<div className="max-w-[1600px] mx-auto p-6">
						{/* Welcome */}
						<div className="mb-8">
							<h1 className="text-2xl font-bold text-white">
								Welcome back, {user?.email?.split("@")[0]}
							</h1>
							<p className="text-gray-500 mt-1">
								Here's your academic overview
							</p>
						</div>

						{/* BENTO GRID */}
						<div className="grid grid-cols-12 gap-4">
							{/* ROW 1: Quick Stats */}
							<StatsCards
								cgpa={stats.cgpa}
								totalCreditHours={stats.totalCreditHours}
								semesterCount={stats.semesterCount}
								targetGpa={stats.targetGpa}
							/>

							{/* ROW 2: Main Chart + Circular Chart */}
							<GPATrendChart
								semesters={semesters}
								targetGpa={stats.targetGpa}
							/>

							<GPACircularChart cgpa={stats.cgpa} targetGpa={stats.targetGpa} />

							{/* ROW 3: Timeline + Quick Insights */}
							<AcademicTimeline semesters={semesters} />

							<QuickInsights
								semesters={semesters}
								avgSGPA={
									semesters.length > 0
										? semesters.reduce((sum, s) => sum + s.sgpa, 0) /
											semesters.length
										: 0
								}
								bestSemester={
									semesters.length > 0
										? semesters.reduce(
												(best, s) => (s.sgpa > best.sgpa ? s : best),
												semesters[0],
											)
										: null
								}
							/>

							{/* ROW 4: Semester Cards Grid */}
							<div className="col-span-12">
								<div className="flex items-center justify-between mb-4">
									<h3 className="text-lg font-semibold text-white">
										Academic Records
									</h3>
									<AddSemesterDialog />
								</div>
								<SemesterList semesters={semesters} />
							</div>
						</div>
					</div>
				</main>
			</SidebarInset>
		</SidebarProvider>
	);
}
