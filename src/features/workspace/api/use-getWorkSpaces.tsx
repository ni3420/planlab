import { InferResponseType } from "hono";
import {client} from "@/lib/rpc"
import { useQuery } from "@tanstack/react-query";

type Response=InferResponseType<typeof client.api.workspace["$get"]>

export const useGetWorkSpaces=()=>{
    const query=useQuery<Response,Error>({
        queryKey:["workspaces"],
        queryFn:async()=>{
            const res=await client.api.workspace["$get"]()
            return await res.json()
        }
    })
    return query
}