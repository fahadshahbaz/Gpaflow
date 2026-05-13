"use client";

import {
	ArrowRight,
	BarChart3,
	GraduationCap,
	LineChart,
	Menu,
	Target,
	TrendingUp,
	X,
	Zap,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/icons";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function HomePage() {
	const [isOpen, setIsOpen] = useState(false);
	const [hidden, setHidden] = useState(false);
	const lastScrollY = useRef(0);

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
		<main className="relative min-h-screen bg-[#fafafa] overflow-hidden selection:bg-blue-200">
			{/* Ambient Background Elements */}
			<div className="pointer-events-none absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-400/10 blur-[120px]" />
			<div className="pointer-events-none absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] rounded-full bg-indigo-500/10 blur-[120px]" />

			{/* Subtle grid pattern */}
			<div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

			{/* Header */}
			<div className={`fixed top-6 left-0 right-0 z-50 px-4 transition-transform duration-300 ${hidden ? "-translate-y-[calc(100%+2rem)]" : ""}`}>
				<motion.header
					initial={false}
					animate={{ height: isOpen ? "auto" : "56px" }}
					transition={{ type: "spring", stiffness: 300, damping: 30 }}
					className="max-w-3xl mx-auto bg-white/70 backdrop-blur-xl border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[28px] px-5 overflow-hidden"
				>
					<div className="h-14 flex items-center justify-between shrink-0">
						<Link href="/" className="flex items-center gap-2.5 group">
							<div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 shadow-md shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-all duration-300">
								<GraduationCap className="h-5 w-5 text-white" />
							</div>
							<span className="text-base sm:text-lg font-semibold text-gray-900 tracking-tight">
								GPA<span className="text-blue-600">Flow</span>
							</span>
						</Link>

						{/* Desktop Actions */}
						<div className="hidden sm:flex items-center gap-1">
							<Link
								href="/login"
								className="h-10 px-4 flex items-center justify-center text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors rounded-full"
							>
								Log in
							</Link>
							<Link
								href="/signup"
								className="h-10 px-6 flex items-center justify-center text-sm font-medium bg-gray-900 hover:bg-gray-800 text-white rounded-full transition-all active:scale-95"
							>
								Get Started
							</Link>
						</div>

						{/* Mobile Menu Toggle */}
						<button
							onClick={() => setIsOpen(!isOpen)}
							aria-label="Toggle menu"
							aria-expanded={isOpen}
							className="flex sm:hidden h-9 w-9 items-center justify-center rounded-full text-gray-600 hover:bg-gray-100/50 transition-colors"
						>
							{isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
						</button>
					</div>

					<AnimatePresence>
						{isOpen && (
							<motion.div
								initial={{ opacity: 0, y: -10 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -10 }}
								transition={{ duration: 0.2 }}
								className="flex sm:hidden flex-col items-center gap-3 pb-6 pt-2"
							>
								<Link
									href="/login"
									onClick={() => setIsOpen(false)}
									className="w-full text-center py-2.5 text-sm font-medium text-gray-600 hover:text-gray-900 bg-gray-50 rounded-xl"
								>
									Log in
								</Link>
								<Link
									href="/signup"
									onClick={() => setIsOpen(false)}
									className="w-full text-center py-2.5 text-sm font-medium bg-gray-900 text-white rounded-xl shadow-md"
								>
									Get Started
								</Link>
							</motion.div>
						)}
					</AnimatePresence>
				</motion.header>
			</div>

			{/* Hero Section */}
			<section className="relative pt-40 sm:pt-48 pb-20 px-6">
				<div className="max-w-5xl mx-auto flex flex-col items-center text-center">

					<motion.h1
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
						className="text-5xl sm:text-6xl md:text-7xl font-bold text-gray-900 leading-[1.1] tracking-tighter mb-6"
					>
						Master your academic <br className="hidden sm:block" />
						<span className="text-transparent bg-clip-text bg-gradient-to-b from-blue-400 to-blue-600">
							trajectory.
						</span>
					</motion.h1>

					<motion.p
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
						className="text-lg sm:text-xl text-gray-500 max-w-2xl mx-auto mb-10 font-light"
					>
						Stop relying on ephemeral calculators. GPAFlow is a persistent, beautifully designed dashboard to track your semesters and predict your future grades.
					</motion.p>

					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
						className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full sm:w-auto"
					>
						<Link
							href="/signup"
							className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-gray-900 text-white font-medium rounded-full transition-all hover:bg-gray-800 active:scale-95 w-full sm:w-auto"
						>
							Get Started
							<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
						</Link>
						<Link
							href="/login"
							className="inline-flex items-center justify-center px-8 py-4 text-gray-600 font-medium rounded-full hover:bg-gray-100 transition-colors w-full sm:w-auto"
						>
							Sign in
						</Link>
					</motion.div>
				</div>
			</section>

			{/* Dashboard Preview (The "Hook") */}
			<section className="relative px-6 pb-32">
				<div className="max-w-6xl mx-auto relative">
					<motion.div
						initial={{ opacity: 0, y: 40 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
						className="relative rounded-[2rem] border border-gray-200/60 bg-white/40 backdrop-blur-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] overflow-hidden"
					>
						{/* Window Controls */}
						<div className="h-12 bg-white/60 border-b border-gray-100/50 flex items-center px-6 gap-2 shrink-0">
							<div className="w-3 h-3 rounded-full bg-red-400" />
							<div className="w-3 h-3 rounded-full bg-amber-400" />
							<div className="w-3 h-3 rounded-full bg-emerald-400" />
						</div>

						{/* Mock App Content */}
						<div className="p-6 sm:p-10 grid grid-cols-1 md:grid-cols-3 gap-6 bg-gradient-to-b from-white/40 to-transparent">
							{/* Mock Card 1 */}
							<div className="col-span-1 md:col-span-2 rounded-[2rem] bg-white border border-gray-100 p-8 shadow-sm flex flex-col justify-between h-64">
								<div className="flex justify-between items-start">
									<div>
										<p className="text-sm font-medium text-gray-500 mb-1">Current CGPA</p>
										<p className="text-6xl font-bold text-gray-900 tracking-tight">3.84</p>
									</div>
									<div className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-xs font-bold flex items-center gap-1">
										<TrendingUp className="h-3 w-3" />
										+0.12
									</div>
								</div>

								{/* Mock Bar Chart */}
								<div className="flex items-end gap-3 h-20 mt-6">
									{[35, 55, 30, 65, 45, 90].map((height, i) => (
										<motion.div
											key={i}
											initial={{ height: 0 }}
											animate={{ height: `${height}%` }}
											transition={{ duration: 1, delay: 0.8 + (i * 0.1), type: "spring" }}
											className={`flex-1 rounded-t-xl ${i === 5 ? 'bg-blue-500' : 'bg-gray-100'}`}
										/>
									))}
								</div>
							</div>

							{/* Mock Card 2 */}
							<div className="rounded-[2rem] bg-[#0f172a] p-8 shadow-xl flex flex-col justify-between h-64 relative overflow-hidden">
								<div className="relative z-10">
									<p className="text-sm font-medium text-slate-400">Target Predictor</p>
									<p className="text-2xl font-semibold text-white mt-2">Aiming for 3.9?</p>
									<p className="text-sm text-slate-400 mt-2 leading-relaxed">You need a <span className="text-blue-400 font-bold">4.0</span> next semester to hit your goal.</p>
								</div>
								<div className="relative z-10 h-10 w-10 rounded-full bg-slate-800 flex items-center justify-center">
									<Target className="h-5 w-5 text-blue-400" />
								</div>
							</div>
						</div>
					</motion.div>
				</div>
			</section>

			{/* Bento Grid Features */}
			<section className="py-24 px-6 bg-white relative">
				<div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
				<div className="max-w-6xl mx-auto">
					<div className="text-center mb-20">
						<h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
							Designed for performance.
						</h2>
						<p className="text-gray-500 max-w-xl mx-auto text-lg">
							A toolkit crafted perfectly for university students who care about the details.
						</p>
					</div>

					<div className="grid md:grid-cols-3 gap-6">
						{/* Feature 1 */}
						<div className="group rounded-3xl bg-gray-50 border border-gray-100 p-8 transition-all duration-300 md:col-span-2 relative overflow-hidden">
							<div className="h-12 w-12 rounded-xl bg-white border border-gray-100 flex items-center justify-center mb-6 shadow-sm">
								<LineChart className="h-6 w-6 text-blue-600" />
							</div>
							<h3 className="text-2xl font-bold text-gray-900 mb-3">
								Visualized Progress
							</h3>
							<p className="text-gray-500 max-w-sm leading-relaxed">
								Don't just look at numbers. See your academic trajectory mapped out across semesters with beautiful, interactive charts.
							</p>
						</div>

						{/* Feature 2 */}
						<div className="group rounded-3xl bg-gray-50 border border-gray-100 p-8 transition-all duration-300 relative overflow-hidden">
							<div className="h-12 w-12 rounded-xl bg-white border border-gray-100 flex items-center justify-center mb-6 shadow-sm">
								<Zap className="h-6 w-6 text-amber-500" />
							</div>
							<h3 className="text-xl font-bold text-gray-900 mb-3">
								Lightning Fast
							</h3>
							<p className="text-gray-500 leading-relaxed">
								Built on Next.js App Router and Supabase. Your data is synced instantly across all your devices.
							</p>
						</div>

						{/* Feature 3 */}
						<div className="group rounded-3xl bg-gray-50 border border-gray-100 p-8 transition-all duration-300 relative overflow-hidden">
							<div className="h-12 w-12 rounded-xl bg-white border border-gray-100 flex items-center justify-center mb-6 shadow-sm">
								<BarChart3 className="h-6 w-6 text-emerald-500" />
							</div>
							<h3 className="text-xl font-bold text-gray-900 mb-3">
								Multi-University
							</h3>
							<p className="text-gray-500 leading-relaxed">
								Support for various grading systems out of the box (NUML, GCWUF, and more).
							</p>
						</div>

						{/* Feature 4 */}
						<div className="group rounded-3xl bg-gray-50 border border-gray-100 p-8 transition-all duration-300 md:col-span-2 relative overflow-hidden">
							<div className="flex flex-col sm:flex-row gap-8 items-start sm:items-center justify-between">
								<div>
									<div className="h-12 w-12 rounded-xl bg-white border border-gray-100 flex items-center justify-center mb-6 shadow-sm">
										<Target className="h-6 w-6 text-indigo-600" />
									</div>
									<h3 className="text-2xl font-bold text-gray-900 mb-3">
										Smart Predictions
									</h3>
									<p className="text-gray-500 max-w-sm leading-relaxed">
										Enter your target CGPA and we'll calculate exactly what grades you need in your upcoming semesters to hit your goal.
									</p>
								</div>

								{/* Mini interactive visual */}
								<div className="w-full sm:w-64 bg-white rounded-2xl border border-gray-100 p-4 shadow-sm group-hover:shadow-md transition-shadow">
									<div className="flex justify-between text-sm mb-2">
										<span className="text-gray-500">Target</span>
										<span className="font-bold text-gray-900">3.50</span>
									</div>
									<div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
										<div className="w-[85%] h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full" />
									</div>
									<p className="text-[10px] text-gray-400 mt-2 text-right">On track</p>
								</div>
							</div>
						</div>

					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="mt-12 bg-blue-600 relative overflow-hidden rounded-t-[3rem] pt-24 pb-32 px-6">
				<div className="max-w-4xl mx-auto text-center relative z-10">
					<h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
						Ready to take control of your grades?
					</h2>
					<p className="text-blue-100 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-light">
						Be part of a growing community of students. Get the insights, tracking, and predictions you need to achieve academic success.
					</p>
					<div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
						<Link href="/signup" className="px-8 py-3.5 bg-white text-blue-600 font-bold rounded-full hover:bg-gray-50 transition-all active:scale-95 shadow-sm">
							Get Started
						</Link>
						<Link href="/login" className="px-8 py-3.5 bg-transparent text-white border border-white/30 font-medium rounded-full hover:bg-white/10 transition-all active:scale-95">
							Sign in
						</Link>
					</div>
				</div>

			</section>

			{/* Dark Footer */}
			<footer className="relative z-10 bg-[#18181b] pt-20 pb-10 px-6">
				<div className="max-w-6xl mx-auto">
					<div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 mb-16">
						{/* Left Brand Col */}
						<div className="md:col-span-6 lg:col-span-5">
							<div className="flex items-center gap-2 mb-6">
								<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
									<GraduationCap className="h-5 w-5 text-white" />
								</div>
								<span className="text-xl font-bold text-white tracking-tight">GPAFlow</span>
							</div>
							<p className="text-gray-400 text-sm leading-relaxed mb-8">
								GPAFlow is a platform that connects students to build a strong and sustainable academic journey. Join us and discover insights, tracking, and new opportunities.
							</p>
						</div>

						{/* Links Cols */}
						<div className="md:col-span-6 lg:col-span-7 grid grid-cols-2 gap-8 sm:grid-cols-2 lg:flex lg:justify-end lg:gap-16">
							<div>
								<h3 className="text-white font-semibold mb-6 text-sm">App</h3>
								<ul className="space-y-4">
									<li><Link href="/login" className="text-gray-400 hover:text-white transition-colors text-sm">Log in</Link></li>
									<li><Link href="/signup" className="text-gray-400 hover:text-white transition-colors text-sm">Sign up</Link></li>
								</ul>
							</div>
							<div>
								<h3 className="text-white font-semibold mb-6 text-sm">Project</h3>
								<ul className="space-y-4">
									<li><a href="https://github.com/fahadshahbaz/gpaflow" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors text-sm">GitHub</a></li>
									<li><a href="https://fahadshahbaz.dev" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors text-sm">Portfolio</a></li>
								</ul>
							</div>
						</div>
					</div>

					{/* Bottom Bar */}
					<div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
						<p className="text-gray-500 text-sm">
							© {new Date().getFullYear()} GPAFlow. All rights reserved.
						</p>
						<div className="flex gap-4">
							<a href="https://github.com/fahadshahbaz" target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile" className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-white/10 hover:text-white transition-all active:scale-95">
								<GithubIcon className="w-[18px] h-[18px]" />
							</a>
							<a href="https://linkedin.com/in/fahadshahbaz" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile" className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-white/10 hover:text-white transition-all active:scale-95">
								<LinkedinIcon className="w-[18px] h-[18px]" />
							</a>
						</div>
					</div>
				</div>
			</footer>
		</main>
	);
}
