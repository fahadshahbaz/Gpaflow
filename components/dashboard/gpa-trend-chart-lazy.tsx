"use client";

import dynamic from "next/dynamic";

export const GPATrendChartLazy = dynamic(
	() => import("./gpa-trend-chart").then((mod) => mod.GPATrendChart),
	{
		ssr: false,
		loading: () => (
			<div className="h-[254px] w-full bg-slate-100/50 border border-slate-200/50 rounded-[32px] animate-pulse" />
		),
	},
);
