import { ArrowRight, BookOpen, Target, TrendingUp } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
	return (
		<main className="min-h-screen bg-[#f5f5f5]">
			{/* Header */}
			<header className="fixed top-0 left-0 right-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-xl">
				<div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
					<Link href="/" className="text-xl font-bold text-gray-900">
						GPA<span className="text-blue-500">Flow</span>
					</Link>
					<div className="flex items-center gap-3">
						<Link
							href="/login"
							className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
						>
							Sign in
						</Link>
						<Link
							href="/signup"
							className="px-4 py-2 text-sm font-medium bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
						>
							Get started
						</Link>
					</div>
				</div>
			</header>

			{/* Hero Section */}
			<section className="pt-32 pb-20 px-6">
				<div className="max-w-4xl mx-auto text-center">
					<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-sm font-medium mb-6">
						<TrendingUp className="h-4 w-4" />
						Track your academic progress
					</div>
					<h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
						Calculate your GPA
						<br />
						<span className="text-blue-500">with precision</span>
					</h1>
					<p className="text-lg text-gray-500 max-w-2xl mx-auto mb-10">
						A simple, fast, and accurate GPA calculator designed for NUML
						students. Track your semesters, manage subjects, and visualize your
						academic journey.
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
			<section className="py-20 px-6 border-t border-gray-200">
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
								Automatic SGPA and CGPA calculation using the official NUML
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

			{/* CTA Section */}
			<section className="py-20 px-6 border-t border-gray-200">
				<div className="max-w-2xl mx-auto text-center">
					<h2 className="text-3xl font-bold text-gray-900 mb-4">
						Ready to get started?
					</h2>
					<p className="text-gray-500 mb-8">
						Create your free account and start tracking your GPA today.
					</p>
					<Link
						href="/signup"
						className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors"
					>
						Create account
						<ArrowRight className="h-4 w-4" />
					</Link>
				</div>
			</section>

			{/* Footer */}
			<footer className="py-8 px-6 border-t border-gray-200 bg-white">
				<div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
					<p className="text-sm text-gray-400">
						© {new Date().getFullYear()} GPAFlow. Built for NUML students.
					</p>
					<div className="flex items-center gap-6">
						<Link
							href="/login"
							className="text-sm text-gray-500 hover:text-gray-700"
						>
							Sign in
						</Link>
						<Link
							href="/signup"
							className="text-sm text-gray-500 hover:text-gray-700"
						>
							Sign up
						</Link>
					</div>
				</div>
			</footer>
		</main>
	);
}
