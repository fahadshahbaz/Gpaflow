"use client";

import { ArrowRight, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Logo } from "@/components/ui/logo";
import { Marquee } from "@/components/ui/marquee";

export default function HomePage() {
	const [isOpen, setIsOpen] = useState(false);

	const supportedSystems = [
		"Standard 4.0 GPA",
		"NUML Scale",
		"GCWUF Scale",
		"WAM 100",
		"Percentage System",
		"Letter Grades",
	];

	return (
		<main className="relative min-h-screen bg-[#f8fafc] overflow-x-hidden selection:bg-blue-100 font-sans flex flex-col justify-between">
			{/* Ambient Light & repeating Dot Grid Background */}
			<div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
				<svg
					className="absolute inset-0 w-full h-full opacity-[0.9]"
					xmlns="http://www.w3.org/2000/svg"
				>
					<title>Dot Grid Background</title>
					<defs>
						<pattern
							id="dotGrid"
							width="36"
							height="36"
							patternUnits="userSpaceOnUse"
						>
							<circle cx="2" cy="2" r="1.2" fill="#cbd5e1" />
						</pattern>
						<linearGradient id="gridFade" x1="0%" y1="0%" x2="0%" y2="100%">
							<stop offset="0%" stopColor="white" stopOpacity="0.9" />
							<stop offset="15%" stopColor="white" stopOpacity="0.9" />
							<stop offset="50%" stopColor="white" stopOpacity="0.4" />
							<stop offset="85%" stopColor="white" stopOpacity="0.9" />
							<stop offset="100%" stopColor="white" stopOpacity="0.9" />
						</linearGradient>
						<mask id="gridMask">
							<rect width="100%" height="100%" fill="url(#gridFade)" />
						</mask>
					</defs>
					{/* Render grid from top to bottom with vertical fade mask */}
					<rect
						width="100%"
						height="100%"
						fill="url(#dotGrid)"
						mask="url(#gridMask)"
					/>
				</svg>

				<div className="absolute inset-0 bg-noise opacity-[0.015] mix-blend-overlay" />
				<div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[80vw] h-[50vh] rounded-full bg-gradient-to-b from-blue-200/35 via-blue-100/5 to-transparent blur-[110px]" />
			</div>

			{/* Floating Glassmorphic Navigation */}
			<header className="fixed top-4 left-0 right-0 z-50 px-4 sm:px-6">
				<motion.div
					layout
					transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
					className="max-w-3xl mx-auto bg-white/75 backdrop-blur-xl border border-slate-200/50 rounded-2xl shadow-[0_8px_30px_rgba(15,23,42,0.03),inset_0_1px_0_#ffffff] px-4 py-3 overflow-hidden"
				>
					<div className="flex items-center justify-between">
						<Logo size="sm" href="/" />

						<div className="hidden sm:flex items-center gap-3">
							<Link
								href="/login"
								className="text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors px-3 py-1.5"
							>
								Log in
							</Link>
							<Link
								href="/signup"
								className="btn-skeuo-primary h-9 px-5 flex items-center justify-center text-xs font-bold rounded-xl"
							>
								Get Started
							</Link>
						</div>

						<button
							type="button"
							onClick={() => setIsOpen(!isOpen)}
							className="flex sm:hidden h-9 w-9 items-center justify-center rounded-xl btn-skeuo-white text-slate-650"
						>
							{isOpen ? (
								<X className="h-4.5 w-4.5" />
							) : (
								<Menu className="h-4.5 w-4.5" />
							)}
						</button>
					</div>

					{/* Mobile Menu Drawer (Inline Expansion) */}
					<AnimatePresence initial={false}>
						{isOpen && (
							<motion.div
								initial={{ opacity: 0, height: 0 }}
								animate={{ opacity: 1, height: "auto" }}
								exit={{ opacity: 0, height: 0 }}
								transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
								className="sm:hidden overflow-hidden mt-3.5 pt-3.5 border-t border-slate-100/90"
							>
								<div className="flex items-center justify-between gap-3 pt-0.5">
									<Link
										href="/login"
										onClick={() => setIsOpen(false)}
										className="flex-1 text-center py-2.5 text-sm font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-all"
									>
										Log in
									</Link>
									<Link
										href="/signup"
										onClick={() => setIsOpen(false)}
										className="flex-1 btn-skeuo-primary h-10 flex items-center justify-center text-xs font-bold rounded-xl"
									>
										Get Started
									</Link>
								</div>
							</motion.div>
						)}
					</AnimatePresence>
				</motion.div>
			</header>

			{/* Main Hero Section */}
			<section className="relative flex-1 flex flex-col justify-center px-4 sm:px-8 pt-32 pb-16 z-10 max-w-5xl mx-auto w-full">
				<div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center mt-4">
					{/* Left Typography Column */}
					<motion.div
						initial={{ opacity: 0, y: 15 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
						className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left mx-auto lg:mx-0"
					>
						<h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-[-0.03em] leading-[1.05] mb-5">
							Track, calculate, and forecast your{" "}
							<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-sky-500">
								GPA.
							</span>
						</h1>

						<p className="text-base sm:text-lg text-slate-500 font-medium max-w-md mb-8 leading-relaxed mx-auto lg:mx-0">
							Calculate semester grades, set target goals, and simulate future
							scenarios to manage your academic progress with precision.
						</p>

						<div className="flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto">
							<Link
								href="/signup"
								className="btn-skeuo-primary group h-12 px-6 flex items-center justify-center gap-2 text-sm font-bold rounded-xl w-full sm:w-auto"
							>
								Start Tracking
								<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
							</Link>
							<Link
								href="/login"
								className="btn-skeuo-white h-12 px-6 flex items-center justify-center text-sm font-bold text-slate-700 rounded-xl w-full sm:w-auto"
							>
								View Dashboard
							</Link>
						</div>
					</motion.div>

					{/* Right Custom Vector Art Illustration Column */}
					<motion.div
						initial={{ opacity: 0, scale: 0.96, y: 15 }}
						animate={{ opacity: 1, scale: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
						className="lg:col-span-5 w-full max-w-[420px] mx-auto lg:mx-0 lg:ml-auto"
					>
						<AcademicIllustration />
					</motion.div>
				</div>
			</section>

			{/* Subtly Integrated Fading Marquee */}
			<div className="relative z-10 py-5 w-full mt-auto bg-transparent overflow-hidden border-t border-slate-200/30">
				<div
					className="relative w-full"
					style={{
						WebkitMaskImage:
							"linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
						maskImage:
							"linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
					}}
				>
					<Marquee
						speed={35}
						className="text-slate-500/60 font-extrabold text-xs tracking-wide"
					>
						{supportedSystems.map((system, idx) => (
							<div
								key={`${system}-${idx}`}
								className="px-6 flex items-center gap-2"
							>
								<div className="h-1 w-1 rounded-full bg-blue-500/30" />
								{system}
							</div>
						))}
					</Marquee>
				</div>
			</div>
		</main>
	);
}

function AcademicIllustration() {
	return (
		<div className="relative w-full flex items-center justify-center">
			{/* Ambient glows */}
			<div className="absolute inset-0 bg-gradient-to-tr from-blue-400/10 via-sky-300/5 to-transparent rounded-full blur-[80px] pointer-events-none" />

			<Image
				src="/study.svg"
				alt="Academic Study Illustration"
				width={420}
				height={320}
				priority
				className="w-full h-auto object-contain relative z-10"
			/>
		</div>
	);
}
