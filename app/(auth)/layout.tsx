import { CheckCircle2, Target, TrendingUp } from "lucide-react";
import Link from "next/link";
import { Logo } from "@/components/ui/logo";

export default function AuthLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<main className="min-h-screen bg-white flex flex-col lg:flex-row font-sans">
			{/* Left Column - Auth Form */}
			<div className="w-full lg:w-1/2 flex flex-col justify-between p-6 sm:p-10 md:p-16 min-h-screen bg-white">
				{/* Top Logo */}
				<div className="flex justify-start">
					<Logo href="/" />
				</div>

				{/* Form Content Wrapper */}
				<div className="w-full max-w-[420px] mx-auto my-auto py-10">
					{children}
				</div>

				{/* Footer */}
				<div className="flex flex-col sm:flex-row justify-between items-center text-xs text-slate-400 gap-3 border-t border-slate-100/90 shadow-[inset_0_1px_0_#ffffff] pt-6">
					<p>© {new Date().getFullYear()} GPAFlow Enterprises LTD.</p>
					<div className="flex gap-4">
						<Link
							href="/privacy"
							className="hover:text-slate-600 transition-colors font-medium"
						>
							Privacy Policy
						</Link>
						<Link
							href="/terms"
							className="hover:text-slate-600 transition-colors font-medium"
						>
							Terms of Service
						</Link>
					</div>
				</div>
			</div>
			{/* Right Column - Premium Academic Dashboard Mockup */}
			<div className="hidden lg:flex w-1/2 p-6 bg-slate-50 justify-center items-center min-h-screen relative overflow-hidden">
				{/* Vibrant Royal Blue/Sky Blue Main Panel */}
				<div className="w-full h-full rounded-[2.5rem] bg-gradient-to-br from-blue-700 via-blue-600 to-sky-600 relative overflow-hidden flex flex-col justify-between p-12 text-white border border-blue-500/30 shadow-[inset_0_4px_12px_rgba(255,255,255,0.22),inset_0_-4px_12px_rgba(0,0,0,0.3),0_20px_50px_rgba(29,78,216,0.15)]">
					{/* Glowing decorative nodes */}
					<div className="absolute inset-0 opacity-15 pointer-events-none">
						<div className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] rounded-full bg-white blur-[120px]" />
						<div className="absolute bottom-[-15%] right-[-15%] w-[75%] h-[75%] rounded-full bg-sky-300 blur-[130px]" />

						{/* Grid pattern overlay */}
						<svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
							<title>Grid pattern</title>
							<defs>
								<pattern
									id="grid"
									width="48"
									height="48"
									patternUnits="userSpaceOnUse"
								>
									<path
										d="M 48 0 L 0 0 0 48"
										fill="none"
										stroke="white"
										strokeWidth="1"
									/>
								</pattern>
							</defs>
							<rect width="100%" height="100%" fill="url(#grid)" />
						</svg>
					</div>

					{/* Top Section - Headers */}
					<div className="relative z-10 space-y-4 max-w-lg">
						<div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-850/55 backdrop-blur-md border border-blue-400/35 shadow-[inset_0_2px_4px_rgba(255,255,255,0.2),inset_0_-1px_3px_rgba(0,0,0,0.35),0_4px_10px_rgba(29,78,216,0.12)] text-xs font-bold text-sky-200 tracking-wide uppercase font-mono">
							<span className="w-2 h-2 rounded-full bg-sky-300 animate-pulse shadow-[0_0_8px_rgba(125,211,252,0.8)]" />
							Smart Academic Companion
						</div>
						<h2 className="text-4xl font-extrabold tracking-tight leading-[1.15] text-white">
							Effortlessly track your academic progress.
						</h2>
						<p className="text-blue-100/90 text-base leading-relaxed font-light">
							Log in to access your dashboard, map out future semesters, and
							automate your GPA forecasting.
						</p>
					</div>

					{/* Dashboard Mockup Center */}
					<div className="relative z-10 my-auto pt-8 flex items-center justify-center w-full">
						<div className="relative w-full max-w-[450px]">
							{" "}
							{/* Main Dashboard Card */}
							<div className="w-full bg-slate-50/95 backdrop-blur-sm rounded-[2.2rem] p-6.5 shadow-[inset_0_3px_5px_#ffffff,inset_0_-3px_8px_rgba(0,0,0,0.02),0_20px_45px_-10px_rgba(15,23,42,0.15),0_0_1px_rgba(29,78,216,0.2)] border border-slate-200 text-slate-800 transition-all duration-500 hover:scale-[1.01] hover:shadow-[inset_0_3px_5px_#ffffff,inset_0_-3px_8px_rgba(0,0,0,0.02),0_25px_50px_-10px_rgba(15,23,42,0.18)]">
								{/* Mockup Header */}
								<div className="flex justify-between items-center mb-5 pb-3 border-b border-slate-200">
									<div>
										<div className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider">
											Academic Tracker
										</div>
										<h4 className="text-sm font-extrabold text-slate-800">
											GPA Overview
										</h4>
									</div>
									<div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white border border-slate-200 text-blue-600 font-extrabold text-[10px] shadow-[0_2px_4px_rgba(0,0,0,0.04),inset_0_1px_0_#ffffff] cursor-pointer hover:bg-slate-50 hover:translate-y-[-0.5px] active:translate-y-[0.5px] active:shadow-[inset_0_1.5px_3px_rgba(0,0,0,0.06)] active:bg-slate-100 transition-all duration-150">
										<TrendingUp className="h-3.5 w-3.5 text-blue-500" />
										Spring 2026
									</div>
								</div>

								{/* Row of stats */}
								<div className="grid grid-cols-3 gap-3 mb-6">
									<div className="p-3 rounded-2xl border border-slate-200/60 bg-gradient-to-br from-blue-50/50 to-sky-50/30 shadow-[inset_0_3px_6px_rgba(29,78,216,0.06),inset_0_-1px_0_#ffffff]">
										<div className="text-[9px] font-bold text-blue-650 mb-0.5 uppercase tracking-wide">
											Current GPA
										</div>
										<div className="text-lg font-extrabold text-blue-900 leading-none font-mono">
											3.92
										</div>
										<div className="text-[8px] text-emerald-600 font-bold mt-1.5 flex items-center gap-0.5">
											<span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
											+0.04 vs last sem
										</div>
									</div>
									<div className="p-3 rounded-2xl border border-slate-200/60 bg-slate-100/50 shadow-[inset_0_3px_6px_rgba(0,0,0,0.06),inset_0_-1px_0_#ffffff]">
										<div className="text-[9px] font-bold text-slate-400 mb-0.5 uppercase tracking-wide">
											Study Hours
										</div>
										<div className="text-lg font-extrabold text-slate-800 leading-none font-mono">
											02:45
										</div>
										<div className="text-[8px] text-blue-500 font-bold mt-1.5">
											Daily avg
										</div>
									</div>
									<div className="p-3 rounded-2xl border border-slate-200/60 bg-slate-100/50 shadow-[inset_0_3px_6px_rgba(0,0,0,0.06),inset_0_-1px_0_#ffffff]">
										<div className="text-[9px] font-bold text-slate-400 mb-0.5 uppercase tracking-wide">
											Total Credits
										</div>
										<div className="text-lg font-extrabold text-slate-800 leading-none font-mono">
											84
										</div>
										<div className="text-[8px] text-slate-400 font-bold mt-1.5">
											/ 120 Required
										</div>
									</div>
								</div>

								{/* Course Results List */}
								<div className="space-y-3">
									<div className="text-[10px] uppercase font-extrabold text-slate-400 tracking-wider mb-2 flex justify-between items-center">
										<span>Course Results</span>
										<span className="text-blue-600 hover:underline cursor-pointer hover:text-blue-700">
											View All
										</span>
									</div>

									{/* Item 1 */}
									<div className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200 bg-white shadow-[0_3px_6px_rgba(0,0,0,0.03),0_0_1px_rgba(0,0,0,0.1),inset_0_1.5px_0_#ffffff] hover:bg-slate-50/85 hover:translate-y-[-0.5px] hover:shadow-[0_4px_8px_rgba(0,0,0,0.04),0_0_1px_rgba(0,0,0,0.15)] active:translate-y-[0.5px] active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.04)] transition-all duration-150 cursor-pointer">
										<div className="flex items-center gap-3">
											<div className="h-7 w-7 rounded-lg bg-blue-100/80 border border-blue-200/50 flex items-center justify-center text-blue-655 font-extrabold text-xs shadow-[inset_0_1px_2px_rgba(255,255,255,0.6),0_1.5px_2px_rgba(0,0,0,0.04)]">
												CS
											</div>
											<div>
												<div className="text-xs font-bold text-slate-800">
													Advanced Web Dev
												</div>
												<div className="text-[9px] text-slate-400 font-medium">
													4.0 Credits • Theory & Lab
												</div>
											</div>
										</div>
										<div className="flex items-center gap-2">
											<div className="text-xs font-extrabold text-blue-600 font-mono bg-blue-50/50 px-1.5 py-0.5 rounded border border-blue-150 shadow-[inset_0_1px_0_#ffffff]">
												A
											</div>
											<div className="px-2 py-0.5 rounded-md bg-emerald-50 border border-emerald-100 text-[8px] font-bold text-emerald-600 flex items-center gap-0.5 shadow-[inset_0_1px_0_#ffffff]">
												<CheckCircle2 className="h-2.5 w-2.5" /> Passed
											</div>
										</div>
									</div>

									{/* Item 2 */}
									<div className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200 bg-white shadow-[0_3px_6px_rgba(0,0,0,0.03),0_0_1px_rgba(0,0,0,0.1),inset_0_1.5px_0_#ffffff] hover:bg-slate-50/85 hover:translate-y-[-0.5px] hover:shadow-[0_4px_8px_rgba(0,0,0,0.04),0_0_1px_rgba(0,0,0,0.15)] active:translate-y-[0.5px] active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.04)] transition-all duration-150 cursor-pointer">
										<div className="flex items-center gap-3">
											<div className="h-7 w-7 rounded-lg bg-sky-100/80 border border-sky-200/50 flex items-center justify-center text-sky-600 font-extrabold text-xs shadow-[inset_0_1px_2px_rgba(255,255,255,0.6),0_1.5px_2px_rgba(0,0,0,0.04)]">
												DS
											</div>
											<div>
												<div className="text-xs font-bold text-slate-800">
													Machine Learning
												</div>
												<div className="text-[9px] text-slate-400 font-medium">
													4.0 Credits • Calculus Prep
												</div>
											</div>
										</div>
										<div className="flex items-center gap-2">
											<div className="text-xs font-extrabold text-sky-700 font-mono bg-sky-50/50 px-1.5 py-0.5 rounded border border-sky-150 shadow-[inset_0_1px_0_#ffffff]">
												A-
											</div>
											<div className="px-2 py-0.5 rounded-md bg-emerald-50 border border-emerald-100 text-[8px] font-bold text-emerald-600 flex items-center gap-0.5 shadow-[inset_0_1px_0_#ffffff]">
												<CheckCircle2 className="h-2.5 w-2.5" /> Passed
											</div>
										</div>
									</div>

									{/* Item 3 */}
									<div className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200 bg-white shadow-[0_3px_6px_rgba(0,0,0,0.03),0_0_1px_rgba(0,0,0,0.1),inset_0_1.5px_0_#ffffff] hover:bg-slate-50/85 hover:translate-y-[-0.5px] hover:shadow-[0_4px_8px_rgba(0,0,0,0.04),0_0_1px_rgba(0,0,0,0.15)] active:translate-y-[0.5px] active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.04)] transition-all duration-150 cursor-pointer">
										<div className="flex items-center gap-3">
											<div className="h-7 w-7 rounded-lg bg-blue-100/80 border border-blue-200/50 flex items-center justify-center text-blue-600 font-extrabold text-xs shadow-[inset_0_1px_2px_rgba(255,255,255,0.6),0_1.5px_2px_rgba(0,0,0,0.04)]">
												SE
											</div>
											<div>
												<div className="text-xs font-bold text-slate-800">
													Database Systems
												</div>
												<div className="text-[9px] text-slate-400 font-medium">
													3.0 Credits • SQL Specialization
												</div>
											</div>
										</div>
										<div className="flex items-center gap-2">
											<div className="text-xs font-extrabold text-blue-600 font-mono bg-blue-50/50 px-1.5 py-0.5 rounded border border-blue-150 shadow-[inset_0_1px_0_#ffffff]">
												A
											</div>
											<div className="px-2 py-0.5 rounded-md bg-emerald-50 border border-emerald-100 text-[8px] font-bold text-emerald-600 flex items-center gap-0.5 shadow-[inset_0_1px_0_#ffffff]">
												<CheckCircle2 className="h-2.5 w-2.5" /> Passed
											</div>
										</div>
									</div>
								</div>
							</div>
							{/* Overlapping Floating Gauge Card */}
							<div className="absolute bottom-[-24px] right-[-16px] w-[215px] bg-slate-50/95 backdrop-blur-md rounded-2xl p-4 shadow-[inset_0_2px_3px_#ffffff,inset_0_-2px_4px_rgba(0,0,0,0.03),0_12px_28px_rgba(29,78,216,0.18),0_2px_4px_rgba(29,78,216,0.05)] border border-slate-200/90 z-20 transition-all duration-500 hover:translate-y-[-2px] hover:shadow-[inset_0_2px_3px_#ffffff,inset_0_-2px_4px_rgba(0,0,0,0.03),0_15px_32px_rgba(29,78,216,0.22)]">
								<div className="flex justify-between items-center mb-2.5">
									<div className="text-[9px] font-extrabold tracking-widest text-slate-400 uppercase font-mono">
										Target GPA
									</div>
									<div className="relative">
										<Target className="h-4 w-4 text-blue-500" />
										<span className="absolute top-0 right-0 w-1.5 h-1.5 rounded-full bg-sky-400 animate-ping" />
										<span className="absolute top-0 right-0 w-1.5 h-1.5 rounded-full bg-sky-400" />
									</div>
								</div>

								{/* Semi-circular gauge mock */}
								<div className="relative flex flex-col items-center justify-center pt-2">
									<svg className="w-24 h-14" viewBox="0 0 100 50">
										<title>GPA forecast gauge</title>
										{/* Gauge Track */}
										<path
											d="M 10 50 A 40 40 0 0 1 90 50"
											fill="none"
											stroke="#f1f5f9"
											strokeWidth="8.5"
											strokeLinecap="round"
										/>
										{/* Gauge Value */}
										<path
											d="M 10 50 A 40 40 0 0 1 85 40"
											fill="none"
											stroke="url(#blueSkyGrad)"
											strokeWidth="8.5"
											strokeLinecap="round"
											strokeDasharray="125"
											strokeDashoffset="25"
										/>
										<defs>
											<linearGradient
												id="blueSkyGrad"
												x1="0%"
												y1="0%"
												x2="100%"
												y2="0%"
											>
												<stop offset="0%" stopColor="#3b82f6" />
												<stop offset="100%" stopColor="#0ea5e9" />
											</linearGradient>
										</defs>
									</svg>

									<div className="absolute bottom-0 text-center">
										<div className="text-base font-extrabold text-slate-800 leading-none font-mono">
											3.92
										</div>
										<div className="text-[8px] font-bold text-slate-500 mt-1 font-mono">
											Target: 4.00
										</div>
									</div>
								</div>

								{/* Legend Details */}
								<div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-slate-100 shadow-[inset_0_1px_0_#ffffff]">
									<div className="flex items-center gap-1">
										<span className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_4px_rgba(59,130,246,0.6)]" />
										<span className="text-[8px] font-bold text-slate-500">
											Current
										</span>
									</div>
									<div className="flex items-center gap-1 justify-end">
										<span className="w-1.5 h-1.5 rounded-full bg-sky-400 shadow-[0_0_4px_rgba(56,189,248,0.6)]" />
										<span className="text-[8px] font-bold text-slate-500">
											Forecast
										</span>
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* Bottom Text / Info */}
					<div className="relative z-10 flex items-center justify-between text-xs text-blue-100/80 border-t border-white/10 pt-6">
						<span>Powered by Supabase Integration</span>
						<span>v1.2.0 Stable</span>
					</div>
				</div>
			</div>
		</main>
	);
}
