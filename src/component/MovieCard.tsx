import {FaPlay , FaPlus} from 'react-icons/fa';
import {BiSolidLike}   from  "react-icons/bi";
import { useAppDispatch , useAppSelector} from '../Hook';
import {  useNavigate } from 'react-router-dom';
import CircularProgressBar from './CircularProgressBar';
import { useEffect, useState } from 'react';
import { AddToWishlist , RemoveFromWishlist} from '../redux/slice/AddToWishlistSlide';
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaCheckCircle } from "react-icons/fa";
import { movieLikeAndUnlike } from '../redux/slice/LikeSlide';



interface MovieCardProps {
  imageUrl : string ;
  movieTitle : string ;
  movieId? : number;
  type : string;
  setModal? : any ;
  vote_average : number
  backdrop_path : string,
  isMYlistPage? : boolean,
}

const MovieCard = ({imageUrl , movieTitle  ,movieId , type ,setModal , vote_average ,backdrop_path , isMYlistPage }:MovieCardProps):JSX.Element => {

  const [isWishlished ,  setIsWishlished] = useState(false)
  const [isLiked , setIsLiked]  = useState(false)
  const dispatch = useAppDispatch()

  const wishlist = useAppSelector(state => state.movieWishlist.movieWishlist)

  const likeData = useAppSelector(state => state.movieLikeUnlike.likedMovie)

  
  useEffect(()=>{
    wishlist.map((elem:any) => {
      if(elem.movieId == movieId){
        setIsWishlished(true)
      } 
    })
  },[movieId , wishlist])

  useEffect(() => {
    likeData.map((elem:any) => {
      if(elem.movieId  == movieId){
        setIsLiked(true)
      }
      
    })
    let like =  likeData.find((elem:any) => elem.movieId === movieId)
  
    if(like === undefined){
      setIsLiked(false)
    }
    
    
  },[likeData , movieId ])
  
  
     

  const wishlistData = {
    movieId,
    imageUrl,
    movieTitle,
    type,
    vote_average,
    backdrop_path

  }

  

  const wishlistHandler = ()=> {
    dispatch(AddToWishlist(wishlistData))
  }
  

  // setTimeout(() => {
  //   setLoadImage(true)
  // }, 2000);

  const navigate = useNavigate()

  

   const goToDetailsPage = (id:number , movieName:string)=>{
     
    type === "movie" ? navigate(`/movie/${id}-${movieName}`) : navigate(`/TVseries/${id}-${movieName}`)
   }


  return (
    <>
      <div className="bg-gray-700 rounded-md cursor-pointer movieCard relative" >
        <figure className="h-full w-full">
         { <img src={`https://image.tmdb.org/t/p/w500/${imageUrl}`} alt=""  className="w-full h-full rounded-md"/>}
        </figure>
        <div className="movie_info custom_gradient_info text-center ">
          <h1 className="text-sm">{movieTitle.substring(0,30)}{movieTitle.length > 30 && '...' } </h1>
          <div className='flex my-4 text-center'>
            <div className='text-lg text-white border p-1 rounded-full mr-2 flex items-center justify-center relative hover:text-gray-500 hover:border-gray-500 play' onClick={()=>{goToDetailsPage(movieId,movieTitle.replaceAll(" " , "-")), setModal(false)}}><span className='absolute -top-6 left-1/2 -translate-x-1/2 sm-text text-white font-thin hidden'>Watch</span> <FaPlay/></div>
            {!isMYlistPage && <span className={`text-lg text-white ${isWishlished && ' text-sky-400 border-sky-400 hover:text-sky-400 hover:border-sky-400 '}  border p-1 rounded-full mr-2 flex items-center justify-center relative hover:text-gray-500 hover:border-gray-500 wishlist`} onClick={wishlistHandler}><span className={`absolute -top-6 left-1/2 -translate-x-1/2 sm-text text-white font-thin hidden w-fit ${isWishlished && ' font-bold'}`} >{isWishlished ? 'Added' : 'Wishlist'} </span>{isWishlished ? <FaCheckCircle/> :<FaPlus/>}</span>}
            <span className={`text-lg text-white ${isLiked && ' !text-green-400 border-green-400 hover:text-green-400 hover:border-green-400'}  border p-1 rounded-full flex items-center justify-center relative hover:text-gray-500 hover:border-gray-500 like`} onClick={()=>dispatch(movieLikeAndUnlike({movieId}))}><span className='absolute -top-6 left-1/2 -translate-x-1/2 sm-text text-white font-thin hidden'>{isLiked ? 'Unlike'  : 'Like'}</span><BiSolidLike/></span>

          </div>
          
        </div>
        <div className=' absolute -top-2 -right-2 text-red-800'>
          <CircularProgressBar vote = {vote_average} h = {10} w= {10}/> 
        </div>

        {isMYlistPage &&
        <div className=' border w-6  h-6 rounded-full p-1 absolute top-1 left-1 items-center justify-center text-red-800 hover:bg-red-800 hover:text-white flex' onClick={()=> dispatch(RemoveFromWishlist(movieId))}>
          <span className=''>
            <RiDeleteBin6Line/>
          </span>
        </div>}

      </div>

    
    </>

  )
}

export default MovieCard