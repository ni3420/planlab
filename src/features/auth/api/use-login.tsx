import { InferRequestType,InferResponseType } from "hono";
import {client} from "@/lib/rpc"
import { useMutation} from "@tanstack/react-query"

type Response=InferResponseType<typeof client.api.auth.login["$post"]>
type Request=InferRequestType<typeof client.api.auth.login["$post"]>

export const useLogin=()=>{
    const mutation=useMutation<
    Response,
    Error,
    Request
    >({
        mutationFn:async({json})=>{
            const res=await client.api.auth.login["$post"]({json})
            return await res.json()
        }
    
    })
    return mutation
}

