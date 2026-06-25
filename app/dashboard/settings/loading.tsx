import { cn } from "@/lib/utils";

function Skeleton({ className }: { className?: string }) {
	return <div className={cn("bg-slate-200/60 rounded-xl", className)} />;
}

export default function SettingsLoading() {
	return (
		<div className="min-h-[calc(100vh-4rem)] flex justify-center pt-16 sm:pt-0 sm:items-center p-6">
			<div className="w-full max-w-xl mx-auto t-skel-skeleton is-pulsing">
				{/* Settings Card */}
				<div className="bg-white border border-slate-200/60 shadow-sm rounded-2xl overflow-hidden">
					{/* Avatar / Profile Header */}
					<div className="p-8 border-b border-slate-100 flex items-center gap-5">
						<Skeleton className="h-20 w-20 rounded-full flex-shrink-0" />
						<div className="space-y-2">
							<Skeleton className="h-7 w-48" />
							<Skeleton className="h-4 w-32" />
						</div>
					</div>

					{/* Form Section */}
					<div className="p-8 space-y-6">
						{/* Name Field */}
						<div>
							<Skeleton className="h-4 w-28 mb-3" />
							<Skeleton className="h-12 w-full" />
						</div>

						{/* Email Field */}
						<div>
							<Skeleton className="h-4 w-28 mb-3" />
							<Skeleton className="h-12 w-full" />
							<Skeleton className="h-3 w-40 mt-3" />
						</div>

						{/* Submit Button */}
						<div className="pt-2">
							<Skeleton className="h-11 w-full" />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
