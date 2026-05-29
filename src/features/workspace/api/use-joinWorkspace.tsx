import { client } from "@/lib/rpc";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

export type JoinWorkspaceResponse = InferResponseType<
  typeof client.api.workspace[":workspaceId"]["join"]["$post"],
  200
>;

export type JoinWorkspaceRequest = InferRequestType<
  typeof client.api.workspace[":workspaceId"]["join"]["$post"]
>;

export const useJoinWorkspace = () => {
  const queryClient = useQueryClient();

  return useMutation<
    JoinWorkspaceResponse,
    Error,
    JoinWorkspaceRequest
  >({
    mutationFn: async ({ param, json }) => {
      const res = await client.api.workspace[":workspaceId"]["join"]["$post"]({
        param,
        json,
      });

      if (!res.ok) {
        throw new Error("Failed to join workspace");
      }

      return await res.json();
    },
    onSuccess: (data) => {
      toast.success("Successfully joined the workspace");
      queryClient.invalidateQueries({ queryKey: ["workspaces"] });
      
      if (data && "workspaceId" in data) {
        queryClient.invalidateQueries({ queryKey: ["workspace", data.workspaceId] });
        queryClient.invalidateQueries({ queryKey: ["members", data.workspaceId] });
      }
    },
    onError: (error) => {
      toast.error(error.message || "Failed to join the workspace");
    },
  });
};