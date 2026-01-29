import { redirect } from "next/navigation";
import { getUser, signOut } from "@/lib/supabase/auth";

export default async function DashboardPage() {
    const user = await getUser();

    if (!user) {
        redirect("/login");
    }

    return (
        <main className="min-h-screen bg-zinc-950 p-8">
            <div className="mx-auto max-w-6xl">
                <header className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
                        <p className="text-zinc-400">{user.email}</p>
                    </div>
                    <form action={signOut}>
                        <button
                            type="submit"
                            className="rounded-lg bg-zinc-800 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-700"
                        >
                            Sign out
                        </button>
                    </form>
                </header>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
                        <p className="text-sm text-zinc-400">CGPA</p>
                        <p className="mt-2 text-3xl font-bold text-white">0.00</p>
                    </div>
                    <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
                        <p className="text-sm text-zinc-400">Credit Hours</p>
                        <p className="mt-2 text-3xl font-bold text-white">0</p>
                    </div>
                    <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
                        <p className="text-sm text-zinc-400">Semesters</p>
                        <p className="mt-2 text-3xl font-bold text-white">0</p>
                    </div>
                    <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
                        <p className="text-sm text-zinc-400">Target GPA</p>
                        <p className="mt-2 text-3xl font-bold text-emerald-500">3.50</p>
                    </div>
                </div>

                <div className="mt-8 rounded-xl border border-zinc-800 bg-zinc-900 p-6">
                    <h2 className="text-lg font-semibold text-white mb-4">Semesters</h2>
                    <p className="text-zinc-500">No semesters added yet. Start by adding your first semester.</p>
                </div>
            </div>
        </main>
    );
}
