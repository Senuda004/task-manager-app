import { useLocation } from "react-router-dom"
import { type LucideIcon } from "lucide-react"

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon: LucideIcon
    isActive?: boolean // Optional override
  }[]
}) {
  const location = useLocation()

  return (
    <SidebarMenu className="bg-sidebar text-sidebar-foreground">
      {items.map((item) => {
        const isActive = location.pathname === item.url

        return (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton
              asChild
              data-active={isActive ? "true" : undefined}
              className={`
                group w-full flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors
                data-[active=true]:bg-[hsl(var(--sidebar-accent)/0.2)]
                data-[active=true]:text-[#C1F17E]
                hover:bg-muted hover:text-white text-gray-300
              `}
            >
              <a href={item.url} className="flex items-center gap-2 w-full">
                <item.icon
                  className="w-5 h-5 text-gray-400 group-data-[active=true]:text-sidebar-accent-foreground"
                />
                <span>{item.title}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        )
      })}
    </SidebarMenu>
  )
}
