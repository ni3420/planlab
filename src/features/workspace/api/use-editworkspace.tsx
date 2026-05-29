import { client } from "@/lib/rpc";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

type Response = InferResponseType<typeof client.api.workspace[":workspaceId"]["$patch"], 200>;
type Request = InferRequestType<typeof client.api.workspace[":workspaceId"]["$patch"]>;

export const useEditWorkspace = () => {
  const queryClient = useQueryClient();

  const Mutation = useMutation<Response, Error, Request>({
    mutationFn: async ({ param, form }) => {
      const res = await client.api.workspace[":workspaceId"]["$patch"]({ 
        param, 
        form 
      });

      if (!res.ok) {
        throw new Error("Failed to update workspace");
      }

      return await res.json();
    },
    onSuccess: (data) => {
      toast.success("Workspace updated successfully");
      queryClient.invalidateQueries({ queryKey: ["workspaces"] });
      
      if (data && "workspace" in data && data.workspace?.$id) {
        queryClient.invalidateQueries({ queryKey: ["workspace", data.workspace.$id] });
      }
    },
    onError: () => {
      toast.error("Failed to update the workspace");
    },
  });

  return Mutation;
};