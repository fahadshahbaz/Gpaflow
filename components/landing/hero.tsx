import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export function Hero() {
	return (
		<section className="relative flex-1 flex flex-col justify-center px-4 sm:px-8 pt-32 pb-16 z-10 max-w-5xl mx-auto w-full">
			<div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center mt-4">
				{/* Left Typography Column */}
				<div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left mx-auto lg:mx-0 max-w-xl lg:max-w-none animate-in fade-in-0 slide-in-from-bottom-4 duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
					<h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-[-0.03em] leading-[1.05] mb-5 text-balance">
						Track, calculate, and forecast your{" "}
						<span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-sky-500">
							GPA.
						</span>
					</h1>

					<p className="text-base sm:text-lg text-slate-500 font-medium max-w-md mb-8 leading-relaxed mx-auto lg:mx-0 text-pretty">
						Calculate semester grades, set target goals, and simulate future
						scenarios to manage your academic progress with precision.
					</p>

					<div className="flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto">
						<Link
							href="/signup"
							className="btn-skeuo-primary group h-12 px-6 flex items-center justify-center gap-2 text-sm font-bold rounded-xl w-full max-w-70 sm:w-auto"
						>
							Start Tracking
							<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
						</Link>
						<Link
							href="/login"
							className="btn-skeuo-white h-12 px-6 flex items-center justify-center text-sm font-bold text-slate-700 rounded-xl w-full max-w-70 sm:w-auto"
						>
							View Dashboard
						</Link>
					</div>
				</div>

				{/* Right Custom Vector Art Illustration Column */}
				<div className="lg:col-span-5 w-full max-w-105 mx-auto lg:mx-0 lg:ml-auto animate-in fade-in-0 zoom-in-95 slide-in-from-bottom-4 duration-600 delay-100 ease-[cubic-bezier(0.16,1,0.3,1)] fill-mode-both">
					<AcademicIllustration />
				</div>
			</div>
		</section>
	);
}

function AcademicIllustration() {
	return (
		<div className="relative w-full flex items-center justify-center">
			{/* Ambient glows */}
			<div className="absolute inset-0 bg-linear-to-tr from-blue-400/10 via-sky-300/5 to-transparent rounded-full blur-[80px] pointer-events-none" />

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
