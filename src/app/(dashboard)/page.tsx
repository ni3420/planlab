import SideBar from "@/components/SideBar";
import { getCurrentUser } from "@/features/auth/CurrentUser";
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
    </div>
    
    </>
   
  );
}
