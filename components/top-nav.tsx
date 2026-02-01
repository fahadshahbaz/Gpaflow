"use client";

import {
	BookOpen,
	ChevronDown,
	GraduationCap,
	LayoutDashboard,
	LogOut,
	Menu,
	Settings,
	TrendingUp,
	X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { signOut } from "@/lib/supabase/auth";
import { cn } from "@/lib/utils";

const navItems = [
	{ title: "Overview", href: "/dashboard", icon: LayoutDashboard },
	{ title: "Semesters", href: "/dashboard/semesters", icon: BookOpen },
	{ title: "Analytics", href: "/dashboard/analytics", icon: TrendingUp },
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

	return (
		<div className="fixed top-6 left-0 right-0 px-4 z-50">
			<header className="px-5">
				<div className="h-14 flex items-center justify-between shrink-0">
					{/* Logo */}
					<Link href="/dashboard" className="flex items-center gap-2.5">
						<div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-600">
							<GraduationCap className="h-5 w-5 text-white" />
						</div>
						<span className="text-lg font-semibold text-gray-900 tracking-tight">
							GPA<span className="text-blue-500">Flow</span>
						</span>
					</Link>

					{/* Desktop Navigation */}
					<nav className="hidden md:flex items-center gap-0.5 bg-white/150 backdrop-blur-sm rounded-full px-1 py-1 shadow-sm">
						{navItems.map((item) => {
							const isActive = pathname === item.href;
							return (
								<Link
									key={item.href}
									href={item.href}
									className={cn(
										"flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all relative",
										isActive
											? "text-gray-900"
											: "text-gray-500 hover:text-gray-900",
									)}
								>
									{isActive && (
										<motion.div
											layoutId="activeTab"
											className="absolute inset-0 bg-white rounded-full shadow-sm"
											transition={{
												type: "spring",
												stiffness: 400,
												damping: 30,
											}}
											style={{ zIndex: -1 }}
										/>
									)}
									{item.title}
								</Link>
							);
						})}
					</nav>

					{/* Right Section */}
					<div className="hidden md:flex items-center gap-0.5 bg-gray-100/80 backdrop-blur-sm rounded-full px-1 py-1">
						{/* Profile Dropdown */}
						<div className="relative">
							<button
								type="button"
								onClick={() => setShowDropdown(!showDropdown)}
								className="flex items-center gap-2 rounded-full p-0.5 pr-2.5 hover:bg-white/80 transition-colors"
							>
								<div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center ring-2 ring-white shadow-sm">
									<span className="text-xs font-semibold text-white">
										{userName?.charAt(0).toUpperCase() ||
											userEmail?.charAt(0).toUpperCase() ||
											"U"}
									</span>
								</div>
								<ChevronDown
									className={cn(
										"h-4 w-4 text-gray-500 transition-transform duration-200",
										showDropdown && "rotate-180",
									)}
								/>
							</button>

							<AnimatePresence>
								{showDropdown && (
									<>
										<button
											type="button"
											className="fixed inset-0 z-[90] cursor-default"
											onClick={() => setShowDropdown(false)}
											aria-label="Close dropdown"
										/>
										<motion.div
											initial={{ opacity: 0, scale: 0.95, y: 10 }}
											animate={{ opacity: 1, scale: 1, y: 0 }}
											exit={{ opacity: 0, scale: 0.95, y: 10 }}
											transition={{ duration: 0.2 }}
											className="absolute right-0 mt-2 w-64 rounded-2xl bg-white shadow-xl border border-gray-100 py-2 z-[100] overflow-hidden"
										>
											<div className="px-4 py-3 border-b border-gray-50 bg-gray-50/50">
												<p className="text-sm font-semibold text-gray-900">
													{userName || "User"}
												</p>
												<p className="text-xs text-gray-500 truncate mt-0.5">
													{userEmail}
												</p>
											</div>
											<div className="p-1.5">
												<Link
													href="/dashboard/settings"
													onClick={() => setShowDropdown(false)}
													className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
												>
													<Settings className="h-4 w-4 text-gray-400" />
													Settings
												</Link>
												<form action={signOut}>
													<button
														type="submit"
														className="flex w-full items-center gap-3 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
													>
														<LogOut className="h-4 w-4" />
														Sign Out
													</button>
												</form>
											</div>
										</motion.div>
									</>
								)}
							</AnimatePresence>
						</div>
					</div>

					{/* Mobile Menu Dropdown */}
					<div className="relative md:hidden">
						<button
							type="button"
							onClick={() => setShowMobileMenu(!showMobileMenu)}
							className="h-9 w-9 flex items-center justify-center rounded-full bg-gray-100/80 text-gray-600 hover:bg-gray-200 transition-colors"
						>
							{showMobileMenu ? (
								<X className="h-5 w-5" />
							) : (
								<Menu className="h-5 w-5" />
							)}
						</button>

						<AnimatePresence>
							{showMobileMenu && (
								<>
									<button
										type="button"
										className="fixed inset-0 z-[90] cursor-default"
										onClick={() => setShowMobileMenu(false)}
										aria-label="Close menu"
									/>
									<motion.div
										initial={{ opacity: 0, scale: 0.95, y: 10 }}
										animate={{ opacity: 1, scale: 1, y: 0 }}
										exit={{ opacity: 0, scale: 0.95, y: 10 }}
										transition={{ duration: 0.2 }}
										className="absolute right-0 mt-2 w-48 rounded-2xl bg-white shadow-xl border border-gray-100 py-2 z-[100] overflow-hidden"
									>
										<div className="p-1.5">
											{navItems.map((item) => {
												const isActive = pathname === item.href;
												return (
													<Link
														key={item.href}
														href={item.href}
														onClick={() => setShowMobileMenu(false)}
														className={cn(
															"flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors",
															isActive
																? "text-blue-600"
																: "text-gray-600 hover:text-gray-900",
														)}
													>
														<item.icon className={cn("h-4 w-4", isActive && "text-blue-500")} />
														{item.title}
													</Link>
												);
											})}
										</div>
										<div className="border-t border-gray-100 p-1.5">
											<form action={signOut}>
												<button
													type="submit"
													onClick={() => setShowMobileMenu(false)}
													className="flex w-full items-center gap-3 px-3 py-2 text-sm font-medium text-red-500 hover:text-red-600 rounded-lg transition-colors"
												>
													<LogOut className="h-4 w-4" />
													Sign out
												</button>
											</form>
										</div>
									</motion.div>
								</>
							)}
						</AnimatePresence>
					</div>
				</div>
			</header>
		</div>
	);
}
