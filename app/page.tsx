"use client";

import {
	ArrowRight,
	BarChart3,
	BookOpen,
	GraduationCap,
	LineChart,
	Menu,
	Sparkles,
	Target,
	TrendingUp,
	X,
	Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/icons";

export default function HomePage() {
	const [isOpen, setIsOpen] = useState(false);
	const [hidden, setHidden] = useState(false);
	const lastScrollY = useRef(0);
	const [_activeFeatureTab, _setActiveFeatureTab] = useState("predict");

	useEffect(() => {
		const handleScroll = () => {
			const currentScrollY = window.scrollY;
			const scrollingDown = currentScrollY > lastScrollY.current;

			if (scrollingDown && currentScrollY > 60) {
				setHidden(true);
				setIsOpen(false);
			} else if (!scrollingDown) {
				setHidden(false);
			}

			lastScrollY.current = currentScrollY;
		};

		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<main className="relative min-h-screen bg-[#fcfdff] overflow-hidden selection:bg-indigo-100 font-sans">
			{/* High-End Ambient Background Blobs */}
			<div className="pointer-events-none absolute top-[-5%] left-[-10%] w-[60%] h-[50%] rounded-full bg-gradient-to-tr from-blue-300/20 to-indigo-300/10 blur-[130px] animate-pulse" />
			<div className="pointer-events-none absolute top-[20%] right-[-10%] w-[50%] h-[60%] rounded-full bg-gradient-to-br from-violet-300/20 to-purple-300/10 blur-[140px]" />
			<div className="pointer-events-none absolute bottom-[10%] left-[-5%] w-[40%] h-[40%] rounded-full bg-blue-400/10 blur-[120px]" />

			{/* Decorative grid pattern */}
			<div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#e2e8f080_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f080_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_10%,#000_80%,transparent_100%)]" />

			{/* Sticky Floating Premium Header */}
			<div
				className={`fixed top-6 left-0 right-0 z-50 px-4 transition-transform duration-300 ${
					hidden ? "-translate-y-[calc(100%+2rem)]" : ""
				}`}
			>
				<header
					className="max-w-4xl mx-auto bg-white/70 backdrop-blur-xl border border-white/80 shadow-[0_12px_40px_rgba(0,0,0,0.03)] rounded-[32px] px-6 overflow-hidden border-slate-100"
				>
					<div className="h-[60px] flex items-center justify-between shrink-0">
						<Link href="/" className="flex items-center gap-2.5 group">
							<div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 shadow-md shadow-blue-500/20 group-hover:shadow-indigo-500/40 transition-all duration-300">
								<GraduationCap className="h-5 w-5 text-white" />
							</div>
							<span className="text-base sm:text-lg font-bold text-gray-900 tracking-tight">
								GPA<span className="text-indigo-600">Flow</span>
							</span>
						</Link>

						{/* Desktop Navigation Links */}
						<nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-gray-500">
							<a
								href="#features"
								className="hover:text-indigo-600 transition-colors"
							>
								Features
							</a>
							<a
								href="#preview"
								className="hover:text-indigo-600 transition-colors"
							>
								Dashboard
							</a>
							<a
								href="#predict"
								className="hover:text-indigo-600 transition-colors"
							>
								Predictions
							</a>
						</nav>

						{/* Desktop Actions */}
						<div className="hidden sm:flex items-center gap-2">
							<Link
								href="/login"
								className="h-10 px-5 flex items-center justify-center text-sm font-semibold text-gray-600 hover:text-indigo-600 transition-colors rounded-full"
							>
								Log in
							</Link>
							<Link
								href="/signup"
								className="h-10 px-6 flex items-center justify-center text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-all active:scale-95 shadow-md shadow-blue-600/10"
							>
								Sign up
							</Link>
						</div>

						{/* Mobile Menu Toggle */}
						<button
							type="button"
							onClick={() => setIsOpen(!isOpen)}
							aria-label="Toggle menu"
							aria-expanded={isOpen}
							className="flex sm:hidden h-9 w-9 items-center justify-center rounded-full text-gray-600 hover:bg-slate-100 transition-colors cursor-pointer"
						>
							{isOpen ? (
								<X className="h-5 w-5" />
							) : (
								<Menu className="h-5 w-5" />
							)}
						</button>
					</div>

					<AnimatePresence>
						{isOpen && (
							<motion.div
								initial={{ opacity: 0, y: -8 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -8 }}
								transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
								className="flex sm:hidden flex-col items-center gap-3 pb-6 pt-2 border-t border-slate-100 mt-2"
							>
								<Link
									href="/login"
									onClick={() => setIsOpen(false)}
									className="w-full text-center py-3 text-sm font-semibold text-gray-600 hover:text-indigo-600 bg-slate-50 rounded-2xl"
								>
									Log in
								</Link>
								<Link
									href="/signup"
									onClick={() => setIsOpen(false)}
									className="w-full text-center py-3 text-sm font-semibold bg-blue-600 text-white rounded-2xl shadow-md shadow-blue-600/10"
								>
									Sign up
								</Link>
							</motion.div>
						)}
					</AnimatePresence>
				</header>
			</div>

			{/* Hero Section */}
			<section className="relative pt-44 sm:pt-52 pb-16 px-6">
				<div className="max-w-4xl mx-auto flex flex-col items-center text-center">
					{/* Sparkle Badge */}
					<motion.div
						initial={{ opacity: 0, y: 15 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, ease: "easeOut" }}
						className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-xs font-bold text-indigo-600 mb-6 shadow-sm shadow-indigo-500/5"
					>
						<Sparkles className="h-3.5 w-3.5 text-indigo-500" />
						Visualized Semester & GPA Forecasting
					</motion.div>

					<motion.h1
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
						className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-gray-900 leading-[1.1] tracking-tight mb-6"
					>
						Master your academic <br />
						<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600">
							trajectory.
						</span>
					</motion.h1>

					<motion.p
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
						className="text-lg sm:text-xl text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed font-light"
					>
						Say goodbye to simple spreadsheets. GPAFlow provides a beautiful,
						state-of-the-art predictive dashboard to visualize your academic
						trajectory, track semesters, and forecast grades automatically.
					</motion.p>

					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
						className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full sm:w-auto"
					>
						<Link
							href="/signup"
							className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full transition-all active:scale-95 shadow-xl shadow-blue-600/20 w-full sm:w-auto cursor-pointer"
						>
							Sign up
							<ArrowRight className="h-4.5 w-4.5 transition-transform group-hover:translate-x-1" />
						</Link>
						<Link
							href="/login"
							className="inline-flex items-center justify-center px-8 py-4 bg-white border border-gray-200 text-gray-700 font-semibold rounded-full hover:bg-slate-50 hover:border-gray-300 transition-colors w-full sm:w-auto shadow-sm cursor-pointer"
						>
							Sign in
						</Link>
					</motion.div>
				</div>
			</section>

			{/* Interactive Showcase Preview */}
			<section id="preview" className="relative px-6 pb-28">
				<div className="max-w-5xl mx-auto">
					<motion.div
						initial={{ opacity: 0, y: 40 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
						className="relative rounded-[2.5rem] border border-slate-200/80 bg-white shadow-2xl overflow-hidden p-3 sm:p-5 shadow-indigo-900/5"
					>
						{/* Window Header */}
						<div className="h-10 bg-slate-50/50 rounded-t-[1.8rem] border-b border-slate-100 flex items-center px-6 gap-2 justify-between shrink-0">
							<div className="flex gap-2">
								<div className="w-3 h-3 rounded-full bg-rose-400" />
								<div className="w-3 h-3 rounded-full bg-amber-400" />
								<div className="w-3 h-3 rounded-full bg-emerald-400" />
							</div>
							<div className="text-[10px] font-semibold text-slate-400 bg-white px-4 py-0.5 rounded-lg border border-slate-100 tracking-wide uppercase">
								gpaflow.app/dashboard
							</div>
							<div className="w-12" />
						</div>

						{/* Mock App Interface Grid */}
						<div className="p-4 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 bg-slate-50/50 rounded-b-[1.8rem]">
							{/* Sidebar Left Column Mock */}
							<div className="hidden lg:flex lg:col-span-3 flex-col justify-between p-4 bg-white border border-slate-100 rounded-2xl h-[400px]">
								<div className="space-y-6">
									<div className="flex items-center gap-2 px-2">
										<div className="h-7 w-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
											<GraduationCap className="h-4 w-4" />
										</div>
										<span className="text-xs font-bold text-slate-800">
											GPAFlow Hub
										</span>
									</div>
									<div className="space-y-1.5">
										<div className="flex items-center gap-2.5 px-3 py-2 bg-indigo-50 text-indigo-600 rounded-xl text-xs font-semibold">
											<BarChart3 className="h-4 w-4" />
											Overview
										</div>
										<div className="flex items-center gap-2.5 px-3 py-2 text-slate-500 rounded-xl text-xs font-semibold hover:bg-slate-50 transition">
											<BookOpen className="h-4 w-4" />
											Semesters
										</div>
										<div className="flex items-center gap-2.5 px-3 py-2 text-slate-500 rounded-xl text-xs font-semibold hover:bg-slate-50 transition">
											<Target className="h-4 w-4" />
											Grade Target
										</div>
									</div>
								</div>

								<div className="p-3 bg-indigo-900 rounded-xl text-white space-y-2">
									<div className="text-[9px] font-bold tracking-widest text-indigo-200 uppercase">
										Target GPA
									</div>
									<div className="text-lg font-bold">3.92 GPA</div>
									<div className="w-full bg-indigo-850 h-1 rounded-full overflow-hidden">
										<div className="w-[85%] h-full bg-indigo-400 rounded-full" />
									</div>
								</div>
							</div>

							{/* Center Area Graph Mock */}
							<div className="col-span-1 lg:col-span-6 flex flex-col justify-between p-6 bg-white border border-slate-100 rounded-2xl h-[400px]">
								<div className="flex justify-between items-start mb-4">
									<div>
										<p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-0.5">
											Academic Growth
										</p>
										<h4 className="text-base font-bold text-slate-800">
											Semester GPA Trend
										</h4>
									</div>
									<span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg">
										+0.12 Gain
									</span>
								</div>

								{/* Dynamic Area Chart representation using custom SVG paths */}
								<div className="relative flex-1 w-full min-h-[180px] flex items-end">
									<svg
										className="w-full h-full min-h-[180px]"
										viewBox="0 0 300 120"
									>
										<title>GPA Growth Chart</title>
										<defs>
											<linearGradient
												id="chartGrad"
												x1="0"
												y1="0"
												x2="0"
												y2="1"
											>
												<stop
													offset="0%"
													stopColor="#4f46e5"
													stopOpacity="0.2"
												/>
												<stop
													offset="100%"
													stopColor="#4f46e5"
													stopOpacity="0.0"
												/>
											</linearGradient>
										</defs>
										{/* Trend Path */}
										<path
											d="M 0 100 Q 50 85 100 60 T 200 45 T 300 15 L 300 120 L 0 120 Z"
											fill="url(#chartGrad)"
										/>
										<path
											d="M 0 100 Q 50 85 100 60 T 200 45 T 300 15"
											fill="none"
											stroke="#4f46e5"
											strokeWidth="3.5"
											strokeLinecap="round"
										/>
										{/* Glow Dots */}
										<circle
											cx="100"
											cy="60"
											r="4.5"
											fill="#4f46e5"
											stroke="white"
											strokeWidth="1.5"
										/>
										<circle
											cx="200"
											cy="45"
											r="4.5"
											fill="#4f46e5"
											stroke="white"
											strokeWidth="1.5"
										/>
										<circle
											cx="300"
											cy="15"
											r="5.5"
											fill="#6366f1"
											stroke="white"
											strokeWidth="2"
										/>
									</svg>
								</div>

								<div className="grid grid-cols-4 gap-2 mt-4 pt-4 border-t border-slate-100 text-center text-[10px] font-bold text-slate-400">
									<div>Sem 1</div>
									<div>Sem 2</div>
									<div>Sem 3</div>
									<div className="text-indigo-600">Sem 4 (Active)</div>
								</div>
							</div>

							{/* Right Overview stats mock */}
							<div className="col-span-1 lg:col-span-3 flex flex-col gap-4 h-[400px]">
								{/* Stats Card 1 */}
								<div className="flex-1 p-5 bg-white border border-slate-100 rounded-2xl flex flex-col justify-between">
									<div className="flex justify-between items-center">
										<span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
											Current CGPA
										</span>
										<TrendingUp className="h-4 w-4 text-emerald-500" />
									</div>
									<div>
										<div className="text-4xl font-extrabold text-slate-800 tracking-tight leading-none">
											3.84
										</div>
										<p className="text-[9px] font-semibold text-emerald-600 mt-2">
											Top 8% of department
										</p>
									</div>
								</div>

								{/* Stats Card 2 */}
								<div className="flex-1 p-5 bg-indigo-900 rounded-2xl flex flex-col justify-between text-white relative overflow-hidden">
									<div className="absolute top-0 right-0 opacity-10">
										<Sparkles className="h-24 w-24 text-white" />
									</div>
									<div className="flex justify-between items-center relative z-10">
										<span className="text-[10px] uppercase font-bold text-indigo-200 tracking-wider">
											Forecast Target
										</span>
										<Target className="h-4 w-4 text-indigo-300" />
									</div>
									<div className="relative z-10">
										<div className="text-3xl font-extrabold tracking-tight leading-none">
											A Grade
										</div>
										<p className="text-[9px] font-medium text-indigo-200 mt-2">
											Requires 3.90 next sem
										</p>
									</div>
								</div>
							</div>
						</div>
					</motion.div>
				</div>
			</section>

			{/* Bento Grid Features Section */}
			<section id="features" className="py-24 px-6 bg-white relative">
				<div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

				<div className="max-w-5xl mx-auto">
					<div className="text-center mb-16 space-y-4">
						<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 border border-slate-100 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
							Optimized Dashboard
						</div>
						<h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
							Built for academic high-performers.
						</h2>
						<p className="text-gray-500 max-w-xl mx-auto text-base sm:text-lg font-light leading-relaxed">
							Everything you need to plan out, analyze, and forecast your degree
							progression down to the decimal point.
						</p>
					</div>

					{/* Bento Grid */}
					<div className="grid md:grid-cols-3 gap-6">
						{/* Bento Card 1 - Giant card */}
						<div className="md:col-span-2 rounded-3xl bg-slate-50/50 border border-slate-150 p-8 flex flex-col justify-between overflow-hidden relative group hover:border-slate-300 transition-all duration-300">
							<div className="space-y-4 max-w-md relative z-10">
								<div className="h-11 w-11 rounded-xl bg-white flex items-center justify-center shadow-sm border border-slate-100">
									<LineChart className="h-5 w-5 text-indigo-600" />
								</div>
								<h3 className="text-2xl font-bold text-gray-900">
									Visualized Grade Growth
								</h3>
								<p className="text-gray-500 text-sm leading-relaxed">
									A beautiful interactive dashboard that tracks your CGPA over
									consecutive semesters. Easily toggle courses, analyze weight
									distribution, and visualize target ranges.
								</p>
							</div>

							<div className="mt-8 pt-6 border-t border-slate-200/50 flex flex-wrap gap-3 relative z-10">
								<span className="px-3 py-1 bg-white border border-slate-150 rounded-lg text-xs font-semibold text-gray-600">
									8-Semester Track
								</span>
								<span className="px-3 py-1 bg-white border border-slate-150 rounded-lg text-xs font-semibold text-gray-600">
									Dynamic Scaling
								</span>
								<span className="px-3 py-1 bg-indigo-50 border border-indigo-100 rounded-lg text-xs font-semibold text-indigo-600">
									Predictive Curves
								</span>
							</div>
						</div>

						{/* Bento Card 2 */}
						<div className="rounded-3xl bg-slate-50/50 border border-slate-150 p-8 flex flex-col justify-between overflow-hidden relative group hover:border-slate-300 transition-all duration-300">
							<div className="space-y-4">
								<div className="h-11 w-11 rounded-xl bg-white flex items-center justify-center shadow-sm border border-slate-100">
									<Zap className="h-5 w-5 text-amber-500" />
								</div>
								<h3 className="text-xl font-bold text-gray-900">
									Lightning Fast Sync
								</h3>
								<p className="text-gray-500 text-sm leading-relaxed">
									Built on Next.js App Router and Supabase, your courses and
									predictions are instantly saved in secure cloud storage.
									Access anywhere, anytime.
								</p>
							</div>
							<div className="mt-6 flex items-center gap-1.5 text-xs font-bold text-indigo-600">
								Cloud Sync Status: Active
								<span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
							</div>
						</div>

						{/* Bento Card 3 */}
						<div className="rounded-3xl bg-slate-50/50 border border-slate-150 p-8 flex flex-col justify-between overflow-hidden relative group hover:border-slate-300 transition-all duration-300">
							<div className="space-y-4">
								<div className="h-11 w-11 rounded-xl bg-white flex items-center justify-center shadow-sm border border-slate-100">
									<BarChart3 className="h-5 w-5 text-emerald-500" />
								</div>
								<h3 className="text-xl font-bold text-gray-900">
									Multi-Grading Support
								</h3>
								<p className="text-gray-500 text-sm leading-relaxed">
									Whether your institution runs on 4.0 systems, letter grades,
									percentage scales, or specific Pakistani scales like NUML or
									GCWUF, GPAFlow handles it natively.
								</p>
							</div>
							<div className="mt-6 text-xs text-gray-400 font-semibold">
								12+ Supported Grading Schemes
							</div>
						</div>

						{/* Bento Card 4 - Giant card */}
						<div className="md:col-span-2 rounded-3xl bg-slate-50/50 border border-slate-150 p-8 flex flex-col justify-between overflow-hidden relative group hover:border-slate-300 transition-all duration-300">
							<div className="flex flex-col sm:flex-row gap-8 justify-between items-start sm:items-center w-full">
								<div className="space-y-4 max-w-sm">
									<div className="h-11 w-11 rounded-xl bg-white flex items-center justify-center shadow-sm border border-slate-100">
										<Target className="h-5 w-5 text-purple-600" />
									</div>
									<h3 className="text-2xl font-bold text-gray-900">
										Intelligent Grade Forecasting
									</h3>
									<p className="text-gray-500 text-sm leading-relaxed">
										Define your goal GPA, and our algorithm will retroactively
										calculate exactly what grades you need to maintain in future
										courses to make your target a reality.
									</p>
								</div>

								{/* Interactive Slider Card Mockup */}
								<div className="w-full sm:w-60 bg-white rounded-2xl border border-slate-150 p-5 shadow-sm group-hover:shadow-md transition-all duration-300">
									<div className="flex justify-between items-center text-xs font-semibold mb-2">
										<span className="text-gray-400">TARGET GPA Goal</span>
										<span className="text-indigo-600 font-bold text-sm bg-indigo-50 px-2 py-0.5 rounded">
											3.75 GPA
										</span>
									</div>
									<div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden mt-3 mb-1.5">
										<div className="w-[85%] h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-indigo-600 rounded-full" />
									</div>
									<div className="flex justify-between text-[8px] font-bold uppercase tracking-wider text-slate-400">
										<span>Current: 3.20</span>
										<span className="text-emerald-500">
											Requirements Calculated
										</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Brand-Styled Premium Call-to-Action Section */}
			<section className="mt-8 px-6 pb-20 pt-8 relative overflow-hidden">
				<div className="max-w-5xl mx-auto rounded-[3.5rem] bg-gradient-to-br from-indigo-900 via-blue-900 to-indigo-950 p-10 sm:p-20 text-white relative overflow-hidden shadow-2xl shadow-indigo-900/10">
					{/* Glowing decorative nodes */}
					<div className="absolute inset-0 opacity-20 pointer-events-none">
						<div className="absolute top-[-20%] left-[-20%] w-[80%] h-[80%] rounded-full bg-white blur-[120px]" />
						<div className="absolute bottom-[-20%] right-[-20%] w-[80%] h-[80%] rounded-full bg-blue-300 blur-[120px]" />

						{/* SVG Grid */}
						<svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
							<title>Grid decoration</title>
							<defs>
								<pattern
									id="gridCta"
									width="56"
									height="56"
									patternUnits="userSpaceOnUse"
								>
									<path
										d="M 56 0 L 0 0 0 56"
										fill="none"
										stroke="white"
										strokeWidth="0.5"
									/>
								</pattern>
							</defs>
							<rect width="100%" height="100%" fill="url(#gridCta)" />
						</svg>
					</div>

					<div className="relative z-10 flex flex-col items-center text-center max-w-2xl mx-auto space-y-6">
						<div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-[10px] font-bold text-indigo-200 uppercase tracking-widest">
							<Sparkles className="h-3 w-3" /> Step Into The Flow
						</div>
						<h2 className="text-4xl md:text-5xl font-extrabold leading-[1.1] tracking-tight text-white">
							Ready to take absolute control of your academic journey?
						</h2>
						<p className="text-indigo-200 font-light text-base sm:text-lg leading-relaxed">
							Be part of the next generation of students using data-driven
							forecasting to predict and guarantee GPA outcomes. Setup in less
							than 60 seconds.
						</p>

						<div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center items-center w-full sm:w-auto">
							<Link
								href="/signup"
								className="px-8 py-4 bg-white text-blue-600 font-bold rounded-full hover:bg-slate-50 transition-all active:scale-95 shadow-lg shadow-white/5 w-full sm:w-auto text-center cursor-pointer"
							>
								Sign up
							</Link>
							<Link
								href="/login"
								className="px-8 py-4 bg-transparent border border-white/20 text-white font-semibold rounded-full hover:bg-white/10 transition-all w-full sm:w-auto text-center cursor-pointer"
							>
								Sign in
							</Link>
						</div>
					</div>
				</div>
			</section>

			{/* Sleek Dark Brand Footer */}
			<footer className="relative z-10 bg-[#0f172a] pt-20 pb-10 px-6 border-t border-slate-800">
				<div className="max-w-5xl mx-auto">
					<div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 mb-16">
						{/* Left Column - Brand Info */}
						<div className="md:col-span-6 lg:col-span-5 space-y-6">
							<div className="flex items-center gap-2.5">
								<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600">
									<GraduationCap className="h-5 w-5 text-white" />
								</div>
								<span className="text-xl font-bold text-white tracking-tight">
									GPA<span className="text-indigo-500">Flow</span>
								</span>
							</div>
							<p className="text-slate-400 text-sm leading-relaxed font-light max-w-sm">
								GPAFlow is a secure, state-of-the-art grade and GPA tracker
								providing students with visual trajectories, semester
								projections, and smart course forecasters.
							</p>
						</div>

						{/* Links Columns */}
						<div className="md:col-span-6 lg:col-span-7 grid grid-cols-2 gap-8 sm:grid-cols-2 lg:flex lg:justify-end lg:gap-20">
							<div className="space-y-4">
								<h4 className="text-slate-200 font-bold text-sm tracking-wide">
									Application
								</h4>
								<ul className="space-y-2.5">
									<li>
										<Link
											href="/login"
											className="text-slate-400 hover:text-white transition-colors text-sm font-medium"
										>
											Sign In
										</Link>
									</li>
									<li>
										<Link
											href="/signup"
											className="text-slate-400 hover:text-white transition-colors text-sm font-medium"
										>
											Register Account
										</Link>
									</li>
								</ul>
							</div>

							<div className="space-y-4">
								<h4 className="text-slate-200 font-bold text-sm tracking-wide">
									Developer
								</h4>
								<ul className="space-y-2.5">
									<li>
										<a
											href="https://github.com/fahadshahbaz/gpaflow"
											target="_blank"
											rel="noopener noreferrer"
											className="text-slate-400 hover:text-white transition-colors text-sm font-medium"
										>
											GitHub Repository
										</a>
									</li>
									<li>
										<a
											href="https://fahadshahbaz.dev"
											target="_blank"
											rel="noopener noreferrer"
											className="text-slate-400 hover:text-white transition-colors text-sm font-medium"
										>
											Portfolio Site
										</a>
									</li>
								</ul>
							</div>
						</div>
					</div>

					{/* Bottom copyright bar */}
					<div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
						<p className="text-slate-500 text-xs font-semibold">
							© {new Date().getFullYear()} GPAFlow. Built with pride for higher
							education.
						</p>
						<div className="flex gap-4">
							<a
								href="https://github.com/fahadshahbaz"
								target="_blank"
								rel="noopener noreferrer"
								aria-label="GitHub Profile"
								className="w-9 h-9 rounded-full bg-slate-850 flex items-center justify-center text-slate-400 hover:bg-slate-800 hover:text-white transition-all active:scale-95 border border-slate-800"
							>
								<GithubIcon className="w-[18px] h-[18px]" />
							</a>
							<a
								href="https://linkedin.com/in/fahadshahbaz"
								target="_blank"
								rel="noopener noreferrer"
								aria-label="LinkedIn Profile"
								className="w-9 h-9 rounded-full bg-slate-850 flex items-center justify-center text-slate-400 hover:bg-slate-800 hover:text-white transition-all active:scale-95 border border-slate-800"
							>
								<LinkedinIcon className="w-[18px] h-[18px]" />
							</a>
						</div>
					</div>
				</div>
			</footer>
		</main>
	);
}
