import {FaPlay , FaPlus} from 'react-icons/fa';
import {BiSolidLike}   from  "react-icons/bi";
import { useAppSelector } from '../Hook';
import {  useNavigate } from 'react-router-dom';
// import { UseMovieGenreses } from '../Hook/movieGenres';

interface MovieCardProps {
  imageUrl : string ;
  movieTitle : string ;
  genres : any;
  movieId : number;
  type : string

}

const MovieCard = ({imageUrl , movieTitle ,genres ,movieId, type }:MovieCardProps):JSX.Element => {
  
  // const genresArr = UseMovieGenreses(genres)
  const navigate = useNavigate()

  const genresArr : string[] = []

   const movieGenres  = useAppSelector(state => state.movieGenres.movieGenres)

   const intersection = movieGenres.filter((elem: {id : number}) => {
    return genres?.includes(elem.id)
   })

   intersection.forEach((elem : {name:string})=>{
    genresArr.push(elem.name)
   })

  //  console.log(genresArr)
   const goToDetailsPage = (id:number , movieName:string)=>{
     
    type === "movie" ? navigate(`/movie/${id}-${movieName}`) : navigate(`/TVseries/${id}-${movieName}`)
   }




  return (
    <>
      <div className="bg-gray-700 rounded-md cursor-pointer movieCard" >
        <figure className="h-full w-full">
          <img src={`https://image.tmdb.org/t/p/w500/${imageUrl}`} alt=""  className="w-full h-full rounded-md"/>
        </figure>
        <div className="movie_info custom_gradient_info text-center ">
          <h1 className="text-sm">{movieTitle.substring(0,30)}{movieTitle.length > 30 && '...' } </h1>
          <div className='flex my-4 text-center'>
            <div className='text-lg text-white border p-1 rounded-full mr-2 flex items-center justify-center relative hover:text-gray-500 hover:border-gray-500 play' onClick={()=>goToDetailsPage(movieId,movieTitle.replaceAll(" " , "-"))}><span className='absolute -top-6 left-1/2 -translate-x-1/2 sm-text text-white font-thin hidden'>Watch</span> <FaPlay/></div>
            <span className='text-lg text-white border p-1 rounded-full mr-2 flex items-center justify-center relative hover:text-gray-500 hover:border-gray-500 wishlist'><span className='absolute -top-6 left-1/2 -translate-x-1/2 sm-text text-white font-thin hidden w-fit'>Wishlist</span><FaPlus/></span>
            <span className='text-lg text-white border p-1 rounded-full flex items-center justify-center relative hover:text-gray-500 hover:border-gray-500 like'><span className='absolute -top-6 left-1/2 -translate-x-1/2 sm-text text-white font-thin hidden'>Like</span><BiSolidLike/></span>

          </div>
          <div className='flex'>
            {genresArr.map((elem:string , i:number)=> {
              return (
                <div className='flex items-center ' key={i}>
                  <span className='h-1 w-1 bg-red-800 rounded-full block m-1'></span>
                  <li className='sm-text list-none'> {elem}</li>
                </div>
              )
            })}
          </div>
        </div>
      </div>

    

      {/* <div className="bg-gray-700 width h-36 rounded-md cursor-pointer  movieCard2 hidden">
          <figure>
          <img src={`https://image.tmdb.org/t/p/w500/${imageUrl}`} alt=""  className="w-full h-36 rounded-md"/>
          </figure>
          <h1 className="text-2xl text-white bg-gray-700 hidden py-8 px-2  ">film name</h1>
      </div> */}
    </>

  )
}

export default MovieCard