import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";
import { InferResponseType } from "hono";

type InfoResponseType = InferResponseType<typeof client.api.workspace[":workspaceId"]["info"]["$get"], 200>;

export const useGetWorkspaceInfo = (workspaceId: string) => {
  return useQuery<InfoResponseType, Error>({
    queryKey: ["workspace-info", workspaceId],
    queryFn: async () => {
      const res = await client.api.workspace[":workspaceId"]["info"]["$get"]({
        param: { workspaceId },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch workspace info");
      }

      return await res.json();
    },
    enabled: !!workspaceId,
  });
};