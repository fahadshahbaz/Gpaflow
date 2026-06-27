import { AmbientBackground } from "@/components/landing/ambient-background";
import { Navigation } from "@/components/landing/navigation";
import { Hero } from "@/components/landing/hero";
import { Footer } from "@/components/landing/footer";

export default function HomePage() {
	return (
		<div className="w-full bg-[#f8fafc] min-h-screen relative overflow-x-hidden selection:bg-blue-100">
			<AmbientBackground />
			<div className="max-w-[1440px] mx-auto min-h-screen flex flex-col justify-between relative z-10">
				<Navigation />
				<Hero />
				<Footer />
			</div>
		</div>
	);
}
