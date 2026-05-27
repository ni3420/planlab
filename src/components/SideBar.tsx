"use client"

import React, { useState } from "react";
import { usePathname, useRouter, useParams } from "next/navigation";
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
import { PlusIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import WorkSpaceBar from "@/features/workspace/components/workspace-showbar";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import WorkSpaceForm from "@/features/workspace/components/workspace-form";

const routes = [
  {
    label: "Home",
    href: "",
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
    activeIcon: GoGear,
  },
];

const SideBar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const params = useParams();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const workspaceId = params?.workspaceId as string;

  return (
    <>
      <div className="w-64 h-screen border-r bg-card p-4 flex flex-col justify-between">
        <div className="space-y-4 flex-1">
          <div className="px-3 py-2">
            <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
              Dashboard
            </h2>
            <WorkSpaceBar />
          </div>
          
          <Command className="bg-transparent overflow-visible flex-1">
            <CommandList className="overflow-visible max-h-none">
              <CommandGroup heading="Main Menu" className="text-xs font-bold uppercase tracking-wider text-muted-foreground px-2 mb-2">
                {routes.map((route) => {
                  const targetHref = workspaceId 
                    ? `/workspaces/${workspaceId}${route.href}`
                    : route.href || "/";

                  const isActive = pathname === targetHref;
                  const Icon = isActive ? route.activeIcon : route.icon;

                  return (
                    <CommandItem
                      key={route.label}
                      onSelect={() => router.push(targetHref)}
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

              <CommandGroup heading="Workspaces" className="text-xs font-bold uppercase tracking-wider text-muted-foreground px-2 mt-4">
                <CommandItem
                  onSelect={() => setIsDialogOpen(true)}
                  className="flex items-center justify-between px-4 py-3 rounded-md cursor-pointer text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors mt-1 aria-selected:bg-accent aria-selected:text-accent-foreground"
                >
                  <div className="flex items-center gap-3">
                    <PlusIcon className="h-5 w-5 shrink-0 text-neutral-500" />
                    <span className="font-medium text-sm">Create Workspace</span>
                  </div>
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[480px] p-0 border-none bg-transparent shadow-none">
          <DialogHeader className="hidden">
            <DialogTitle>Create Workspace</DialogTitle>
            <DialogDescription>Workspace definition container</DialogDescription>
          </DialogHeader>
          <WorkSpaceForm />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SideBar;