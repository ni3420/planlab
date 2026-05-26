"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LogOut } from "lucide-react"

interface UserButtonProps {
  email?: string;
  avatarUrl?: string;
  onLogout?: () => void;
}

const UserButton = ({ email = "user@example.com", avatarUrl, onLogout }: UserButtonProps) => {
  const fallbackText = email.slice(0, 2).toUpperCase();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="cursor-pointer outline-none">
        <Avatar className="h-9 w-9 border hover:opacity-80 transition">
          <AvatarImage src={avatarUrl} alt={email} />
          <AvatarFallback className="bg-neutral-200 font-medium text-neutral-700">
            {fallbackText}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent align="end" className="w-56 p-2" sideOffset={6}>
        <div className="flex flex-col space-y-1 p-2">
          <p className="text-xs text-muted-foreground font-medium truncate">Logged in as</p>
          <p className="text-sm font-semibold text-foreground truncate">{email}</p>
        </div>
        
        <div className="h-px bg-muted my-1" />
        
        <DropdownMenuItem 
          onClick={onLogout}
          className="text-destructive focus:text-destructive focus:bg-destructive/10 cursor-pointer flex items-center gap-2 font-medium"
        >
          <LogOut className="h-4 w-4" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserButton;