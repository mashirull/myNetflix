import { useLocation, useNavigate } from "react-router-dom";
import MovieCard from "../component/MovieCard";
import { useAppDispatch , useAppSelector } from "../Hook";
import { useEffect, useState } from "react";
import { fetchPopularMovir } from "../redux/slice/popularMOvieSlide";
import { fetchTopRatedgMovie } from "../redux/slice/TopRatedSlide";
import { fetchTrendingMovieData } from "../redux/slice/trandingMovieSlide";
import { fetchUpcomingMOvie } from "../redux/slice/UpcomingMovieSlide";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import Pagination from "../component/Pagination";
import MovieError from "../Error/MovieError";
// import { isAddedInWishlist } from "../lib/isAddedinWishlist";


const Movies = () => {
    const location =  useLocation();
    const queryParams = new URLSearchParams(location.search)
    const category  = queryParams.get('category')
    const timeDuration = queryParams.get('time')
    const page = queryParams.get('page')
    const dispatch = useAppDispatch()
    const trending = useAppSelector((state:any) => state.TrendingMovie.trandingMovie);
    const PopularMovie = useAppSelector((state:any) => state.popularMovie.popularMoviedata )
    const topRatedMovie = useAppSelector((state:any) => state.TopRatedMovie.topRatedMoviesData)
    const upcomming = useAppSelector((state:any) => state.upcomingMOvie.UpcomingMovieData)
    const Ptotal_pages = useAppSelector((state)=> state.popularMovie.total_pages)
    const ttotal_pages = useAppSelector((state)=> state.TopRatedMovie.total_pages) 
    const utotal_pages = useAppSelector((state)=> state.upcomingMOvie.total_pages)
    // const PisLoadding = useAppSelector((state:any) => state.popularMovie.isLoadding )
    // const TopisLoadding = useAppSelector((state)=> state.TopRatedMovie.isLoadding)
    // const UisLoadding = useAppSelector((state:any) => state.popularMovie.isLoadding )
    // const TrendingisLoadding = useAppSelector((state)=> state.TopRatedMovie.isLoadding)

    const [MoviesObject ,  SetMovieObject] = useState([])
    const [bannerImage , setBannerImage] = useState('')
    const [totalPage ,  setTotalPage]  = useState(0)
    const [isError ,  setIsError] = useState(false)
    const [isLoading ,  setIsLoading]  = useState(true)


    let timeOutId:number;
    useEffect(()=>{
        timeOutId =  setTimeout(()=>{
            setIsError(true)
            setIsLoading(false)
        },15000);

        return ()=> {
            clearTimeout(timeOutId)
        }
    },[]);

    useEffect(()=>{
        if(MoviesObject.length !== 0){
            setIsError(false)
            setIsLoading(false)
            clearTimeout(timeOutId)
        }
    },[MoviesObject])

    const navigate = useNavigate()

    interface Movies {
        poster_path: string ;
        original_title : string ;
        // genre_ids : number;
        id : number;
        vote_average : number;
        total_pages : number ;
        backdrop_path : string
      }

    useEffect(()=>{
        switch(category){
            case 'popular':
                SetMovieObject([])
                dispatch(fetchPopularMovir(page))
                SetMovieObject(PopularMovie)
                setBannerImage(PopularMovie[0]?.backdrop_path)
                setTotalPage(Ptotal_pages)
                break;
            case 'toprated':
                SetMovieObject([])
                dispatch(fetchTopRatedgMovie(page)) 
                SetMovieObject(topRatedMovie)
                setBannerImage(topRatedMovie[0]?.backdrop_path)
                setTotalPage(ttotal_pages)
                break;
            case 'trending' : 
                if(timeDuration === 'week'){
                    SetMovieObject([])
                    dispatch(fetchTrendingMovieData('week')) 
                    SetMovieObject(trending) 
                    setBannerImage(trending[0]?.backdrop_path)
                }
                else{
                    SetMovieObject([])
                    dispatch(fetchTrendingMovieData('day')) 
                    SetMovieObject(trending) 
                    setBannerImage(trending[0]?.backdrop_path)
                }
                break ;
            case 'upcomming'  :
                SetMovieObject([])
                dispatch(fetchUpcomingMOvie(page)) 
                SetMovieObject(upcomming)
                setBannerImage(upcomming[0]?.backdrop_path)
                setTotalPage(utotal_pages)
                break;
        }

        
    },[category,PopularMovie , topRatedMovie , trending, timeDuration , upcomming , page])

  return (
    <div className="">
        <figure style={{background : `url(https://image.tmdb.org/t/p/original${bannerImage})` , backgroundSize : 'cover', backgroundPosition : 'right top' ,backgroundRepeat : 'no-repeat'}} className=" w-full h-[270px] relative !bg-cover !bg-right-top " >
            <div className=" h-full w-full custom_gradient1  absolute top-0 left-0 py-4 px-10 460:px-3 flex flex-col items-start  justify-end">
                <h1 className=" text-white text-4xl font-semibold  555:text-3xl">Unlock a World of Movie Magic</h1>
                <div className=" flex items-center justify-between">
                    <div className="flex flex-wrap mt-12 460:mt-5">
                        <button className={` bg-white rounded-md 460:py-1 460:px-2 py-2 px-4 460:my-2 font-medium mx-2 text-xs hover:bg-sky-900 hover:text-white ${category === "popular" && '!bg-sky-900 text-white'}`} onClick={()=>{navigate('/movies?category=popular&page=1')}}>Popular</button>
                        <button className={` bg-white  rounded-md 460:py-1 460:px-2 py-2 px-4 460:my-2 font-medium mx-2 text-xs hover:bg-sky-900 hover:text-white ${category === "upcomming" && '!bg-sky-900 text-white'}`} onClick={()=>{navigate('/movies?category=upcomming&page=1') }}>Upcomming</button>
                        <button className={`bg-white  rounded-md 460:py-1 460:px-2 py-2 px-4 460:my-2 font-medium mx-2 text-xs hover:bg-sky-900 hover:text-white ${category === "toprated" && '!bg-sky-900 text-white'}`} onClick={()=>{navigate('/movies?category=toprated&page=1') }}>Top Rated</button>
                        <button className={` bg-white  rounded-md 460:py-1 460:px-2 py-2 px-4 460:my-2  font-medium mx-2 text-xs hover:bg-sky-900 hover:text-white ${category === "trending" && '!bg-sky-900 text-white'}` }onClick={()=>{navigate('/movies?category=trending&time=day') }}>Trending</button>
                    </div>
                   
                </div>
            </div>
           
        </figure>
        <div >
            <div className="flex items-center justify-center">
                <div className=" flex text-center justify-between w-full px-4  sm:!px-1 555:flex-col 555:justify-center"> 
                    <div className=" flex items-center"> 
                        <h1 className=" text-center py-4 text-white text-2xl pl-2 sm:text-lg   ">{category == 'popular' ? 'Popular Movies' : category == 'upcomming' ? 'Upcoming Movies' : category == 'toprated' ? 'Top Rated Movies' : category === 'trending' ? 'Trending Movie in': 'Something wrong'}</h1>
                        {category === 'trending' &&
                        <span className=" ml-3">
                            <button className={ `bg-white rounded-lg py-1 px-2 text-xs font-semibold ${timeDuration === 'day' && '!bg-sky-900 text-white'}`} onClick={()=>{navigate('/movies?category=trending&time=day') }}>Day</button>
                            <button className={`bg-white rounded-lg py-1 px-2 text-xs font-semibold ml-2 ${timeDuration === 'week' && '!bg-sky-900 text-white'}`} onClick={()=>{navigate('/movies?category=trending&time=week') }}>Week</button>
                        </span>}
                    </div>
                    { category !== 'trending' && MoviesObject.length !== 0 &&
                    <div className=" flex items-center justify-center 555:hidden ">
                        <span className={` text-white text-sm  bg-sky-900 p-1 rounded-full mx-5 cursor-pointer ${Number(page) === 1 && 'bg-slate-500 cursor-not-allowed'}`}  onClick={()=>{Number(page) > 1 && navigate(`/movies?category=${category}&page=${Number(page)-1}`)}}><FaArrowLeft/></span>
                        <Pagination totalPageNumber={totalPage} page={Number(page)} category = {category}/>
                        <span className={` text-white text-sm bg-sky-900 p-1 rounded-full mx-5 cursor-pointer`} onClick={()=>{Number(page) < totalPage && navigate(`/movies?category=${category}&page=${Number(page)+1}`)}}><FaArrowRight/></span>
                    </div>}
                </div>
            </div>
            {isLoading ? <h1 className=" text-center text-white">Loading...</h1>  : isError === true ? <MovieError/> :
            <div className=" grid grid-cols-7 grid-rows-none justify-items-center gap-1 px-4 xl:px-1 xl:grid-cols-6 lg:grid-cols-5  940:!grid-cols-4 md2:!grid-cols-3  sm:!grid-cols-3  ">
                {MoviesObject?.map((movie:Movies, i:number)=>{
                    return (
                        <MovieCard key={i} imageUrl= {movie.poster_path} movieTitle={movie.original_title}  movieId={movie.id} type="movie" vote_average={movie.vote_average} backdrop_path= {movie.backdrop_path} />
                    )
                })}
            </div>}
        </div>
        { category !== 'trending' && MoviesObject.length !== 0 &&
        <div className=" flex items-center justify-center my-10">
            <span className={` text-white text-2xl 460:text-xl  bg-sky-900 p-2 rounded-full mx-5 460:mx-2 cursor-pointer ${Number(page) === 1 && 'bg-slate-500 cursor-not-allowed'}`}  onClick={()=>{Number(page) > 1 && navigate(`/movies?category=${category}&page=${Number(page)-1}`)}}><FaArrowLeft/></span>
            <Pagination totalPageNumber={totalPage} page={Number(page)} category = {category}/>
            <span className={` text-white text-2xl 460:text-xl bg-sky-900 p-2 rounded-full mx-5 460:mx-2 cursor-pointer`} onClick={()=>{Number(page) < totalPage && navigate(`/movies?category=${category}&page=${Number(page)+1}`)}}><FaArrowRight/></span>
        </div>}
       
    </div>
  )
}

export default Movies

