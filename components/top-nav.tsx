"use client";

import {
	BookOpen,
	ChevronDown,
	LayoutDashboard,
	LogOut,
	Menu,
	Settings,
	X,
} from "lucide-react";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
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
	const [isDropdownClosing, setIsDropdownClosing] = useState(false);
	const [isMobileOpen, setIsMobileOpen] = useState(false);
	const [hidden, setHidden] = useState(false);

	const toggleDropdown = () => {
		if (showDropdown) {
			setShowDropdown(false);
			setIsDropdownClosing(true);
			setTimeout(() => {
				setIsDropdownClosing(false);
			}, 150);
		} else {
			setIsDropdownClosing(false);
			setShowDropdown(true);
		}
	};

	const closeDropdown = useCallback(() => {
		setShowDropdown((prev) => {
			if (prev) {
				setIsDropdownClosing(true);
				setTimeout(() => {
					setIsDropdownClosing(false);
				}, 150);
				return false;
			}
			return prev;
		});
	}, []);
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
				closeDropdown();
				setIsMobileOpen(false);
			} else if (!scrollingDown) {
				setHidden(false);
			}

			lastScrollY.current = currentScrollY;
		};

		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	}, [closeDropdown]);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			const target = event.target as Node;
			if (dropdownRef.current && !dropdownRef.current.contains(target)) {
				closeDropdown();
			}
			if (mobileMenuRef.current && !mobileMenuRef.current.contains(target)) {
				setIsMobileOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [closeDropdown]);

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

	// biome-ignore lint/correctness/useExhaustiveDependencies: must re-run on pathname change to reposition the sliding pill
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
				hidden ? "-translate-y-[calc(100%+2rem)]" : "translate-y-0",
			)}
			style={{
				top: "calc(1rem + var(--banner-offset, 0px))",
			}}
		>
			<header className="max-w-400 mx-auto w-full relative">
				<div
					ref={mobileMenuRef}
					className={cn(
						"t-acc w-full max-w-md mx-auto md:max-w-none bg-white md:bg-transparent md:backdrop-blur-none border border-slate-200/50 md:border-transparent rounded-2xl md:rounded-none transition-[background-color,border-color,border-radius,box-shadow,translate,transform] duration-300 ease-out flex flex-col md:flex-row md:items-center md:justify-between md:h-15 overflow-hidden md:overflow-visible",
						isMobileOpen
							? "shadow-[0_24px_48px_-12px_rgba(15,23,42,0.15),0_12px_24px_-8px_rgba(15,23,42,0.1),inset_0_1px_0_#ffffff] translate-y-1"
							: "shadow-[0_8px_30px_rgba(15,23,42,0.03),inset_0_1px_0_#ffffff] md:shadow-none",
					)}
					data-open={isMobileOpen}
				>
					{/* Top Row: Logo & Mobile Trigger always visible on mobile, Full Row on Desktop */}
					<div className="h-15 flex items-center justify-between shrink-0 w-full px-4 md:px-0">
						{/* Logo */}
						<Logo size="sm" href="/dashboard" />

						{/* Right Section - Grouped Navigation & Profile */}
						<div className="hidden md:flex items-center gap-4">
							{/* Desktop Navigation */}
							<nav
								ref={tabsRef}
								className="t-tabs flex items-center gap-1.5 transition-all duration-500 ease-out rounded-full p-1 bg-slate-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_2px_8px_rgba(0,0,0,0.03)]"
							>
								<span
									ref={pillRef}
									className="t-tabs-pill bg-white rounded-full shadow-[0_2px_4px_rgba(0,0,0,0.04),inset_0_1px_0_#ffffff]"
									aria-hidden="true"
								/>
								{navItems.map((item) => {
									const isActive = pathname === item.href;
									return (
										<Link
											key={item.href}
											href={item.href}
											prefetch={true}
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
							<div className="flex items-center transition-all duration-500 ease-out rounded-full p-1 h-12 bg-slate-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_2px_8px_rgba(0,0,0,0.03)]">
								<div className="relative" ref={dropdownRef}>
									<button
										type="button"
										onClick={toggleDropdown}
										className="flex items-center gap-2 rounded-full pl-1 pr-3 h-10 bg-white shadow-[0_2px_4px_rgba(0,0,0,0.04),inset_0_1px_0_#ffffff] transition-[transform] duration-200 ease-out active:scale-[0.97] cursor-pointer"
									>
										<div className="h-8 w-8 rounded-full bg-gradient-to-b from-blue-400 to-blue-600 flex items-center justify-center shadow-[0_2px_4px_rgba(37,99,235,0.1)] flex-shrink-0 overflow-hidden">
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

									{(showDropdown || isDropdownClosing) && (
										<div
											data-origin="top-right"
											className={cn(
												"t-dropdown absolute right-0 mt-3 w-64 rounded-[1.25rem] bg-white border border-slate-200/80 shadow-[0_16px_36px_-8px_rgba(0,0,0,0.08),0_4px_12px_-2px_rgba(0,0,0,0.03),inset_0_1px_0_#ffffff] pb-2 z-[100] overflow-hidden",
												showDropdown && "is-open",
												isDropdownClosing && "is-closing",
											)}
										>
											<div className="px-4.5 py-4 border-b border-slate-100 bg-slate-50/40">
												<p className="text-sm font-extrabold text-slate-800 leading-tight">
													{userName || "User"}
												</p>
											</div>
											<div className="p-1.5 space-y-0.5">
												<Link
													href="/dashboard/settings"
													prefetch={true}
													onClick={closeDropdown}
													className="group flex items-center gap-3 px-3.5 py-2.5 text-sm font-normal text-slate-600 hover:text-slate-800 hover:bg-slate-50 rounded-xl transition-colors duration-200 ease-out"
												>
													<Settings className="h-4 w-4 text-slate-400 group-hover:text-slate-600 transition-colors" />
													Settings
												</Link>
												<form action={signOut}>
													<button
														type="submit"
														className="group flex w-[calc(100%-1px)] items-center gap-3 px-3.5 py-2.5 text-sm font-normal text-rose-500 hover:text-rose-600 hover:bg-rose-50/50 rounded-xl transition-colors duration-200 ease-out cursor-pointer"
													>
														<LogOut className="h-4 w-4 text-rose-450 group-hover:text-rose-600 transition-colors" />
														Sign Out
													</button>
												</form>
											</div>
										</div>
									)}
								</div>
							</div>
						</div>

						<div className="md:hidden flex items-center">
							<button
								type="button"
								onClick={() => setIsMobileOpen(!isMobileOpen)}
								className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-650 hover:text-slate-900 hover:bg-slate-100/50 transition-all duration-200 active:scale-90 cursor-pointer"
								aria-expanded={isMobileOpen}
								aria-label="Toggle navigation menu"
							>
								{isMobileOpen ? (
									<X className="h-5 w-5 animate-in fade-in zoom-in-75 duration-150" />
								) : (
									<Menu className="h-5 w-5 animate-in fade-in zoom-in-75 duration-150" />
								)}
							</button>
						</div>
					</div>

					{/* Mobile Menu Drawer (Inline Accordion Expansion) */}
					<div className="t-acc-panel md:hidden w-full">
						<div className="t-acc-panel-inner w-full">
							<div className="px-4 pb-4.5 border-t border-slate-100/90 mt-1.5 pt-3.5 flex flex-col gap-1.5">
								{navItems.map((item) => {
									const isActive = pathname === item.href;
									return (
										<Link
											key={item.href}
											href={item.href}
											prefetch={true}
											onClick={() => setIsMobileOpen(false)}
											className={cn(
												"group flex items-center gap-3 px-3.5 py-2.5 text-sm font-normal rounded-xl transition-colors duration-200 ease-out mx-0.5",
												isActive
													? "text-blue-700 bg-blue-50/80"
													: "text-slate-600 hover:text-slate-800 hover:bg-slate-50",
											)}
										>
											<item.icon
												className={cn(
													"h-4 w-4 text-slate-400 group-hover:text-slate-600 transition-colors",
													isActive && "text-blue-600",
												)}
											/>
											{item.title}
										</Link>
									);
								})}
								<div className="border-t border-slate-100 mt-2.5 pt-2.5">
									<form action={signOut}>
										<button
											type="submit"
											onClick={() => setIsMobileOpen(false)}
											className="group flex w-full items-center gap-3 px-3.5 py-2.5 text-sm font-normal text-rose-500 hover:text-rose-600 hover:bg-rose-50/50 rounded-xl transition-colors duration-200 ease-out cursor-pointer"
										>
											<LogOut className="h-4 w-4 text-rose-450 group-hover:text-rose-600 transition-colors" />
											Sign out
										</button>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			</header>
		</div>
	);
}
