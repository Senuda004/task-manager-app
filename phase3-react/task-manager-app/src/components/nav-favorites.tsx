import {
  ArrowUpRight,
  Link,
  MoreHorizontal,
  StarOff,
  Trash2,
} from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

export function NavFavorites({
  favorites,
}: {
  favorites: {
    name: string
    url: string
    emoji: string
  }[]
}) {
  const { isMobile } = useSidebar()

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel className="text-black dark:text-white">
        Favorites
      </SidebarGroupLabel>
      <SidebarMenu>
        {favorites.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton asChild>
              <a
                href={item.url}
                title={item.name}
                className="text-black dark:text-white hover:bg-accent dark:hover:bg-zinc-800"
              >
                <span>{item.emoji}</span>
                <span>{item.name}</span>
              </a>
            </SidebarMenuButton>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuAction showOnHover>
                  <MoreHorizontal className="text-muted-foreground dark:text-zinc-400" />
                  <span className="sr-only">More</span>
                </SidebarMenuAction>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-56 rounded-lg bg-white dark:bg-zinc-900 text-black dark:text-white border border-border dark:border-zinc-700"
                side={isMobile ? "bottom" : "right"}
                align={isMobile ? "end" : "start"}
              >
                <DropdownMenuItem className="hover:bg-accent dark:hover:bg-zinc-800">
                  <StarOff className="text-muted-foreground dark:text-zinc-400" />
                  <span>Remove from Favorites</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="border-border dark:border-zinc-700" />
                <DropdownMenuItem className="hover:bg-accent dark:hover:bg-zinc-800">
                  <Link className="text-muted-foreground dark:text-zinc-400" />
                  <span>Copy Link</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-accent dark:hover:bg-zinc-800">
                  <ArrowUpRight className="text-muted-foreground dark:text-zinc-400" />
                  <span>Open in New Tab</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="border-border dark:border-zinc-700" />
                <DropdownMenuItem className="hover:bg-accent dark:hover:bg-zinc-800">
                  <Trash2 className="text-muted-foreground dark:text-zinc-400" />
                  <span>Delete</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        ))}
        <SidebarMenuItem>
          <SidebarMenuButton className="text-sidebar-foreground/70 dark:text-zinc-400">
            <MoreHorizontal />
            <span>More</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  )
}
