"use client"

import React, { useRef, useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Loader2, ImageIcon, ArrowLeft } from "lucide-react"
import Image from "next/image"

import { useGetWorkspace } from "../api/use-getworkspaceUsingId"
import { useEditWorkspace } from "../api/use-editworkspace"
import { useResetInviteCode } from "../api/use-resetInviteCode" // सुनिश्चित करें कि यह हुक मौजूद है
import WorkspaceInviteCard from "./inviteCard"
import { Workspace } from "../types"

export const EditWorkspace = () => {
  const params = useParams()
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  const workspaceId = params?.workspaceId as string

  const { data: workspaceData, isLoading: isLoadingWorkspace } = useGetWorkspace(workspaceId)
  const Mutation = useEditWorkspace()
  const { mutate: resetInvite, isPending: isResettingCode } = useResetInviteCode()

const currentWorkspace: Workspace | undefined = workspaceData && "workspace" in workspaceData 
  ? (workspaceData.workspace as Workspace) 
  : undefined;

const { handleSubmit, register } = useForm({
  values: {
    name: currentWorkspace?.name || "",
  }
})

const [imagePreview, setImagePreview] = useState<string | null>(null)
const [selectedFile, setSelectedFile] = useState<File | null>(null)

if (currentWorkspace && imagePreview === null && !selectedFile) {
  const currentImg =currentWorkspace.image
  if (currentImg) {
    setImagePreview(currentImg)
  }
}
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      setImagePreview(URL.createObjectURL(file))
    }
  }

  const handleSubmitButton = (data: { name: string }) => {
    if (!data.name.trim()) return

    Mutation.mutate({
      param: { workspaceId },
      form: {
        name: data.name.trim(),
        image: selectedFile || undefined,
      },
    })
  }

  const handleResetInviteLink = () => {
    resetInvite({ param: { workspaceId } })
  }

  if (isLoadingWorkspace) {
    return (
      <div className="w-full h-[400px] flex items-center justify-center">
        <Loader2 className="size-6 animate-spin text-neutral-500" />
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={() => router.back()}
        className="text-neutral-500 hover:text-neutral-800 gap-x-2 rounded-xl"
      >
        <ArrowLeft className="size-4" />
        Back
      </Button>

      <Card className="w-full border-neutral-200/80 shadow-sm rounded-2xl bg-white">
        <CardHeader className="space-y-1.5 p-6">
          <CardTitle className="text-xl font-bold tracking-tight text-neutral-900">
            Workspace Settings
          </CardTitle>
          <CardDescription className="text-sm text-neutral-500">
            Edit your workspace name or change your organization icon.
          </CardDescription>
        </CardHeader>

        <CardContent className="p-6 pt-0">
          <form onSubmit={handleSubmit(handleSubmitButton)} className="space-y-6">
            <div className="flex flex-col gap-y-5">
              
              <div className="space-y-2">
                <Label htmlFor="edit-name" className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                  Workspace Name
                </Label>
                <Input
                  id="edit-name"
                  type="text"
                  disabled={Mutation.isPending}
                  placeholder="Workspace Name"
                  className="h-11 rounded-xl border-neutral-200 bg-neutral-50/30 focus-visible:ring-neutral-400 focus-visible:bg-white transition-all shadow-none"
                  {...register("name", { required: true })}
                />
              </div>

              <div className="space-y-2">
                <Label className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                  Workspace Icon
                </Label>
                <div className="flex items-center gap-x-4 bg-neutral-50/50 p-3 rounded-xl border border-neutral-100">
                  <input
                    type="file"
                    className="hidden"
                    accept=".jpg, .jpeg, .png, .svg"
                    ref={fileInputRef}
                    disabled={Mutation.isPending}
                    onChange={handleFileChange}
                  />

                  <Avatar className="size-14 border border-neutral-200/80 shadow-inner bg-white rounded-xl">
                    {imagePreview ? (
                      <Image
                        src={imagePreview}
                        alt="Workspace preview"
                        className="object-cover size-full rounded-xl"
                        width={56}
                        height={56}
                      />
                    ) : (
                      <AvatarFallback className="bg-transparent text-neutral-400">
                        <ImageIcon className="size-5.5" />
                      </AvatarFallback>
                    )}
                  </Avatar>

                  <div className="flex flex-col gap-y-1">
                    <Button
                      type="button"
                      variant="outline"
                      disabled={Mutation.isPending}
                      className="h-9 px-4 rounded-lg font-semibold text-xs border-neutral-200 hover:bg-white bg-white shadow-sm transition"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      Change Image
                    </Button>
                    <p className="text-[10px] text-neutral-400 px-1">JPG, PNG or SVG. Max 1MB.</p>
                  </div>
                </div>
              </div>
            </div>

            <Button
              type="submit"
              disabled={Mutation.isPending}
              className="w-full h-11 rounded-xl font-semibold bg-neutral-900 text-white hover:bg-neutral-800 active:scale-[0.99] transition shadow-sm flex items-center justify-center gap-x-2"
            >
              {Mutation.isPending && <Loader2 className="size-4 animate-spin" />}
              <span>{Mutation.isPending ? "Saving changes..." : "Save Changes"}</span>
            </Button>
          </form>
        </CardContent>
      </Card>

      {currentWorkspace && currentWorkspace.$id && (
        <WorkspaceInviteCard 
          workspaceId={currentWorkspace.$id} 
          inviteCode={currentWorkspace.inviteCode || ""} 
          onReset={handleResetInviteLink}
          isResetting={isResettingCode}
        />
      )}
    </div>
  )
}

export default EditWorkspace