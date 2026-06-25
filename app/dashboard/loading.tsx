import { DashboardSkeletonContent } from "@/components/dashboard/dashboard-skeleton";

export default function DashboardLoading() {
	return (
		<div className="t-skel" data-state="loading">
			<div className="t-skel-skeleton is-pulsing">
				<DashboardSkeletonContent />
			</div>
		</div>
	);
}
