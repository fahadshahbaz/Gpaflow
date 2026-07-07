"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { cn } from "@/lib/utils";

export function Navigation() {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<header className="fixed top-4 left-0 right-0 z-50 px-4 sm:px-6">
			<div
				className={cn(
					"t-acc max-w-md sm:max-w-3xl mx-auto bg-white border border-slate-200/50 rounded-2xl px-4 py-2 overflow-hidden transition-[box-shadow,translate,transform] duration-300 ease-out",
					isOpen
						? "shadow-[0_24px_48px_-12px_rgba(15,23,42,0.15),0_12px_24px_-8px_rgba(15,23,42,0.1),inset_0_1px_0_#ffffff] translate-y-1"
						: "shadow-[0_8px_30px_rgba(15,23,42,0.03),inset_0_1px_0_#ffffff]",
				)}
				data-open={isOpen}
			>
				<div className="flex items-center justify-between">
					<Logo size="sm" href="/" />

					<div className="hidden sm:flex items-center gap-3">
						<Link
							href="/supported-universities"
							className="text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors px-3 py-1.5"
						>
							Universities
						</Link>
						<Link
							href="/login"
							className="text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors px-3 py-1.5"
						>
							Log in
						</Link>
						<Button
							asChild
							variant="skeuoPrimary"
							className="font-bold cursor-pointer rounded-lg px-5 py-3 h-auto text-xs"
						>
							<Link href="/signup">Get Started</Link>
						</Button>
					</div>

					<button
						type="button"
						onClick={() => setIsOpen(!isOpen)}
						className="t-acc-head flex sm:hidden h-9 w-9 items-center justify-center rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100/50 transition-all duration-200 active:scale-90 cursor-pointer"
						aria-expanded={isOpen}
						aria-label="Toggle navigation menu"
					>
						<div
							className="t-icon-swap h-4.5 w-4.5"
							data-state={isOpen ? "b" : "a"}
						>
							<span className="t-icon" data-icon="a">
								<Menu className="h-4.5 w-4.5" />
							</span>
							<span className="t-icon" data-icon="b">
								<X className="h-4.5 w-4.5" />
							</span>
						</div>
					</button>
				</div>

				{/* Mobile Menu Drawer (Inline Expansion) */}
				<div className="t-acc-panel sm:hidden">
					<div className="t-acc-panel-inner">
						<div className="mt-3.5 pt-3.5 border-t border-slate-100/90 space-y-3">
							<Link
								href="/supported-universities"
								onClick={() => setIsOpen(false)}
								className="block text-center py-2 text-sm font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-all"
							>
								Supported Universities
							</Link>
							<div className="flex items-center justify-between gap-3 pt-0.5">
								<Link
									href="/login"
									onClick={() => setIsOpen(false)}
									className="flex-1 text-center py-2.5 text-sm font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-all"
								>
									Log in
								</Link>
								<Button
									asChild
									variant="skeuoPrimary"
									className="flex-1 font-bold cursor-pointer h-10 rounded-lg"
								>
									<Link href="/signup" onClick={() => setIsOpen(false)}>
										Get Started
									</Link>
								</Button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</header>
	);
}
