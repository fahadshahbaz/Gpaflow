import { Logo } from "@/components/ui/logo";

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <main className="min-h-screen bg-[#f5f5f5] pt-16 sm:pt-24 pb-8 px-4">
            <div className="w-full max-w-md mx-auto space-y-8">
                <div className="text-center">
                    <div className="inline-flex items-center justify-center mb-6">
                        <Logo href="/" />
                    </div>
                </div>

                {children}

                <footer className="text-center text-xs text-gray-400">
                    <p>
                        © {new Date().getFullYear()} GPA
                        <span className="text-blue-500">Flow</span>. All rights
                        reserved.
                    </p>
                </footer>
            </div>
        </main>
    );
}
