import { zValidator } from "@hono/zod-validator"
import {Hono} from "hono"
import { workspaceSchema } from "../Schema"
import { middleware } from "@/appwrite/middleware"
import { AppWriteVariablesType } from "@/appwrite/middleware"
import { conf } from "@/conf/conf"
import { ID } from "node-appwrite"
const app=new Hono<{Variables:AppWriteVariablesType}>()
.post("/",zValidator("json",workspaceSchema),middleware,async(c)=>{
    const {name,image}=c.req.valid("json")
    const database=c.get("database")
    const storage=c.get("storage")
    if(image)
    {
        
    }
    const workspace=await database.createDocument(
        conf.appwrite_database_id,
        conf.workspace_key,
        ID.unique(),
        {
            name
        }
        )

        if(!workspace)
        {
            return c.json({error:"do not crate the workspace"})
        }
        return c.json({success:true,workspace})


})