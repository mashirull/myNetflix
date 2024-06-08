
import { useAppSelector , useAppDispatch } from "../Hook"
import { logout } from "../redux/slice/auth/authSlice"


const UserProfile = ({login , register}:any) => {

  const dispatch = useAppDispatch()

  const user = useAppSelector(state => state.UserAuth.user)


  return (
    <div className=" absolute -right-1 -bottom-28 bg-black rounded-md px-4 py-2 text-white min-w-[180px] w-auto items-center justify-center flex-col text-center h-28 hidden user_profile">
      {user ? 
       <div>
        {/* <span className="text-white text-xl text-center mb-3"> <FaUserAlt/> </span> */}
        <h1 className=" text-sm py-2"> <span className=" text-lg">Hi </span> , {user.user.email}</h1>
        <button className=" text-xs bg-sky-900 px-3 py-1 rounded-md text-white" onClick={()=>dispatch(logout())}>Logout</button>
      </div> :
      <div className=" flex items-center justify-between">
        <button className=" text-xs bg-sky-900 px-3 py-2 rounded-md text-white mr-2 font-bold" onClick={()=>{login(true) , register(false)}}>Login</button>
        <button className=" text-xs bg-white text-black px-3 py-2 rounded-md font-bold" onClick={()=>{register(true) , login(false)}}>Signup</button>
      </div>}
    </div>
  )
}

export default UserProfile