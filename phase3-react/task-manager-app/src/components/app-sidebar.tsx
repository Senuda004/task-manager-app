import * as React from "react"
import { LayoutDashboard, ListChecks, LogOut } from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"

const data = {
  teams: [
    { name: "Acme Inc", logo: LayoutDashboard, plan: "Enterprise" },
    { name: "Acme Corp.", logo: ListChecks, plan: "Startup" },
    { name: "Evil Corp.", logo: LayoutDashboard, plan: "Free" },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Tasks",
      url: "/tasks",
      icon: ListChecks,
      badge: "10",
    },
  ],
}

interface AppSidebarProps {
  onLogout?: () => void
}

export function AppSidebar({
  onLogout,
  ...props
}: AppSidebarProps & React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      className="border-r border-border bg-white text-black dark:bg-zinc-900 dark:text-white dark:border-zinc-700"
      {...props}
    >
      {/* Header with TeamSwitcher and Main Nav */}
      <SidebarHeader className="bg-white dark:bg-zinc-900">
        <TeamSwitcher teams={data.teams} />
        <NavMain items={data.navMain} />
      </SidebarHeader>

      {/* Collapsed sidebar rail (optional) */}
      <SidebarRail className="bg-white dark:bg-zinc-900" />

      {/* Footer with Logout Button */}
      <SidebarFooter className="mt-auto mb-5">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={onLogout} className="bg-gray-700">
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
