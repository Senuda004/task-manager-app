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
    isActive?: boolean
  }[]
}) {
  return (
    <SidebarMenu className="bg-sidebar text-sidebar-foreground">
      {items.map((item) => (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton
            asChild
            isActive={item.isActive}
            data-active={item.isActive ? "true" : undefined}
            className={`
              group w-full flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors
              data-[active=true]:bg-[hsl(var(--sidebar-accent)/0.2)] data-[active=true]:text-[#C1F17E] 
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
      ))}
    </SidebarMenu>
  )
}
