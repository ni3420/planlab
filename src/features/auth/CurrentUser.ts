import { conf } from "@/conf/conf"
import { cookies } from "next/headers"
import { Account, Client } from "node-appwrite"

export const getCurrentUser=async()=>{
  try {
      const client=new Client()
      .setEndpoint(conf.appwrite_url)
      .setProject(conf.appwrite_project_id)
  
      const session= (await cookies()).get("token")
      if(!session) return null
      client.setSession(session.value)
      const account=new Account(client)
      return await account.get()
  } catch (error) {
    console.log(error)
    return null
    
  }

}