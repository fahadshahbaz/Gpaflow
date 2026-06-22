import { redirect } from "next/navigation";
import { SettingsForm } from "@/components/dashboard/settings-form";
import { getUser } from "@/lib/supabase/auth";

export default async function SettingsPage() {
	const user = await getUser();

	if (!user) {
		redirect("/login");
	}

	const initialName = user.user_metadata?.name || "";
	const initialEmail = user.email || "";

	return (
		<div className="min-h-[calc(100vh-4rem)] flex justify-center pt-16 sm:pt-0 sm:items-center p-6">
			<SettingsForm initialName={initialName} initialEmail={initialEmail} />
		</div>
	);
}
