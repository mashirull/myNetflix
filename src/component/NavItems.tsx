import { NavLink } from "react-router-dom"


const NavItems = ({mobileNav}:any):JSX.Element => {


  return (
      <ul className={`flex  text-sm text-gray-300 ${mobileNav && 'mob_nav'} `}>
          <NavLink className="px-3 cursor-pointer text-white" to="/">Home</NavLink>
          <li className="px-3 cursor-pointer">Movies</li>
          <li className="px-3 cursor-pointer">New & Popular</li>
          <li className="px-3 cursor-pointer">My List</li>
      </ul>
  )
}

export default NavItems