import React from 'react'
import { useNavigate } from 'react-router-dom'

const NoItemInList = () => {
   const navigate = useNavigate()

  return (
    <div className=' flex flex-col items-center justify-center'>
      <h1 className=' text-white text-4xl text-center '>Your Wishlist is empty</h1>
      <p className=' text-white py-4 '>go to <button className=' px-3 py-1 rounded-md bg-sky-900' onClick={()=>navigate('/movies?category=popular&page=1')}>movie</button> and add in the list</p>
    </div>
  )
}

export default NoItemInList