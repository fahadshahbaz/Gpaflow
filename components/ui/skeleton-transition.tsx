"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface SkeletonTransitionProps {
	skeleton: React.ReactNode;
	children: React.ReactNode;
}

export function SkeletonTransition({
	skeleton,
	children,
}: SkeletonTransitionProps) {
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		requestAnimationFrame(() => {
			setIsLoaded(true);
		});
	}, []);

	return (
		<div
			className={cn("t-skel", isLoaded && "is-revealed")}
			data-state={isLoaded ? "ready" : "loading"}
		>
			<div className="t-skel-skeleton is-pulsing">{skeleton}</div>
			<div className="t-skel-content">{children}</div>
		</div>
	);
}
