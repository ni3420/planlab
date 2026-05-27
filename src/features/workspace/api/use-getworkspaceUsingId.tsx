import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";
import { InferResponseType } from "hono";

type ResponseType = InferResponseType<typeof client.api.workspace[":workspaceId"]["$get"], 200>;

export const useGetWorkspace = (workspaceId: string) => {
  return useQuery<ResponseType, Error>({
    queryKey: ["workspace", workspaceId],
    queryFn: async () => {
      const res = await client.api.workspace[":workspaceId"]["$get"]({
        param: { workspaceId },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch workspace details");
      }

      const data = await res.json();
      return data as ResponseType;
    },
    enabled: !!workspaceId,
  });
};