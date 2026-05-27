import { client } from "@/lib/rpc";
import {toast} from "sonner"
import { useMutation ,useQueryClient} from "@tanstack/react-query";
import { InferRequestType,InferResponseType } from "hono";

type Response=InferResponseType<typeof client.api.workspace["$post"]>
type Request=InferRequestType<typeof client.api.workspace["$post"]>

export const useCreateWorkSpace=()=>{
    const queryClient=useQueryClient()
    const Mutation=useMutation<
    Response,
    Error,
    Request
    >({
        mutationFn:async({form})=>{
            const res=await client.api.workspace["$post"]({form})
            return await res.json()
        },
        onSuccess:()=>{
            toast.success("workspace created")
            queryClient.invalidateQueries({queryKey:["workspaces"]})
        },
        onError:()=>
            toast.error("do not Created the workspace")
    })
    return Mutation
}