"use client"
import {useForm} from "react-hook-form"
const WorkSpaceSettingPage = () => {
    const {handleSubmit,register}=useForm()

    const handleSubmitButton=(data:any)=>{
        console.log(data)

    }
    return ( <>
    <div>
        <form onSubmit={handleSubmit(handleSubmitButton)}>
            <input type="text" {...register("name")} />
            <button type="submit">click me</button>
        </form>
    </div>
    
    </> );
}
 
export default WorkSpaceSettingPage;