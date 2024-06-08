import { fetchSearchMovieData } from '../redux/slice/SearchMovieSlide';
import { useAppDispatch , useAppSelector } from '../Hook';
import { useEffect, useState } from 'react';
import MovieCard from '../component/MovieCard';


const MovieSearchModal = ({setSearchModal}:any) => {

  interface SearchMovie {
    poster_path : string ;
    original_title : string;
    genre_ids : number;
    id : number
  }


const [pageNumber , setPageNumber] = useState(1)

const dispatch = useAppDispatch()
const [queryString ,  setQueryString] = useState(String)

const searchMovie = useAppSelector(state => state.movieSearch.searchData)
const isLoding = useAppSelector(state => state.movieSearch.isLodding)
const allInfo = useAppSelector(state => state.movieSearch.allInfo)

useEffect(()=>{

  dispatch(fetchSearchMovieData({queryString ,pageNumber}))
},[queryString , pageNumber])



  return (
    <div className=' bg-gray-900  h-[623px]  absolute top-2 bottom-0 left-10 right-10 text-white  overflow-y-auto'>
        <button className=" text-2xl absolute top-0 right-0 bg-black hover:bg-red-700 text-white cursor-pointer p-3 h-8 w-8 flex items-center justify-center " onClick={()=>setSearchModal(false)}>X</button>
        <form  className=" text-center my-5">
            <input type="search" placeholder="Search by movie name: - " className="  py-1 px-3  text-white focus:outline-none text-lg w-5/12  bg-transparent border-b-2 border-sky-900" onChange={(e)=>setQueryString(e.target.value)} />
        </form>

        <p className=' text-center'>Total Result : - {allInfo.total_results}</p>
        {isLoding ? <h3 className=' text-center'>Lodding...</h3> : <div className=" mt-10 grid grid-cols-6 grid-rows-4 gap-1 align-middle justify-items-center">
           {  searchMovie?.map((movie:SearchMovie,i:number)=>{
            return (
              <MovieCard key={i} imageUrl={movie.poster_path} movieTitle={movie.original_title} movieId={movie.id} genres={movie.genre_ids} type='movie' setModal={setSearchModal}/>
            )
           })}
        </div> }

        {searchMovie?.length >= 20 && <div className=' text-center my-6 '>
          <button className='bg-red-500 py-2 px-5 rounded-lg '>Previous</button>
          <button className='bg-red-500 py-2 px-5 rounded-lg  ml-5'  onClick={()=>{setPageNumber(pageNumber+1)}}>Next</button>
        </div>}
    </div>
  )
}

export default MovieSearchModal