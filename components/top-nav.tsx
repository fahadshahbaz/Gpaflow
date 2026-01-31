"use client";

import {
	Bell,
	BookOpen,
	ChevronDown,
	GraduationCap,
	LayoutDashboard,
	LogOut,
	Menu,
	Search,
	Settings,
	TrendingUp,
	X,
} from "lucide-react";
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
		<div className="fixed top-6 left-0 right-0 z-50 px-4">
			<header className="max-w-5xl mx-auto bg-white/70 backdrop-blur-md border border-white/20 shadow-sm rounded-full">
				<div className="px-5">
					<div className="flex h-14 items-center justify-between">
						{/* Logo */}
						<Link href="/dashboard" className="flex items-center gap-2.5">
							<div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-600">
								<GraduationCap className="h-5 w-5 text-white" />
							</div>
							<span className="text-lg font-semibold text-gray-900 tracking-tight">
								GPAFlow
							</span>
						</Link>

						{/* Desktop Navigation */}
						<nav className="hidden md:flex items-center gap-1 bg-gray-100/80 rounded-full px-1.5 py-1">
							{navItems.map((item) => {
								const isActive = pathname === item.href;
								return (
									<Link
										key={item.href}
										href={item.href}
										className={cn(
											"flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all",
											isActive
												? "bg-white text-gray-900 shadow-sm"
												: "text-gray-600 hover:text-gray-900",
										)}
									>
										{item.title}
									</Link>
								);
							})}
						</nav>

						{/* Right Section */}
						<div className="flex items-center gap-3">
							{/* Search */}
							<button
								type="button"
								className="hidden sm:flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:text-gray-700 hover:bg-gray-200 transition-colors"
							>
								<Search className="h-5 w-5" />
							</button>

							{/* Notifications */}
							<button
								type="button"
								className="hidden sm:flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:text-gray-700 hover:bg-gray-200 transition-colors relative"
							>
								<Bell className="h-5 w-5" />
								<span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-orange-500" />
							</button>

							{/* Profile Dropdown */}
							<div className="relative">
								<button
									type="button"
									onClick={() => setShowDropdown(!showDropdown)}
									className="flex items-center gap-2 rounded-full p-1 pr-3 bg-gray-100 hover:bg-gray-200 transition-colors"
								>
									<div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center ring-2 ring-white">
										<span className="text-xs font-semibold text-white">
											{userName?.charAt(0).toUpperCase() ||
												userEmail?.charAt(0).toUpperCase() ||
												"U"}
										</span>
									</div>
									<ChevronDown className="h-4 w-4 text-gray-500" />
								</button>

								{showDropdown && (
									<>
										<button
											type="button"
											className="fixed inset-0 z-10 cursor-default"
											onClick={() => setShowDropdown(false)}
											aria-label="Close dropdown"
										/>
										<div className="absolute right-0 mt-2 w-64 rounded-2xl bg-white shadow-lg border border-gray-100 py-2 z-20">
											<div className="px-4 py-3 border-b border-gray-100">
												<p className="text-sm font-semibold text-gray-900">
													{userName || "User"}
												</p>
												<p className="text-xs text-gray-500 truncate">
													{userEmail}
												</p>
											</div>
											<div className="py-1">
												<Link
													href="/dashboard/settings"
													onClick={() => setShowDropdown(false)}
													className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
												>
													<Settings className="h-4 w-4 text-gray-400" />
													Settings
												</Link>
												<form action={signOut}>
													<button
														type="submit"
														className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50"
													>
														<LogOut className="h-4 w-4" />
														Sign Out
													</button>
												</form>
											</div>
										</div>
									</>
								)}
							</div>

							{/* Mobile Menu Button */}
							<button
								type="button"
								onClick={() => setShowMobileMenu(!showMobileMenu)}
								className="md:hidden h-10 w-10 flex items-center justify-center rounded-full bg-gray-100 text-gray-500"
							>
								{showMobileMenu ? (
									<X className="h-5 w-5" />
								) : (
									<Menu className="h-5 w-5" />
								)}
							</button>
						</div>
					</div>
				</div>

				{/* Mobile Menu */}
				{showMobileMenu && (
					<div className="md:hidden border-t border-gray-100 bg-white">
						<nav className="px-4 py-3 space-y-1">
							{navItems.map((item) => {
								const isActive = pathname === item.href;
								return (
									<Link
										key={item.href}
										href={item.href}
										onClick={() => setShowMobileMenu(false)}
										className={cn(
											"flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
											isActive
												? "bg-blue-50 text-blue-600"
												: "text-gray-600 hover:bg-gray-50",
										)}
									>
										<item.icon className="h-5 w-5" />
										{item.title}
									</Link>
								);
							})}
						</nav>
					</div>
				)}
			</header>
		</div>
	);
}
