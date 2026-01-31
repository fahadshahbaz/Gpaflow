"use client";

import {
	Award,
	BookOpen,
	GraduationCap,
	LayoutDashboard,
	LogOut,
	Settings,
	Target,
	TrendingUp,
} from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import { signOut } from "@/lib/supabase/auth";

const navItems = [
	{ title: "Overview", href: "/dashboard", icon: LayoutDashboard },
	{ title: "Semesters", href: "/dashboard/semesters", icon: BookOpen },
	{ title: "Analytics", href: "/dashboard/analytics", icon: TrendingUp },
	{ title: "Goals", href: "/dashboard/goals", icon: Target },
	{ title: "Settings", href: "/dashboard/settings", icon: Settings },
];

interface AppSidebarProps {
	userName?: string;
	userEmail?: string;
}

export function AppSidebar({ userName, userEmail }: AppSidebarProps) {
	const pathname = usePathname();

	return (
		<Sidebar className="border-r border-[#2a2a2a] bg-[#0f0f0f]">
			<SidebarHeader className="border-b border-[#2a2a2a] p-5">
				<Link href="/dashboard" className="flex items-center gap-3">
					<motion.div
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-red-500 shadow-lg shadow-orange-500/20"
					>
						<GraduationCap className="h-5 w-5 text-white" />
					</motion.div>
					<div>
						<span className="text-lg font-bold text-white tracking-tight">
							GPA Flow
						</span>
						<p className="text-[10px] text-gray-500 uppercase tracking-widest font-medium">
							Academic Tracker
						</p>
					</div>
				</Link>
			</SidebarHeader>

			<SidebarContent className="px-3 py-6">
				<SidebarGroup>
					<SidebarGroupLabel className="px-3 text-[10px] text-gray-500 uppercase tracking-widest font-semibold mb-3">
						Menu
					</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu className="gap-1">
							{navItems.map((item) => {
								const isActive = pathname === item.href;
								return (
									<SidebarMenuItem key={item.href}>
										<SidebarMenuButton
											asChild
											isActive={isActive}
											className="relative rounded-xl h-11 transition-colors hover:bg-[#1a1a1a] data-[active=true]:bg-transparent"
										>
											<Link
												href={item.href}
												className="flex items-center gap-3 px-3"
											>
												<item.icon
													className={`h-4 w-4 transition-colors ${isActive ? "text-orange-400" : "text-gray-500"}`}
												/>
												<span
													className={`font-medium text-sm transition-colors ${isActive ? "text-white" : "text-gray-400"}`}
												>
													{item.title}
												</span>
												{isActive && (
													<motion.div
														layoutId="active-pill"
														className="absolute inset-0 bg-orange-500/10 rounded-xl border border-orange-500/20 -z-10"
														transition={{
															type: "spring",
															stiffness: 400,
															damping: 30,
														}}
													/>
												)}
											</Link>
										</SidebarMenuButton>
									</SidebarMenuItem>
								);
							})}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>

				{/* Stats Mini Card */}
				<SidebarGroup className="mt-6">
					<SidebarGroupContent>
						<div className="rounded-2xl bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/20 p-4">
							<div className="flex items-center gap-2 mb-3">
								<Award className="h-4 w-4 text-orange-400" />
								<span className="text-xs font-semibold text-white">
									Your Progress
								</span>
							</div>
							<div className="space-y-2">
								<div className="flex items-center justify-between text-xs">
									<span className="text-gray-500">CGPA</span>
									<span className="text-orange-400 font-semibold">3.48</span>
								</div>
								<div className="h-1.5 bg-[#2a2a2a] rounded-full overflow-hidden">
									<div className="h-full w-[87%] bg-gradient-to-r from-orange-500 to-red-500 rounded-full" />
								</div>
								<p className="text-[10px] text-gray-500">87% to 4.0 target</p>
							</div>
						</div>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>

			<SidebarFooter className="p-4">
				<div className="rounded-2xl bg-[#1a1a1a] border border-[#2a2a2a] p-4">
					<div className="flex items-center gap-3 mb-4">
						<div className="h-9 w-9 rounded-full bg-gradient-to-br from-gray-700 to-gray-600 flex items-center justify-center text-xs font-bold text-white">
							{userName?.charAt(0).toUpperCase() ||
								userEmail?.charAt(0).toUpperCase()}
						</div>
						<div className="flex-1 min-w-0">
							<p className="text-xs font-semibold text-white truncate">
								{userName || userEmail?.split("@")[0]}
							</p>
							<p className="text-[10px] text-gray-500 truncate">{userEmail}</p>
						</div>
					</div>
					<form action={signOut}>
						<motion.button
							whileHover={{ scale: 1.02 }}
							whileTap={{ scale: 0.98 }}
							type="submit"
							className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#252525] px-3 py-2.5 text-xs font-medium text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-colors border border-[#2a2a2a]"
						>
							<LogOut className="h-3.5 w-3.5" />
							Sign Out
						</motion.button>
					</form>
				</div>
			</SidebarFooter>
		</Sidebar>
	);
}
