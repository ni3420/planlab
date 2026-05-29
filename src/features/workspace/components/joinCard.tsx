"use client"

import React, { useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Loader2, ImageIcon } from "lucide-react"
import Image from "next/image"

import { useGetWorkspaceInfo } from "@/features/workspace/api/use-getWoekpaceInfo"
import { useJoinWorkspace } from "@/features/workspace/api/use-joinWorkspace"
import { useCurrent } from "@/features/auth/api/use-current"

export const JoinCard = () => {
  const params = useParams()
  const router = useRouter()

  const workspaceId = params?.workspaceId as string
  const inviteCode = params?.invitecode as string

  const { data: user, isLoading: isLoadingUser } = useCurrent()
  const { data: workspaceData, isLoading: isLoadingWorkspace } = useGetWorkspaceInfo(workspaceId)
  const { mutate: joinWorkspace, isPending: isJoining } = useJoinWorkspace()

  const currentWorkspace = workspaceData?.workspace

  useEffect(() => {
    if (!isLoadingUser && !user) {
      const currentUrl = window.location.pathname
      router.push(`/sign-up?redirect=${encodeURIComponent(currentUrl)}`)
    }
  }, [user, isLoadingUser, router])

  const handleJoin = async () => {
    console.log("handleSubmit")
    console.log({workspaceId,inviteCode})
    if (!workspaceId || !inviteCode) return


    try {
      const data = joinWorkspace({
        param: { workspaceId },
        json: { inviteCode }
      })

      const targetId = data?.workspaceId || data?.$id || workspaceId
      router.push(`/workspaces/${targetId}`)
    } catch (error) {
      console.error(error)
    }
  }

  const handleCancel = () => {
    if (user) {
      router.push("/")
    } else {
      router.push("/sign-up")
    }
  }

  if (isLoadingUser || isLoadingWorkspace) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-neutral-50">
        <Loader2 className="size-6 animate-spin text-neutral-500" />
      </div>
    )
  }

  if (!currentWorkspace) {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center bg-neutral-50 space-y-2">
        <p className="text-sm text-neutral-500 font-medium">Workspace not found or link expired</p>
        <button type="button" onClick={handleCancel} className="text-xs text-neutral-900 underline">
          Back
        </button>
      </div>
    )
  }

  return (
    <Card className="w-full max-w-md border-neutral-200/80 shadow-md rounded-2xl bg-white p-2">
      <CardHeader className="space-y-4 flex flex-col items-center text-center pt-6">
        <Avatar className="size-20 border border-neutral-200 shadow-sm bg-white rounded-2xl">
          {currentWorkspace.imageUrl || currentWorkspace.image ? (
            <Image
              src={currentWorkspace.imageUrl || currentWorkspace.image}
              alt="Workspace logo"
              className="object-cover size-full rounded-2xl"
              loading="eager"
              width={80}
              height={80}
            />
          ) : (
            <AvatarFallback className="bg-neutral-50 text-neutral-400 rounded-2xl">
              <ImageIcon className="size-8" />
            </AvatarFallback>
          )}
        </Avatar>

        <div className="space-y-1.5">
          <CardTitle className="text-2xl font-bold tracking-tight text-neutral-900">
            Join Workspace
          </CardTitle>
          <CardDescription className="text-sm text-neutral-500 max-w-[280px]">
            You have been invited to join <span className="font-semibold text-neutral-800">{currentWorkspace.name}</span> workspace.
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col p-4 pt-2 items-center gap-y-3">
        <Button
          type="button"
          variant="outline"
          disabled={isJoining}
          onClick={handleCancel}
          className="w-full h-11 rounded-xl font-semibold text-neutral-700 border-neutral-200 hover:bg-neutral-50 transition shadow-none"
        >
          Cancel
        </Button>
        
        <Button
          type="button"
          disabled={isJoining}
          onClick={handleJoin}
          className="w-full h-11 rounded-xl font-semibold bg-neutral-900 text-white hover:bg-neutral-800 active:scale-[0.99] transition flex items-center justify-center gap-x-2 shadow-sm"
        >
          {isJoining && <Loader2 className="size-4 animate-spin" />}
          <span>{isJoining ? "Joining..." : "Join Workspace"}</span>
        </Button>
      </CardContent>
    </Card>
  )
}

export default JoinCard