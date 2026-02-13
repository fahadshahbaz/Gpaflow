"use client";

import {
	ArrowRight,
	BookOpen,
	GraduationCap,
	Menu,
	Target,
	TrendingUp,
	X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useState } from "react";

export default function HomePage() {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<main className="min-h-screen bg-[#f5f5f5]">
			{/* Header */}
			<div className="fixed top-6 left-0 right-0 z-50 px-4">
				<motion.header
					initial={false}
					animate={{ height: isOpen ? "auto" : "56px" }}
					transition={{ type: "spring", stiffness: 300, damping: 30 }}
					className="max-w-3xl mx-auto bg-white/50 bg-noise backdrop-blur-xl border border-white/40 shadow-sm rounded-[28px] px-5 overflow-hidden"
				>
					<div className="h-14 flex items-center justify-between shrink-0">
						<Link href="/" className="flex items-center gap-2.5">
							<div className="flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-br from-blue-500 to-blue-600">
								<GraduationCap className="h-5 w-5 text-white" />
							</div>
							<span className="text-base sm:text-lg font-semibold text-gray-900 tracking-tight">
								GPA<span className="text-blue-500">Flow</span>
							</span>
						</Link>

						{/* Desktop Actions */}
						<div className="hidden sm:flex items-center gap-1 sm:gap-2">
							<Link
								href="/login"
								className="px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-gray-600 hover:text-gray-900 transition-all rounded-full whitespace-nowrap"
							>
								Sign in
							</Link>
							<Link
								href="/signup"
								className="px-4 sm:px-5 py-2 text-xs sm:text-sm font-medium bg-blue-500 hover:bg-blue-600 text-white rounded-full transition-all shadow-sm shadow-blue-500/20 whitespace-nowrap"
							>
								Get started
							</Link>
						</div>

						{/* Mobile Menu Toggle */}
						<button
							onClick={() => setIsOpen(!isOpen)}
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
								className="flex sm:hidden flex-col items-center gap-4 pb-8 pt-2"
							>
								<Link
									href="/login"
									onClick={() => setIsOpen(false)}
									className="w-full text-center py-3 text-sm font-medium text-gray-600 hover:text-gray-900 transition-all rounded-2xl"
								>
									Sign in
								</Link>
								<Link
									href="/signup"
									onClick={() => setIsOpen(false)}
									className="w-full text-center py-3 text-sm font-medium bg-blue-500 text-white rounded-2xl shadow-sm shadow-blue-500/20"
								>
									Get started
								</Link>
							</motion.div>
						)}
					</AnimatePresence>
				</motion.header>
			</div>

			<section className="pt-32 sm:pt-44 pb-20 sm:pb-28 px-6">
				<div className="max-w-4xl mx-auto text-center">
					<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-[10px] sm:text-sm font-medium mb-6">
						<TrendingUp className="h-3.5 w-3.5 sm:h-4 w-4" />
						Track your academic progress
					</div>
					<h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-6 tracking-tight">
						Calculate your GPA
						<br />
						<span className="text-blue-500">with precision</span>
					</h1>
					<p className="text-base sm:text-lg text-gray-500 max-w-2xl mx-auto mb-10">
						A simple, fast, and accurate GPA calculator. Track your
						semesters, manage subjects, and visualize your academic journey.
					</p>
					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<Link
							href="/signup"
							className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors"
						>
							Start tracking
							<ArrowRight className="h-4 w-4" />
						</Link>
						<Link
							href="/login"
							className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white hover:bg-gray-50 text-gray-700 font-medium rounded-lg border border-gray-200 transition-colors card-shadow"
						>
							Sign in
						</Link>
					</div>
				</div>
			</section>

			{/* Features Section */}
			<section className="py-20 sm:py-28 px-6 relative bg-white/30">
				<div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-gray-200 to-transparent opacity-50" />
				<div className="max-w-5xl mx-auto">
					<div className="text-center mb-16">
						<h2 className="text-3xl font-bold text-gray-900 mb-4">
							Everything you need
						</h2>
						<p className="text-gray-500 max-w-lg mx-auto">
							Simple tools to help you stay on top of your academic performance.
						</p>
					</div>
					<div className="grid md:grid-cols-3 gap-6">
						<div className="p-6 rounded-xl bg-white border border-gray-100 card-shadow">
							<div className="h-10 w-10 rounded-lg bg-blue-50 flex items-center justify-center mb-4">
								<BookOpen className="h-5 w-5 text-blue-500" />
							</div>
							<h3 className="text-lg font-semibold text-gray-900 mb-2">
								Semester Management
							</h3>
							<p className="text-sm text-gray-500">
								Organize your courses by semester. Add subjects with marks and
								credit hours.
							</p>
						</div>
						<div className="p-6 rounded-xl bg-white border border-gray-100 card-shadow">
							<div className="h-10 w-10 rounded-lg bg-blue-50 flex items-center justify-center mb-4">
								<TrendingUp className="h-5 w-5 text-blue-500" />
							</div>
							<h3 className="text-lg font-semibold text-gray-900 mb-2">
								GPA Calculation
							</h3>
							<p className="text-sm text-gray-500">
								Automatic SGPA and CGPA calculation using the official
								grading scale.
							</p>
						</div>
						<div className="p-6 rounded-xl bg-white border border-gray-100 card-shadow">
							<div className="h-10 w-10 rounded-lg bg-blue-50 flex items-center justify-center mb-4">
								<Target className="h-5 w-5 text-blue-500" />
							</div>
							<h3 className="text-lg font-semibold text-gray-900 mb-2">
								Progress Tracking
							</h3>
							<p className="text-sm text-gray-500">
								Visualize your academic progress with charts and insights over
								time.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Footer */}
			<footer className="py-8 px-6 border-t border-gray-100 bg-white">
				<div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
					<p className="text-sm text-gray-400">
						© {new Date().getFullYear()} GPAFlow.
					</p>
					<p className="text-sm text-gray-500">
						Made with 💙 by{" "}
						<a
							href="https://fahadshahbaz.dev"
							target="_blank"
							rel="noopener noreferrer"
							className="text-blue-500 hover:text-blue-600 transition-colors font-medium"
						>
							Fahad
						</a>
					</p>
				</div>
			</footer>
		</main>
	);
}
