import NavItems from "./NavItems";
import {FaUserAlt} from 'react-icons/fa';
import {GoSearch} from 'react-icons/go';
import {useState} from 'react';
import { BiMenuAltLeft } from "react-icons/bi";
import MovieSearchModal from "../Modal/MovieSearchModal";

const Navbar = () => {

    const [IsSearch, setIsSearch] = useState(false);
    const [blurNav ,  setBlurNav] = useState(false);
    const [mobileNav , setMobileNav] = useState(false)
    const [searchModal , setSearchModal] = useState(false)

    window.onscroll = () => {
        if(window.scrollY  >= 10){
            setBlurNav(true)
        }
        else{
            setBlurNav(false)
        }
    }


  return (
    <div className={`nav_gradient py-4 px-16 md2:px-5 flex items-center justify-between z-[99999999999999] fixed top-0 left-0 right-0 bg-opacity-0 navTransition ${blurNav && 'fixed bg-opacity-100 bg-black'}`} >
        {searchModal && <MovieSearchModal setSearchModal = {setSearchModal}/>}
        <div className="flex items-center">
            <div className="mr-10 md2:mr-4">
                <h1 className="text-red-600 font-medium text-3xl">METFLIX</h1>
            </div>
            <span className={`${mobileNav ? 'block relative' : 'md2:hidden' }`}>
                <NavItems mobileNav = {mobileNav} />
            </span>
            <span className=" hidden md2:block text-white text-2xl" onClick={()=>setMobileNav(!mobileNav)}>
                <BiMenuAltLeft/>
            </span>

        </div>

        <div className="flex items-center justify-center">
            <div className={`flex items-center border ${IsSearch ?'border-white' : 'border-transparent'}  mr-10`} >
                <span className="text-white  text-2xl cursor-pointer p-1 md2:hidden" onClick={()=>setSearchModal(true)}>
                    <GoSearch/>
                </span>
                <input type="search" placeholder="Search by movie name...."  className= {`bg-transparent text-sm px-1 py-2 focus:outline-none text-white ${IsSearch ? 'w-60' : 'w-0'} transition-all `}/>
            </div>

            <span className="text-white text-2xl border-2  rounded-md p-1 cursor-pointer">
                <FaUserAlt/>
            </span>

        </div>

    </div>
  )
}

export default Navbar