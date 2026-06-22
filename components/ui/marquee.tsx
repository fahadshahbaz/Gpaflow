"use client";

import { motion } from "motion/react";
import type React from "react";

interface MarqueeProps {
	children: React.ReactNode;
	speed?: number;
	className?: string;
}

export function Marquee({
	children,
	speed = 30,
	className = "",
}: MarqueeProps) {
	return (
		<div
			className={`flex w-full overflow-hidden whitespace-nowrap ${className}`}
		>
			<motion.div
				className="flex shrink-0 items-center justify-around gap-12 px-6 min-w-full"
				animate={{ x: ["0%", "-100%"] }}
				transition={{
					ease: "linear",
					duration: speed,
					repeat: Number.POSITIVE_INFINITY,
				}}
			>
				{children}
			</motion.div>
			<motion.div
				className="flex shrink-0 items-center justify-around gap-12 px-6 min-w-full"
				animate={{ x: ["0%", "-100%"] }}
				transition={{
					ease: "linear",
					duration: speed,
					repeat: Number.POSITIVE_INFINITY,
				}}
			>
				{children}
			</motion.div>
		</div>
	);
}
