import { SemestersSkeletonContent } from "@/components/dashboard/semesters-skeleton";

export default function SemestersLoading() {
	return (
		<div className="t-skel" data-state="loading">
			<div className="t-skel-skeleton is-pulsing">
				<SemestersSkeletonContent />
			</div>
		</div>
	);
}
