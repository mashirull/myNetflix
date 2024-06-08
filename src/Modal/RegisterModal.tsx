import { useEffect, useState } from "react";
import { useAppDispatch , useAppSelector} from "../Hook";
import { PiEyeBold, PiEyeClosedBold } from "react-icons/pi";
import { UserRegister } from "../redux/slice/auth/authSlice";



const RegisterModal = ({IsRegister , register ,  login}:any) => {

  const [email , setEmail] =  useState('');
  const [password ,  setPassword] =  useState('');
  const [confirmPassword , setConfirmPassword] = useState('')
  const [passwordVisible ,  setPasswordVisible] = useState(false)
  const [errorMsg , setErrorMsg] = useState('')

  const isLoading =  useAppSelector(state => state.UserAuth.isLoading)
  const isError =  useAppSelector(state => state.UserAuth.isError)
  const isSuccess =  useAppSelector(state => state.UserAuth.isSuccess)


const dispatch = useAppDispatch()



const RegisterHandler = (e:any) => {
  e.preventDefault();
  if(password === confirmPassword && password.length >= 6) {
    setErrorMsg('')
    dispatch(UserRegister({email , password}))
    setEmail('')
    setPassword('')
    setConfirmPassword('')
  }
  else if(password !== confirmPassword){
    setErrorMsg('Password should be same')
  }
  else if(password.length < 6){
    setErrorMsg('Password Atleast 6 character')
  }
  
} 




  return (
    <div className=' fixed h-full w-full top-0 left-0 bg-black bg-opacity-60 text-center  flex items-center justify-center' >

        <div className={` bg-sky-950 h-[auto] w-[450px] 555:w-[380px] 460:!w-[300px] relative ${IsRegister ? 'fadeOut' : 'fadeIn'} px-8`}>
            <h1 className=' text-center text-2xl font-bold  text-white py-4'>Register</h1>
            <form className=' flex  flex-col items-start justify-center' onSubmit={RegisterHandler}>
              {/* <label htmlFor="username" className=' block text-white py-2'>Username <span className=' text-red-700'>*</span></label>
              <input type="text"  id='username' className=' w-full py-2 px-1 rounded-sm outline-none font-semibold bg-sky-900'/> */}
              <label htmlFor="email" className=' block text-white py-2'>Email Id <span className=' text-red-700'>*</span></label>
              <input type="email"  id='email' className=' w-full py-2 px-1 rounded-sm outline-none font-semibold bg-sky-900' value={email} onChange={(e)=>setEmail(e.target.value)} required/>
              {isError && <p className=" text-red-600 py-2">Email Already exist</p> }

              <label htmlFor="password1" className=' block text-white py-2'> Password <span className=' text-red-700'>*</span></label>
              <div className=' w-full flex items-center justify-center bg-sky-900'>
                <input type={passwordVisible ? 'text' : 'password'}  id='password' name="password" className=' w-full py-2 px-1 rounded-sm outline-none font-semibold bg-sky-900' value={password} onChange={(e)=>setPassword(e.target.value)} required/>
                <span className=' text-xl px-2 cursor-pointer text-white'  onClick={()=>setPasswordVisible(!passwordVisible)}>{passwordVisible ?  <PiEyeBold/> : <PiEyeClosedBold/>}</span>
              </div>

              {/* <label htmlFor="password1" className=' block text-white py-2'> Password <span className=' text-red-700'>*</span></label>
              <input type="password"  id='password1' className=' w-full py-2 px-1 rounded-sm outline-none font-semibold bg-sky-900'  value={password} onChange={(e)=>setPassword(e.target.value)} required /> */}


              <label htmlFor="password2" className=' block text-white py-2'>Confirm Password <span className=' text-red-700'>*</span></label>
              <input type="text"  id='password2' name="password" className=' w-full py-2 px-1 rounded-sm outline-none font-semibold bg-sky-900' value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} required/>


              {errorMsg && <p className=" text-red-600 py-2">{errorMsg}</p> }
              {isSuccess && <p className=" text-green-600 py-2">Register Successful</p> }
              {/* <input type="submit" value="Register" className=' bg-red-900 py-2 px-4  font-extrabold text-white mt-4 cursor-pointer text-sm rounded-sm' /> */}
              <button type="submit"  className={` bg-red-900 py-2 px-4  font-bold text-white mt-4 cursor-pointer text-sm rounded-sm flex items-center justify-between ${isLoading && 'opacity-20 cursor-not-allowed'} `}>
                  Register
                  {isLoading && <img src="/lodder.gif" alt="load" className=" w-6 h-5 ml-3" /> }
              </button>
            </form>

            <p className=' py-2 text-sm'>Already have a account , <span className=' cursor-pointer  text-gray-400 hover:text-sky-800' onClick={()=>{login(true) , register(false)}}>Login</span></p>
            <button className=' text-xl p-1 rounded-full bg-red-600 text-white absolute -top-4 -right-4 h-10 w-10 align-middle text-center' onClick={()=>{register(false)}}>X</button>
        </div>

        
    </div>
  )
}

export default RegisterModal