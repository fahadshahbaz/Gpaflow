export function AmbientBackground() {
	return (
		<div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
			<div className="absolute inset-0 bg-noise opacity-[0.015] mix-blend-overlay hidden sm:block" />
			<div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[80vw] h-[50vh] rounded-full bg-linear-to-b from-blue-500/35 via-blue-300/10 to-transparent blur-[60px] sm:blur-[110px]" />
		</div>
	);
}
