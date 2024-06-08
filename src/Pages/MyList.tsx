
import { useAppSelector } from '../Hook';
import MovieCard from '../component/MovieCard';
import NoItemInList from '../component/NoItemInList';
import { isAddedInWishlist } from '../lib/isAddedinWishlist';

const MyList = () => {

    interface Movie {
        imageUrl : string ;
        movieTitle : string ;
        movieId : number;
        type : string;
        vote_average : number
        backdrop_path : string
      
      }
    const wishlistData = useAppSelector(state => state.movieWishlist.movieWishlist)

    // const AddedInListHandler = (movieId) => {
    //   return wishlistData.includes(movieId);
    // }

    
    

  return (
    <div>
        <figure className='w-full h-[270px] '>
        <img src={`https://image.tmdb.org/t/p/original/${wishlistData[0]?.backdrop_path}`} alt="banner" className='m-o w-full h-full' />
        </figure>
        {wishlistData.length === 0 ? <NoItemInList/> :
        <div className=' pt-10 grid justify-items-center grid-cols-7 gap-1 px-4 xl:px-1 xl:grid-cols-6 lg:grid-cols-5  940:!grid-cols-4 md2:!grid-cols-3  sm:!grid-cols-3'> 
            {wishlistData.map((movie:Movie, i:number)=>{
                return (
                    <MovieCard key={i}  imageUrl = {movie.imageUrl} movieTitle={movie.movieTitle}  movieId = {movie.movieId} type="movie"  vote_average={movie.vote_average} backdrop_path={movie.backdrop_path} isMYlistPage = {true} />
                )
            })}
        </div>}
    </div>
  )
}

export default MyList