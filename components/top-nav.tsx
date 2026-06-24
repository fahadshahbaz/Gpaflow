"use client";

import {
	BookOpen,
	ChevronDown,
	LayoutDashboard,
	LogOut,
	Plus,
	Settings,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Logo } from "@/components/ui/logo";
import { signOut } from "@/lib/supabase/auth";
import { cn } from "@/lib/utils";

const navItems = [
	{ title: "Overview", href: "/dashboard", icon: LayoutDashboard },
	{ title: "Semesters", href: "/dashboard/semesters", icon: BookOpen },
	{ title: "Settings", href: "/dashboard/settings", icon: Settings },
];

interface TopNavProps {
	userName?: string;
	userEmail?: string;
}

export function TopNav({ userName, userEmail }: TopNavProps) {
	const pathname = usePathname();
	const [showDropdown, setShowDropdown] = useState(false);
	const [showMobileMenu, setShowMobileMenu] = useState(false);
	const [hidden, setHidden] = useState(false);
	const lastScrollY = useRef(0);
	const dropdownRef = useRef<HTMLDivElement>(null);
	const mobileMenuRef = useRef<HTMLDivElement>(null);
	const tabsRef = useRef<HTMLElement>(null);
	const pillRef = useRef<HTMLSpanElement>(null);

	useEffect(() => {
		const handleScroll = () => {
			const currentScrollY = window.scrollY;
			const scrollingDown = currentScrollY > lastScrollY.current;

			if (scrollingDown && currentScrollY > 60) {
				setHidden(true);
				setShowDropdown(false);
				setShowMobileMenu(false);
			} else if (!scrollingDown) {
				setHidden(false);
			}

			lastScrollY.current = currentScrollY;
		};

		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			const target = event.target as Node;
			if (dropdownRef.current && !dropdownRef.current.contains(target)) {
				setShowDropdown(false);
			}
			if (mobileMenuRef.current && !mobileMenuRef.current.contains(target)) {
				setShowMobileMenu(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	useEffect(() => {
		const container = tabsRef.current;
		if (!container || !pillRef.current) return;

		const updatePill = (immediate = false) => {
			const activeTab = container.querySelector<HTMLElement>(
				'[aria-selected="true"]',
			);
			if (!activeTab || !pillRef.current) return;

			if (immediate) {
				pillRef.current.style.transition = "none";
			}
			pillRef.current.style.transform = `translateX(${activeTab.offsetLeft}px)`;
			pillRef.current.style.width = `${activeTab.offsetWidth}px`;
			pillRef.current.style.height = `${activeTab.offsetHeight}px`;
			pillRef.current.style.top = `${activeTab.offsetTop}px`;
			if (immediate) {
				void pillRef.current.offsetHeight; // force reflow
				pillRef.current.style.transition = "";
			}
		};

		updatePill(true);
		const observer = new ResizeObserver(() => updatePill(true));
		observer.observe(container);

		return () => observer.disconnect();
	}, []);

	useEffect(() => {
		const container = tabsRef.current;
		if (!container || !pillRef.current) return;
		const activeTab = container.querySelector<HTMLElement>(
			'[aria-selected="true"]',
		);
		if (!activeTab) return;

		pillRef.current.style.transform = `translateX(${activeTab.offsetLeft}px)`;
		pillRef.current.style.width = `${activeTab.offsetWidth}px`;
		pillRef.current.style.height = `${activeTab.offsetHeight}px`;
		pillRef.current.style.top = `${activeTab.offsetTop}px`;
	}, [pathname]);

	return (
		<div
			className={cn(
				"fixed left-0 right-0 px-4 sm:px-6 z-50 transition-transform duration-500 ease-out",
				hidden ? "-translate-y-[calc(100%+2rem)]" : "translate-y-0"
			)}
			style={{
				top: "calc(1rem + var(--banner-offset, 0px))",
			}}
		>
			<header className="max-w-[1600px] mx-auto w-full relative">
				<div className="h-[60px] flex items-center justify-between shrink-0">
					{/* Logo */}
					<Logo size="sm" href="/dashboard" />

					{/* Right Section - Grouped Navigation & Profile */}
					<div className="hidden md:flex items-center gap-4">
						{/* Desktop Navigation */}
						<nav
							ref={tabsRef}
							className="t-tabs flex items-center gap-1.5 transition-all duration-500 ease-out rounded-full p-1 bg-slate-100/90 backdrop-blur-md border border-slate-200/50 shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_2px_8px_rgba(0,0,0,0.03)]"
						>
							<span
								ref={pillRef}
								className="t-tabs-pill bg-white rounded-full border border-slate-200/80 shadow-[0_2px_4px_rgba(0,0,0,0.04),inset_0_1px_0_#ffffff]"
								aria-hidden="true"
							/>
							{navItems.map((item) => {
								const isActive = pathname === item.href;
								return (
									<Link
										key={item.href}
										href={item.href}
										role="tab"
										aria-selected={isActive}
										className={cn(
											"t-tab flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-normal",
											isActive
												? "text-slate-800"
												: "text-slate-500 hover:text-slate-800",
										)}
									>
										{item.title}
									</Link>
								);
							})}
						</nav>

						{/* Profile Dropdown Container */}
						<div className="flex items-center transition-all duration-500 ease-out rounded-full p-1 h-12 bg-slate-100/90 backdrop-blur-md border border-slate-200/50 shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_2px_8px_rgba(0,0,0,0.03)]">
							{/* Profile Dropdown */}
							<div className="relative" ref={dropdownRef}>
								<button
									type="button"
									onClick={() => setShowDropdown(!showDropdown)}
									className="flex items-center gap-2 rounded-full pl-1 pr-3 h-10 bg-white border border-slate-200/80 shadow-[0_2px_4px_rgba(0,0,0,0.04),inset_0_1px_0_#ffffff] hover:border-slate-300 transition-[border-color,transform] duration-200 ease-out active:scale-[0.97] cursor-pointer"
								>
									<div className="h-8 w-8 rounded-full bg-gradient-to-b from-blue-400 to-blue-600 flex items-center justify-center border border-blue-500/15 shadow-[0_2px_4px_rgba(37,99,235,0.1)] flex-shrink-0 overflow-hidden">
										<span className="text-xs font-bold text-white tracking-wide">
											{userName?.charAt(0).toUpperCase() ||
												userEmail?.charAt(0).toUpperCase() ||
												"U"}
										</span>
									</div>
									<ChevronDown
										className={cn(
											"h-3.5 w-3.5 text-slate-500 transition-transform duration-200",
											showDropdown && "rotate-180",
										)}
									/>
								</button>

								<AnimatePresence>
									{showDropdown && (
										<motion.div
											initial={{ opacity: 0, scale: 0.97, y: 4 }}
											animate={{ opacity: 1, scale: 1, y: 0 }}
											exit={{ opacity: 0, scale: 0.97, y: 4 }}
											style={{ originX: 1, originY: 0 }}
											transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
											className="absolute right-0 mt-3 w-64 rounded-[1.25rem] bg-white border border-slate-200/80 shadow-[0_16px_36px_-8px_rgba(0,0,0,0.08),0_4px_12px_-2px_rgba(0,0,0,0.03),inset_0_1px_0_#ffffff] pb-2 z-[100] overflow-hidden backdrop-blur-md"
										>
											<div className="px-4.5 py-4 border-b border-slate-100 bg-slate-50/40">
												<p className="text-sm font-extrabold text-slate-800 leading-tight">
													{userName || "User"}
												</p>
											</div>
											<div className="p-1.5 space-y-0.5">
												<Link
													href="/dashboard/settings"
													onClick={() => setShowDropdown(false)}
													className="group flex items-center gap-3 px-3.5 py-2.5 text-sm font-normal text-slate-600 rounded-xl transition-colors duration-200 ease-out hover:bg-blue-50/70 hover:text-blue-700 border border-transparent hover:border-blue-200/70 hover:shadow-[0_4px_10px_rgba(37,99,235,0.04),inset_0_1px_0_#ffffff]"
												>
													<Settings className="h-4 w-4 text-slate-400 group-hover:text-blue-650 transition-colors" />
													Settings
												</Link>
												<form action={signOut}>
													<button
														type="submit"
														className="group flex w-[calc(100%-1px)] items-center gap-3 px-3.5 py-2.5 text-sm font-normal text-rose-500 rounded-xl transition-colors duration-200 ease-out hover:bg-rose-50/85 hover:text-rose-700 border border-transparent hover:border-rose-200/70 hover:shadow-[0_4px_10px_rgba(244,63,94,0.04),inset_0_1px_0_#ffffff] cursor-pointer"
													>
														<LogOut className="h-4 w-4 text-rose-450 group-hover:text-rose-650 transition-colors" />
														Sign Out
													</button>
												</form>
											</div>
										</motion.div>
									)}
								</AnimatePresence>
							</div>
						</div>
					</div>

					{/* Mobile Menu Dropdown */}
					<div className="relative md:hidden w-10 h-10" ref={mobileMenuRef}>
						<div
							className={cn(
								"t-morph absolute top-0 right-0 bg-white border border-slate-200/80 shadow-[0_16px_36px_-8px_rgba(0,0,0,0.08),0_4px_12px_-2px_rgba(0,0,0,0.03),inset_0_1px_0_#ffffff] z-[100]",
							)}
							data-open={showMobileMenu}
						>
							<div className="t-morph-menu flex flex-col justify-between p-1.5 h-full">
								<div className="space-y-0.5">
									{navItems.map((item) => {
										const isActive = pathname === item.href;
										return (
											<Link
												key={item.href}
												href={item.href}
												onClick={() => setShowMobileMenu(false)}
												className={cn(
													"flex items-center gap-3 px-3.5 py-2.5 text-sm font-normal rounded-xl transition-colors duration-200 ease-out mx-0.5 hover:bg-blue-50/70 hover:text-blue-700 border border-transparent hover:border-blue-200/70 hover:shadow-[0_4px_10px_rgba(37,99,235,0.04),inset_0_1px_0_#ffffff]",
													isActive
														? "text-blue-700 bg-blue-50/80 border-blue-200/50 shadow-[0_2px_4px_rgba(37,99,235,0.02),inset_0_1px_0_#ffffff]"
														: "text-slate-600 hover:text-slate-800",
												)}
											>
												<item.icon
													className={cn(
														"h-4 w-4 text-slate-400 group-hover:text-blue-650 transition-colors",
														isActive && "text-blue-650",
													)}
												/>
												{item.title}
											</Link>
										);
									})}
								</div>
								<div className="border-t border-slate-100 mt-1 pt-1">
									<form action={signOut}>
										<button
											type="submit"
											onClick={() => setShowMobileMenu(false)}
											className="group flex w-full items-center gap-3 px-3.5 py-2 text-sm font-normal text-rose-500 rounded-xl transition-colors duration-200 ease-out hover:bg-rose-50/85 hover:text-rose-700 border border-transparent hover:border-rose-200/70 hover:shadow-[0_4px_10px_rgba(244,63,94,0.04),inset_0_1px_0_#ffffff] cursor-pointer"
										>
											<LogOut className="h-4 w-4 text-rose-450 group-hover:text-rose-650 transition-colors" />
											Sign out
										</button>
									</form>
								</div>
							</div>

							<button
								type="button"
								onClick={() => setShowMobileMenu(!showMobileMenu)}
								className="t-morph-plus text-slate-650 hover:text-slate-800"
								aria-expanded={showMobileMenu}
							>
								<Plus className="h-5 w-5" />
							</button>
						</div>
					</div>
				</div>
			</header>
		</div>
	);
}
