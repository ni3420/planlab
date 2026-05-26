import {createMiddleware} from "hono/factory"
import { getCookie } from "hono/cookie"
import { Client } from "node-appwrite"
import { conf } from "@/conf/conf"
import {Account,Databases,Storage,Models} from 'node-appwrite'

export type AppWriteVariablesType={
    account:Account,
    database:Databases,
    storage:Storage,
    user:Models.User<Models.Preferences>
}


export const middleware=createMiddleware(async(c,next)=>{
    const client=new Client()
    .setEndpoint(conf.appwrite_url)
    .setProject(conf.appwrite_project_id)

    const session=getCookie(c,"token")
    if(!session)
    {
        return c.json({error:"unauthorized"})
    }

    client.setSession(session)

    const account=new Account(client)
    const database=new Databases(client)
    const storage=new Storage(client)
    const user=await account.get()

    c.set("account",account)
    c.set("database",database)
    c.set("storage",storage)
    c.set("user",user)

    await next()


})