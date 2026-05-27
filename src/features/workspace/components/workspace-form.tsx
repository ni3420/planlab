"use client"

import React, { useRef } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
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
import { Loader2, ImageIcon } from "lucide-react"
import Image from "next/image"
import {workspaceSchema} from "../Schema"
import { useCreateWorkSpace } from "../api/use-createworkspace"



type WorkspaceFormValues = z.infer<typeof workspaceSchema>

export const WorkSpaceForm = () => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const Mutation=useCreateWorkSpace()

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<WorkspaceFormValues>({
    resolver: zodResolver(workspaceSchema),
    defaultValues: {
      name: "",
      image: undefined,
    },
  })

  const imageValue = watch("image")

  const onSubmit = async (values: WorkspaceFormValues) => {
    try {
      Mutation.mutate({form:values},{
        onSuccess:()=>{
            console.log("Workspace created successfully")
        },
        onError:(error)=>{
            console.error("Error creating workspace:", error)
        }
      })

    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Card className="w-full border-neutral-200/80 shadow-sm rounded-2xl bg-white">
      <CardHeader className="space-y-1.5 p-6">
        <CardTitle className="text-xl font-bold tracking-tight text-neutral-900">
          Create a new workspace
        </CardTitle>
        <CardDescription className="text-sm text-neutral-500">
          Workspaces are where you and your team manage files, tasks, and sync in real-time.
        </CardDescription>
      </CardHeader>

      <CardContent className="p-6 pt-0">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex flex-col gap-y-5">
            
            <div className="space-y-2">
              <Label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                Workspace Name
              </Label>
              <Input
                id="name"
                disabled={isSubmitting}
                placeholder="e.g. Production Team, Connect App"
                className="h-11 rounded-xl border-neutral-200 bg-neutral-50/30 focus-visible:ring-neutral-400 focus-visible:bg-white transition-all"
                {...register("name")}
              />
              {errors.name && (
                <p className="text-xs font-medium text-red-500 px-1">{errors.name.message}</p>
              )}
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
                  disabled={isSubmitting}
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) setValue("image", file)
                  }}
                />

                <Avatar className="size-14 border border-neutral-200/80 shadow-inner bg-white">
                  {imageValue ? (
                    <Image
                      src={URL.createObjectURL(imageValue)}
                      alt="Preview"
                      className="object-cover size-full"
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
                    disabled={isSubmitting}
                    variant="outline"
                    className="h-9 px-4 rounded-lg font-semibold text-xs border-neutral-200 hover:bg-white bg-white shadow-sm transition"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    Choose Image
                  </Button>
                  <p className="text-[10px] text-neutral-400 px-1">JPG, PNG or SVG. Max 1MB.</p>
                </div>
              </div>
            </div>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-11 rounded-xl font-semibold bg-neutral-900 text-white hover:bg-neutral-800 active:scale-[0.99] transition shadow-sm flex items-center justify-center gap-x-2"
          >
            {isSubmitting && <Loader2 className="size-4 animate-spin" />}
            <span>{isSubmitting ? "Creating..." : "Create Workspace"}</span>
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default WorkSpaceForm