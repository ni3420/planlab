"use client"

import React, { useMemo } from "react"
import { useRouter, useParams } from "next/navigation"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Loader2 } from "lucide-react"
import { useGetWorkSpaces } from "../api/use-getWorkSpaces"
import Image from "next/image"

interface WorkspaceDocument {
  $id: string;
  name: string;
  userId: string;
  image?: string;
  imageUrl?: string;
  $createdAt: string;
}

interface WorkSpacesType {
  workSPaces?: {
    documents: WorkspaceDocument[];
    total: number;
  };
}

export const WorkSpaceBar = () => {
  const router = useRouter()
  const params = useParams()
  const { data, isLoading } = useGetWorkSpaces()
  console.log(data)
  
  const workspaces = data as WorkSpacesType
  const activeWorkspaceId = params?.workspaceId as string || ""

  const documents = useMemo(() => {
    return (workspaces as WorkSpacesType)?.workSPaces?.documents || [];
  }, [workspaces]);

  const onSelect = (id: string) => {
    router.push(`/workspaces/${id}`)
  }

  return (
    <Select 
      value={activeWorkspaceId} 
      onValueChange={onSelect}
      disabled={isLoading}
    >
      <SelectTrigger className="w-full bg-white h-12 rounded-xl border-neutral-200 shadow-sm focus:ring-1 focus:ring-neutral-400 gap-x-3 px-3">
        <SelectValue placeholder={isLoading ? "Loading..." : "Select a workspace"} />
      </SelectTrigger>
      
      <SelectContent className="rounded-xl shadow-lg min-w-[200px]">
        <SelectGroup>
          {isLoading ? (
            <div className="flex items-center justify-center p-4">
              <Loader2 className="size-4 animate-spin text-neutral-500" />
            </div>
          ) : documents.length === 0 ? (
            <div className="text-xs text-neutral-400 text-center p-3 font-medium">
              No workspaces found
            </div>
          ) : (
            documents.map((workspace: WorkspaceDocument) => {
              const currentImage = workspace.imageUrl || workspace.image;
              
              return (
                <SelectItem 
                  key={workspace.$id} 
                  value={workspace.$id}
                  className="cursor-pointer rounded-xl mx-1 my-0.5 focus:bg-neutral-100 p-2"
                >
                  <div className="flex items-center gap-x-3">
                    <Avatar className="size-9 border border-neutral-200/80 rounded-xl shadow-sm bg-neutral-100 flex-shrink-0">
                      {currentImage ? (
                        <Image
                          src={currentImage}
                          alt={workspace.name}
                          width={36}
                          height={36}
                          className="object-cover size-full rounded-xl"
                        />
                      ) : (
                        <AvatarFallback className="bg-gradient-to-br from-neutral-800 to-neutral-950 text-white text-sm font-bold uppercase rounded-xl size-full flex items-center justify-center">
                          {workspace.name.charAt(0)}
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <span className="truncate font-semibold text-sm text-neutral-800">
                      {workspace.name}
                    </span>
                  </div>
                </SelectItem>
              );
            })
          )}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default WorkSpaceBar