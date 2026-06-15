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
			<div className="w-full lg:w-1/2 flex flex-col justify-between p-6 sm:p-8 md:p-10 min-h-screen bg-white">
				{/* Top Logo */}
				<div className="flex justify-start">
					<Logo href="/" variant="skeuomorphic" />
				</div>

				{/* Form Content Wrapper */}
				<div className="w-full max-w-105 mx-auto my-auto py-4 sm:py-6">
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
				<div className="w-full h-full rounded-[2.5rem] bg-linear-to-br from-blue-700 via-blue-600 to-sky-600 relative overflow-hidden flex flex-col justify-between p-12 text-white border border-blue-500/30 shadow-[inset_0_4px_12px_rgba(255,255,255,0.22),inset_0_-4px_12px_rgba(0,0,0,0.3),0_20px_50px_rgba(29,78,216,0.15)]">
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

					{/* Top Section - Quiet branding note */}
					<div className="relative z-10">
						<span className="text-xs font-bold tracking-wider text-blue-200/70 uppercase font-mono">
							GPAFlow Predictive Platform
						</span>
					</div>

					{/* Center Area - Typographic Hero & Floating Transparent Graph */}
					<div className="my-auto space-y-8 max-w-2xl w-full relative z-10">
						<div className="space-y-6">
							<span className="inline-flex items-center text-[10px] font-bold tracking-widest text-blue-200 uppercase bg-white/10 px-3.5 py-1.5 rounded-full border border-white/10 w-fit">
								The Student Operating System
							</span>
							<h3 className="text-4xl sm:text-5xl font-extrabold text-white leading-[1.15] tracking-tight">
								Master your academic <br />
								<span className="text-transparent bg-clip-text bg-linear-to-r from-blue-200 to-sky-200">
									trajectory.
								</span>
							</h3>
							<p className="text-blue-100/80 text-base font-light leading-relaxed text-justify">
								GPAFlow provides a beautiful, state-of-the-art predictive
								dashboard to visualize semesters, track progression, and
								automate your degree planning down to the decimal.
							</p>
						</div>

						{/* Minimal line graph without bg color */}
						<div className="relative w-full h-35 pt-4 select-none">
							{/* Horizontal grid lines */}
							<div className="absolute inset-x-0 top-0 h-px bg-white/10" />
							<div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-white/5" />
							<div className="absolute inset-x-0 bottom-0 h-px bg-white/10" />

							<svg
								className="w-full h-full overflow-visible"
								viewBox="0 0 500 100"
							>
								<title>GPA Trajectory Flow</title>
								<defs>
									{/* Glow Filter for the main trend line */}
									<filter
										id="lineGlow"
										x="-20%"
										y="-20%"
										width="140%"
										height="140%"
									>
										<feDropShadow
											dx="0"
											dy="4"
											stdDeviation="6"
											floodColor="#93c5fd"
											floodOpacity="0.4"
										/>
									</filter>
									{/* Gradient for the path */}
									<linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
										<stop offset="0%" stopColor="#93c5fd" stopOpacity="0.5" />
										<stop offset="50%" stopColor="#ffffff" stopOpacity="0.8" />
										<stop offset="100%" stopColor="#ffffff" stopOpacity="1" />
									</linearGradient>
								</defs>

								{/* The trend path */}
								<path
									d="M 15 80 Q 120 70 240 45 T 465 20"
									fill="none"
									stroke="url(#lineGrad)"
									strokeWidth="5"
									strokeLinecap="round"
									filter="url(#lineGlow)"
								/>

								{/* Glow Dots along the path */}
								<circle cx="15" cy="80" r="4" fill="#93c5fd" />
								<circle cx="240" cy="45" r="4" fill="#ffffff" />

								{/* Active end point */}
								<circle cx="465" cy="20" r="6" fill="#ffffff" />

								{/* Floating Text Markers */}
								<text
									x="15"
									y="96"
									fill="rgba(255,255,255,0.4)"
									fontSize="8"
									fontFamily="monospace"
									fontWeight="bold"
								>
									SEM 1
								</text>
								<text
									x="240"
									y="62"
									fill="rgba(255,255,255,0.6)"
									fontSize="8"
									fontFamily="monospace"
									fontWeight="bold"
								>
									SEM 2
								</text>
								<text
									x="435"
									y="38"
									fill="#ffffff"
									fontSize="9"
									fontFamily="monospace"
									fontWeight="extrabold"
								>
									3.92 CGPA
								</text>
							</svg>
						</div>

						{/* Soft decorative divider line */}
						<div className="w-24 h-1 bg-linear-to-r from-blue-300/40 to-transparent rounded-full" />
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
