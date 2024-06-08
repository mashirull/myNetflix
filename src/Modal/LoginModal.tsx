// import { signInWithEmailAndPassword } from "firebase/auth";
import { useState , useEffect} from "react";
import { PiEyeClosedBold } from "react-icons/pi";
import { PiEyeBold } from "react-icons/pi";
import { userLogin } from "../redux/slice/auth/authSlice";
import { useAppDispatch , useAppSelector} from "../Hook";


const LoginModal = ({login , IsLogin , register}:any) => {

  const [passwordVisible ,  setPasswordVisible] = useState(false)
  const [email ,  setEmail] = useState('');
  const [password  , setPassword] = useState('');

  const dispatch = useAppDispatch();
  const isLoading =  useAppSelector(state => state.UserAuth.isLoading)
  const isError =  useAppSelector(state => state.UserAuth.isError)
  const user =  useAppSelector(state => state.UserAuth.user)
  
    
 
  const loginHandler = (e:any) => {
    e.preventDefault();
    dispatch(userLogin({email , password}))
    setEmail('')
    setPassword('')
   
  }

  useEffect(() => {
    
    if(user){
      var timeOutId =  setTimeout(() => {
        login(false)
        // register(false)
      }, 1500);
    }

  
    return () => {
      clearInterval(timeOutId)
    }
  }, [user])
  
  



  return (
    <div className={` fixed h-full w-full top-0 left-0 bg-black bg-opacity-60 text-center  flex items-center justify-center delayInFadeIN `}>

        <div className={` bg-sky-950 h-[auto] w-[450px] 555:w-[380px] 460:!w-[300px] relative ${IsLogin ? 'fadeOut' : 'fadeIn'} px-8 `}>
          <h1 className=' text-center text-2xl font-bold  text-white py-4'>Login</h1>
            <form className=' flex  flex-col items-start justify-center'  onSubmit={loginHandler}>
              <label htmlFor="email" className=' block text-white py-2'>Email-Id <span className=' text-red-700'>*</span></label>
              <input type="email"  id='email' className=' w-full py-2 px-1 rounded-sm outline-none font-semibold bg-sky-900' value={email} onChange={(e)=>setEmail(e.target.value)} required/>
              <label htmlFor="password" className=' block text-white py-2'>Password <span className=' text-red-700'>*</span></label>
              <div className=' w-full flex items-center justify-center bg-sky-900'>
                <input type={passwordVisible ? 'text' : 'password'}  id='password' className=' w-full py-2 px-1 rounded-sm outline-none font-semibold bg-sky-900' value={password} onChange={(e)=>setPassword(e.target.value)} required/>
                <span className=' text-xl px-2 cursor-pointer text-white'  onClick={()=>setPasswordVisible(!passwordVisible)}>{passwordVisible ?  <PiEyeBold/> : <PiEyeClosedBold/>}</span>
              </div>

              {user === null && isError && <p className=" py-2 text-red-600">Wrong Email or Password</p> }
              {!isError  &&  user && <p className=" py-2 text-green-600">Login Successfull</p> }

              {/* <div  className={` bg-red-900 py-2 px-4  font-extrabold text-white mt-4 cursor-pointer text-sm rounded-sm flex items-center justify-between ${isLoading && 'opacity-20 cursor-not-allowed'} `} >
                <input type= "submit" value="Login"  disabled = {isLoading}  />
                {isLoading && <img src="/lodder.gif" alt="load" className=" w-6 h-5 ml-3" /> }
              </div> */}
              <button type="submit"  className={` bg-red-900 py-2 px-4  font-extrabold text-white mt-4 cursor-pointer text-sm rounded-sm flex items-center justify-between ${isLoading && 'opacity-20 cursor-not-allowed'} `}>
                  login
                  {isLoading && <img src="/lodder.gif" alt="load" className=" w-6 h-5 ml-3" /> }
              </button>

            </form>

            <p className=' py-2 text-sm'>You don't have a account , <span className=' cursor-pointer  text-gray-400 hover:text-sky-800' onClick={()=>{login(false) , register(true)}}>Register</span></p>
            <button className=' text-xl p-1 rounded-full bg-red-600 text-white absolute -top-4 -right-4 h-10 w-10' onClick={()=>login(false)}>X</button>
        </div>

    </div>
  )
}

export default LoginModal