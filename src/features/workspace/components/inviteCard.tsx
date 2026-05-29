"use client"

import React, { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, Copy, Check, RefreshCw } from "lucide-react"
import { toast } from "sonner"

interface WorkspaceInviteCardProps {
  workspaceId: string
  inviteCode: string
  onReset: () => void
  isResetting: boolean
}

export const WorkspaceInviteCard = ({
  workspaceId,
  inviteCode,
  onReset,
  isResetting
}: WorkspaceInviteCardProps) => {
  const [copied, setCopied] = useState(false)

  const fullInviteUrl = typeof window !== "undefined"
    ? `${window.location.origin}/workspaces/${workspaceId}/join/${inviteCode}`
    : ""

  const handleCopy = async () => {
    if (!fullInviteUrl || !inviteCode) return
    try {
      await navigator.clipboard.writeText(fullInviteUrl)
      setCopied(true)
      toast.success("Invite link copied")
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      toast.error("Failed to copy link")
    }
  }

  return (
    <Card className="w-full border-neutral-200/80 shadow-sm rounded-2xl bg-white">
      <CardHeader className="space-y-1.5 p-6">
        <CardTitle className="text-xl font-bold tracking-tight text-neutral-900">
          Invite Members
        </CardTitle>
        <CardDescription className="text-sm text-neutral-500">
          Use the link below to invite members to your workspace.
        </CardDescription>
      </CardHeader>

      <CardContent className="p-6 pt-0 space-y-6">
        <div className="space-y-2">
          <Label className="text-xs font-bold uppercase tracking-wider text-neutral-500">
            Invite Link
          </Label>
          <div className="flex items-center gap-x-2">
            <Input
              readOnly
              value={inviteCode ? fullInviteUrl : "No active invite link"}
              className="h-11 rounded-xl border-neutral-200 bg-neutral-50/50 focus-visible:ring-0 focus-visible:ring-offset-0 select-all font-mono text-xs text-neutral-600 shadow-none"
            />
            <Button
              type="button"
              variant="outline"
              onClick={handleCopy}
              disabled={!inviteCode || isResetting}
              className="h-11 px-4 rounded-xl border-neutral-200 hover:bg-neutral-50 bg-white shadow-sm flex-shrink-0 transition"
            >
              {copied ? (
                <Check className="size-4 text-emerald-600" />
              ) : (
                <Copy className="size-4 text-neutral-500" />
              )}
            </Button>
          </div>
        </div>

        <div className="pt-4 border-t border-neutral-100 flex items-center justify-between gap-x-4">
          <div className="flex flex-col space-y-0.5">
            <h4 className="text-sm font-semibold text-neutral-800">Reset Invite Link</h4>
            <p className="text-xs text-neutral-400">
              Generate a completely new link and expire the current one.
            </p>
          </div>
          <Button
            type="button"
            variant="destructive"
            onClick={onReset}
            disabled={isResetting || !inviteCode}
            className="h-10 px-4 rounded-xl font-semibold text-xs transition flex items-center gap-x-2 bg-red-50 text-red-600 hover:bg-red-100 border border-red-200/50 shadow-none flex-shrink-0"
          >
            {isResetting ? (
              <Loader2 className="size-3.5 animate-spin" />
            ) : (
              <RefreshCw className="size-3.5" />
            )}
            Reset Link
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default WorkspaceInviteCard