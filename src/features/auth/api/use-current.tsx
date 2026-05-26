import { client } from "@/lib/rpc"
import { useQuery } from "@tanstack/react-query"

export const useCurrent=()=>{
    const query=useQuery({
        queryKey:["current"],
        queryFn:async()=>{
            const res=await client.api.auth.current["$get"]()
            if(!res)
            {
                return null
            }
            return res.json()

        }

    })
    return query
}