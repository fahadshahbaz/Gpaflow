import Link from "next/link";
import { getUser } from "@/lib/supabase/auth";
import { redirect } from "next/navigation";

export default async function HomePage() {
	const user = await getUser();

	if (user) {
		redirect("/dashboard");
	}

	return (
		<main className="min-h-screen flex flex-col items-center justify-center bg-zinc-950 p-4">
			<div className="text-center space-y-6">
				<h1 className="text-5xl font-bold text-white">
					GPA <span className="text-emerald-500">Flow</span>
				</h1>
				<p className="text-xl text-zinc-400 max-w-md">
					Track your academic journey. Calculate your GPA with precision.
				</p>
				<div className="flex gap-4 justify-center mt-8">
					<Link
						href="/login"
						className="rounded-lg bg-zinc-800 px-6 py-3 font-semibold text-white transition hover:bg-zinc-700"
					>
						Sign in
					</Link>
					<Link
						href="/signup"
						className="rounded-lg bg-emerald-600 px-6 py-3 font-semibold text-white transition hover:bg-emerald-500"
					>
						Get started
					</Link>
				</div>
			</div>
		</main>
	);
}
