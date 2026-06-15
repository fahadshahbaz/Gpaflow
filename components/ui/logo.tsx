import { GraduationCap } from "lucide-react";
import Link from "next/link";

interface LogoProps {
	size?: "sm" | "md" | "lg";
	href?: string;
	variant?: "default" | "skeuomorphic" | "neumorphic";
}

const sizes = {
	sm: {
		container: "h-9 w-9 rounded-xl",
		icon: "h-5 w-5",
		text: "text-base sm:text-lg",
	},
	md: {
		container: "h-10 w-10 rounded-xl",
		icon: "h-5.5 w-5.5",
		text: "text-lg sm:text-xl",
	},
	lg: {
		container: "h-14 w-14 rounded-2xl",
		icon: "h-7.5 w-7.5",
		text: "text-2xl sm:text-3xl",
	},
};

export function Logo({ size = "md", href, variant = "default" }: LogoProps) {
	const s = sizes[size];

	const logoIcon = (
		<div
			className={`flex ${s.container} items-center justify-center bg-gradient-to-b from-blue-500 to-blue-600 border border-blue-400/30 shadow-[inset_0_1px_0_rgba(255,255,255,0.3),0_3px_6px_rgba(59,130,246,0.25)] group-hover:from-blue-450 group-hover:to-blue-550 transition-[background-image,transform] duration-200 ease-out active:scale-[0.97]`}
		>
			<GraduationCap className={`${s.icon} text-white`} />
		</div>
	);

	const content = (
		<>
			{logoIcon}
			<span
				className={`${s.text} font-bold text-gray-900 tracking-tight`}
			>
				GPA<span className="text-blue-600">Flow</span>
			</span>
		</>
	);

	if (href) {
		return (
			<Link
				href={href}
				className="flex items-center gap-2.5 group active:scale-[0.97] transition-[transform] duration-200 ease-out"
			>
				{content}
			</Link>
		);
	}

	return <div className="flex items-center gap-2.5">{content}</div>;
}

