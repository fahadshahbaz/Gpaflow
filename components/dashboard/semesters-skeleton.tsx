import { cn } from "@/lib/utils";

function Skeleton({ className }: { className?: string }) {
	return <div className={cn("bg-slate-200/60 rounded-xl", className)} />;
}

export function SemestersSkeletonContent() {
	return (
		<div className="max-w-[1600px] mx-auto px-6 py-8">
			{/* Page Header Skeleton */}
			<div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-8">
				<div>
					<Skeleton className="h-9 w-40 mb-2" />
					<Skeleton className="h-5 w-64" />
				</div>
				<Skeleton className="h-10 w-36 rounded-lg" />
			</div>

			{/* Semester List Card Skeleton */}
			<div className="bg-[#f8fafc] border border-slate-200/60 shadow-[inset_0_1.5px_3.5px_rgba(0,0,0,0.04)] rounded-3xl p-6">
				<div className="mb-6">
					<Skeleton className="h-6 w-40 mb-2" />
					<Skeleton className="h-4 w-56" />
				</div>

				{/* Semester Items Skeleton */}
				<div className="space-y-4">
					<Skeleton className="h-24 rounded-2xl" />
					<Skeleton className="h-24 rounded-2xl" />
					<Skeleton className="h-24 rounded-2xl" />
				</div>
			</div>
		</div>
	);
}
