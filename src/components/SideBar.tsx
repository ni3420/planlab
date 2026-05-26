"use client"

import { usePathname, useRouter } from "next/navigation";
import { Command, CommandGroup, CommandItem, CommandList } from "@/components/ui/command";
import { 
  GoHome, 
  GoHomeFill, 
  GoInbox, 
  GoCheckCircle, 
  GoCheckCircleFill, 
  GoGear, 
} from "react-icons/go";
import { RiInboxFill } from "react-icons/ri";
import { HiOutlineUsers, HiUsers } from "react-icons/hi2";
import { cn } from "@/lib/utils";

const routes = [
  {
    label: "Home",
    href: "/",
    icon: GoHome,
    activeIcon: GoHomeFill,
  },
  {
    label: "Tasks",
    href: "/tasks",
    icon: GoCheckCircle,
    activeIcon: GoCheckCircleFill,
  },
  {
    label: "Inbox",
    href: "/inbox",
    icon: GoInbox,
    activeIcon: RiInboxFill,
  },
  {
    label: "Members",
    href: "/members",
    icon: HiOutlineUsers,
    activeIcon: HiUsers,
  },
  {
    label: "Settings",
    href: "/settings",
    icon: GoGear,
    activeIcon: GoHome,
  },
];

const SideBar = () => {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="w-64 h-screen border-r bg-card p-4 flex flex-col justify-between">
      <div className="space-y-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Dashboard
          </h2>
        </div>
        <Command className="bg-transparent overflow-visible">
          <CommandList className="overflow-visible max-h-none">
            <CommandGroup>
              {routes.map((route) => {
                const isActive = pathname === route.href;
                const Icon = isActive ? route.activeIcon : route.icon;

                return (
                  <CommandItem
                    key={route.href}
                    onSelect={() => router.push(route.href)}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-md cursor-pointer transition-colors mt-1 aria-selected:bg-accent aria-selected:text-accent-foreground",
                      isActive ? "bg-accent text-accent-foreground font-medium" : "text-muted-foreground"
                    )}
                  >
                    <Icon className="h-5 w-5 shrink-0" />
                    <span>{route.label}</span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </div>
    </div>
  );
};

export default SideBar;