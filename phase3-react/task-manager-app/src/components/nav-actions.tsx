import * as React from "react"
import {
  ArrowDown,
  ArrowUp,
  Bell,
  Copy,
  CornerUpLeft,
  CornerUpRight,
  FileText,
  GalleryVerticalEnd,
  LineChart,
  Link,
  MoreHorizontal,
  Settings2,
  Star,
  Trash,
  Trash2,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const data = [
  [
    { label: "Customize Page", icon: Settings2 },
    { label: "Turn into wiki", icon: FileText },
  ],
  [
    { label: "Copy Link", icon: Link },
    { label: "Duplicate", icon: Copy },
    { label: "Move to", icon: CornerUpRight },
    { label: "Move to Trash", icon: Trash2 },
  ],
  [
    { label: "Undo", icon: CornerUpLeft },
    { label: "View analytics", icon: LineChart },
    { label: "Version History", icon: GalleryVerticalEnd },
    { label: "Show delete pages", icon: Trash },
    { label: "Notifications", icon: Bell },
  ],
  [
    { label: "Import", icon: ArrowUp },
    { label: "Export", icon: ArrowDown },
  ],
]

export function NavActions() {
  const [isOpen, setIsOpen] = React.useState(false)

  React.useEffect(() => {
    setIsOpen(true)
  }, [])

  return (
    <div className="flex items-center gap-2 text-sm">
      <div className="hidden font-medium text-muted-foreground md:inline-block">
        Edit Oct 08
      </div>
      <Button variant="ghost" size="icon" className="h-7 w-7">
        <Star className="text-foreground dark:text-white" />
      </Button>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 data-[state=open]:bg-accent"
          >
            <MoreHorizontal className="text-foreground dark:text-white" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-56 overflow-hidden rounded-lg p-0 bg-white dark:bg-zinc-900 text-black dark:text-white border border-border dark:border-zinc-700"
          align="end"
        >
          <Sidebar
            collapsible="none"
            className="bg-transparent text-black dark:text-white"
          >
            <SidebarContent>
              {data.map((group, index) => (
                <SidebarGroup
                  key={index}
                  className="border-b border-border dark:border-zinc-700 last:border-none"
                >
                  <SidebarGroupContent className="gap-0">
                    <SidebarMenu>
                      {group.map((item, index) => (
                        <SidebarMenuItem key={index}>
                          <SidebarMenuButton className="hover:bg-accent dark:hover:bg-zinc-800">
                            <item.icon className="text-muted-foreground dark:text-zinc-400" />
                            <span>{item.label}</span>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
              ))}
            </SidebarContent>
          </Sidebar>
        </PopoverContent>
      </Popover>
    </div>
  )
}
