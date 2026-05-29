import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/rpc";
import { InferRequestType, InferResponseType } from "hono";

 type ResetInviteCodeResponse = InferResponseType<typeof client.api.workspace[":workspaceId"]["resetInviteCode"]["$post"], 200>;

 type ResetInviteCodeRequest = InferRequestType<typeof client.api.workspace[":workspaceId"]["resetInviteCode"]["$post"]>;


export const useResetInviteCode = () => {
  const queryClient = useQueryClient();

  return useMutation<ResetInviteCodeResponse, Error, ResetInviteCodeRequest>({
    mutationFn: async ({ param }) => {
      const res = await client.api.workspace[":workspaceId"]["resetInviteCode"]["$post"]({
        param,
      });

      if (!res.ok) {
        throw new Error("Failed to reset invite code");
      }

      return await res.json();
    },
  });
};