import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { ID, AppwriteException } from "node-appwrite";
import { createAdminClient } from "@/appwrite/client";
import { LoginSchema, RegisterSchema } from "../Schema";
import {deleteCookie, setCookie} from "hono/cookie"
import {middleware,AppWriteVariablesType} from "@/appwrite/middleware"

const app = new Hono<{Variables:AppWriteVariablesType}>()
.get("/current",middleware,async(c)=>{
  const user=c.get("user")
  return c.json({data:user})

})
  .post("/register", zValidator("json", RegisterSchema), async (c) => {
    const { name, email, password } = c.req.valid("json");

    try {
      const { account } = createAdminClient();

      const user = await account.create(
        ID.unique(),
        email,
        password,
        name
      );

      return c.json({ success: true, userId: user.$id }, 201);
    } catch (error) {
      if (error instanceof AppwriteException) {
        return c.json(
          { 
            success: false, 
            message: error.message, 
            code: error.code, 
            type: error.type 
          },
        );
      }

      return c.json(
        { success: false, message: "An unexpected error occurred" },
        500
      );
    }
  })
  .post("/login",zValidator("json",LoginSchema),async(c)=>{
    const {email,password}=c.req.valid("json")
    const {account}=createAdminClient()
    const session= await account.createEmailPasswordSession(email,password)
    if(!session)
    {
        return c.json({"msg":"something is wrong"})
    }
    setCookie(c,"token",session.secret,{
        httpOnly:true,
        secure:true,

    })

    return c.json({data:session})
  })
  .post("/logout",middleware,async(c)=>{
    deleteCookie(c,"token")
    return c.json({msg:"logged out"})
  })

export default app;