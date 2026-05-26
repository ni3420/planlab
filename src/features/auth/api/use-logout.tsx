import {client} from "@/lib/rpc"
import { useQueryClient, useMutation} from "@tanstack/react-query"
import { InferResponseType } from "hono/client"

type Response=InferResponseType<typeof client.api.auth.logout["$post"]>

export const useLogout=()=>{
    const queryclient=useQueryClient()
    const mutation=useMutation<
    Response,
    Error
    >({
        mutationFn:async()=>{
            const res=await client.api.auth.logout["$post"]({})
            return await res.json()
        },
        onSuccess:()=>{
            queryclient.invalidateQueries({queryKey:["current"]})
        }
    
    })
    return mutation
}

