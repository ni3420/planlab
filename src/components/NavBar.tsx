import UserButton from "./userButton";

const NavBar = () => {
    return ( <>
    <div className=" flex justify-between  ">
        <h1>
            Logo
        </h1>
        <div>
            <UserButton/>
        </div>

    </div>
    </> );
}
 
export default NavBar;