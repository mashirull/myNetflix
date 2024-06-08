import { NavLink } from "react-router-dom"


const NavItems = ({mobileNav}:any):JSX.Element => {


  return (
      <ul className={`flex  text-sm text-gray-300 ${mobileNav && 'mob_nav'} `}>
          <NavLink className="px-3 cursor-pointer text-white" to="/">Home</NavLink>
          <NavLink  className="px-3 cursor-pointer" to= "/movies?category=popular&page=1">Movies</NavLink>
          {/* <li className="px-3 cursor-pointer">New & Popular</li> */}
          <NavLink  className="px-3 cursor-pointer" to="/mylist">My List</NavLink>
      </ul>
  )
}

export default NavItems