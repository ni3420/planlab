import SideBar from "@/components/SideBar";
import { getCurrentUser } from "@/features/auth/CurrentUser";
import WorkSpaceForm from "@/features/workspace/components/workspace-form";
import {redirect} from "next/navigation"

export default async function Home() {
  const user=await getCurrentUser()
  if(!user)
  {
    redirect("/sign-in")
  }
  return (
    <>
    
    <div>
      {/* <EditWorkspace/> */}
    </div>
    
    </>
   
  );
}
