"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function NotFound() {
	const router = useRouter();

	return (
		<main className="min-h-screen bg-[#f5f5f5] flex items-center justify-center px-6">
			<div className="text-center max-w-md">
				{/* 404 Text */}
				<h1 className="text-8xl font-bold text-gray-900 mb-4 tracking-tight">
					4<span className="text-blue-500">0</span>4
				</h1>

				<h2 className="text-2xl font-semibold text-gray-900 mb-3">
					Page not found
				</h2>

				<p className="text-gray-500 mb-8">
					Sorry, we couldn't find the page you're looking for. It might have
					been moved or doesn't exist.
				</p>

				{/* Go Back Button */}
				<Button
					type="button"
					onClick={() => router.back()}
					variant="skeuoPrimary"
					className="h-11 px-6 rounded-xl cursor-pointer"
				>
					<ArrowLeft className="h-4 w-4" />
					Go back
				</Button>
			</div>
		</main>
	);
}
