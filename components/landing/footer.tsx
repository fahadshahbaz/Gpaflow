export function Footer() {
	return (
		<footer className="relative z-10 w-full py-6 mt-auto bg-transparent text-center text-xs text-slate-500 font-medium">
			<p>
				© {new Date().getFullYear()} GPAFlow. Made by{" "}
				<a
					href="https://fahadshahbaz.dev"
					target="_blank"
					rel="noopener noreferrer"
					className="text-slate-600 hover:text-slate-950 transition-colors duration-200 underline underline-offset-2"
				>
					Fahad
				</a>
				.
			</p>
		</footer>
	);
}
