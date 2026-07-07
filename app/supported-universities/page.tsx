import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function SupportedUniversitiesPage() {
	return (
		<div className="min-h-screen bg-[#f8fafc] text-slate-800 py-12 px-4 sm:px-6">
			<div className="max-w-4xl mx-auto space-y-12">
				<div>
					<Link
						href="/"
						className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 transition-colors mb-6"
					>
						<ArrowLeft className="h-4 w-4" /> Back to Home
					</Link>
					<h1 className="text-4xl font-light text-slate-900 tracking-tight">
						Supported <span className="font-semibold">Universities</span>
					</h1>
					<p className="text-slate-500 mt-2">
						Review grading policies, rounding behaviors, and passing thresholds
						for each institution.
					</p>
				</div>

				<div className="space-y-8">
					{/* NUML Card */}
					<div className="bg-white border border-slate-200/60 rounded-3xl p-6 sm:p-8 shadow-sm">
						<h2 className="text-xl font-bold text-slate-900">
							National University of Modern Languages (NUML)
						</h2>
						<p className="text-sm text-slate-500 mt-1">
							Standard letter grade system with 4.0 scale.
						</p>

						<div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-slate-600">
							<div className="bg-slate-50 rounded-2xl p-4">
								<h3 className="font-semibold text-slate-800 mb-2">Rules</h3>
								<ul className="space-y-1 list-disc pl-4 text-xs">
									<li>Rounding: Standard Round (nearest integer).</li>
									<li>Pass Mark: 50% minimum.</li>
									<li>Linear GPA scale inside grade brackets.</li>
								</ul>
							</div>
							<div className="bg-slate-50 rounded-2xl p-4">
								<h3 className="font-semibold text-slate-800 mb-2">Grades</h3>
								<div className="grid grid-cols-2 gap-y-1 text-xs">
									<div>85% + : A+ (4.0)</div>
									<div>80-84% : A (3.95-3.99)</div>
									<div>75-79% : B+ (3.5-3.89)</div>
									<div>70-74% : B (3.0-3.39)</div>
									<div>65-69% : C+ (2.5-2.89)</div>
									<div>60-64% : C (2.0-2.39)</div>
									<div>55-59% : D+ (1.5-1.89)</div>
									<div>50-54% : D (1.0-1.39)</div>
									<div>&lt; 50% : F (0.0)</div>
								</div>
							</div>
						</div>
					</div>

					{/* GCWUF Card */}
					<div className="bg-white border border-slate-200/60 rounded-3xl p-6 sm:p-8 shadow-sm">
						<h2 className="text-xl font-bold text-slate-900">
							GC University for Women Faisalabad (GCWUF)
						</h2>
						<p className="text-sm text-slate-500 mt-1">
							Quality points lookup system.
						</p>

						<div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-slate-600">
							<div className="bg-slate-50 rounded-2xl p-4">
								<h3 className="font-semibold text-slate-800 mb-2">Rules</h3>
								<ul className="space-y-1 list-disc pl-4 text-xs">
									<li>Rounding: Standard Round (nearest integer).</li>
									<li>Pass Mark: 40% minimum.</li>
									<li>QP is mapped depending on Course Credit Hours.</li>
								</ul>
							</div>
							<div className="bg-slate-50 rounded-2xl p-4">
								<h3 className="font-semibold text-slate-800 mb-2">Grades</h3>
								<div className="grid grid-cols-2 gap-y-1 text-xs">
									<div>80% + : A</div>
									<div>65-79% : B</div>
									<div>50-64% : C</div>
									<div>40-49% : D</div>
									<div>&lt; 40% : F (0.0)</div>
								</div>
							</div>
						</div>
					</div>

					{/* GCUF Arts Card */}
					<div className="bg-white border border-slate-200/60 rounded-3xl p-6 sm:p-8 shadow-sm relative overflow-hidden">
						<div className="absolute top-0 right-0 bg-blue-50 text-blue-600 text-[10px] font-bold px-3 py-1 rounded-bl-xl border-l border-b border-blue-100">
							New Strategy
						</div>
						<h2 className="text-xl font-bold text-slate-900">
							GC University Faisalabad (General / Arts)
						</h2>
						<p className="text-sm text-slate-500 mt-1">
							Undergraduate arts & general science programs.
						</p>

						<div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-slate-600">
							<div className="bg-slate-50 rounded-2xl p-4">
								<h3 className="font-semibold text-slate-800 mb-2">Rules</h3>
								<ul className="space-y-1 list-disc pl-4 text-xs">
									<li>
										Rounding: Ceil Round (decimals always round UP, e.g. 52.1%
										&rarr; 53%).
									</li>
									<li>Pass Mark: 40% minimum.</li>
									<li>
										Grade Point lookup mappings from official GCUF tables.
									</li>
								</ul>
							</div>
							<div className="bg-slate-50 rounded-2xl p-4">
								<h3 className="font-semibold text-slate-800 mb-2">Grades</h3>
								<div className="grid grid-cols-2 gap-y-1 text-xs">
									<div>85% + : A (4.00)</div>
									<div>80-84% : A- (3.75-3.95)</div>
									<div>70-79% : B+ (3.25-3.70)</div>
									<div>65-69% : B (3.00-3.20)</div>
									<div>60-64% : B- (2.70-2.94)</div>
									<div>55-59% : C+ (2.35-2.63)</div>
									<div>50-54% : C (2.00-2.28)</div>
									<div>45-49% : C- (1.50-1.90)</div>
									<div>40-44% : D (1.00-1.40)</div>
									<div>&lt; 40% : F (0.00)</div>
								</div>
							</div>
						</div>
					</div>

					{/* GCUF Engineering Card */}
					<div className="bg-white border border-slate-200/60 rounded-3xl p-6 sm:p-8 shadow-sm relative overflow-hidden">
						<div className="absolute top-0 right-0 bg-blue-50 text-blue-600 text-[10px] font-bold px-3 py-1 rounded-bl-xl border-l border-b border-blue-100">
							New Strategy
						</div>
						<h2 className="text-xl font-bold text-slate-900">
							GC University Faisalabad (Engineering / Pharm-D)
						</h2>
						<p className="text-sm text-slate-500 mt-1">
							Undergraduate Electrical Engineering and Pharm-D programs.
						</p>

						<div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-slate-600">
							<div className="bg-slate-50 rounded-2xl p-4">
								<h3 className="font-semibold text-slate-800 mb-2">Rules</h3>
								<ul className="space-y-1 list-disc pl-4 text-xs">
									<li>
										Rounding: Ceil Round (decimals always round UP, e.g. 52.1%
										&rarr; 53%).
									</li>
									<li>
										Pass Mark: 55% minimum (No C-, C, or D grades permitted).
									</li>
									<li>
										Grade Point lookup mappings from official GCUF tables.
									</li>
								</ul>
							</div>
							<div className="bg-slate-50 rounded-2xl p-4">
								<h3 className="font-semibold text-slate-800 mb-2">Grades</h3>
								<div className="grid grid-cols-2 gap-y-1 text-xs">
									<div>85% + : A (4.00)</div>
									<div>80-84% : A- (3.75-3.95)</div>
									<div>70-79% : B+ (3.25-3.70)</div>
									<div>65-69% : B (3.00-3.20)</div>
									<div>60-64% : B- (2.70-2.94)</div>
									<div>55-59% : C+ (2.35-2.63)</div>
									<div>&lt; 55% : F (0.00)</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="text-center pt-4">
					<Button
						asChild
						variant="skeuoPrimary"
						className="rounded-xl px-6 py-3 font-bold"
					>
						<Link href="/signup">Calculate Your GPA Now</Link>
					</Button>
				</div>
			</div>
		</div>
	);
}
