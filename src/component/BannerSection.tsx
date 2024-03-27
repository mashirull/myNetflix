import { BsFillPlayFill, BsInfoCircle } from 'react-icons/bs';
import TrendingNow from './TrendingNow';
import { useAppSelector , useAppDispatch } from '../Hook';
import { fetchMovieLogo } from '../redux/slice/logoSlide';
import { fetchMovieVideo } from '../redux/slice/movieVideoSlide';
import { useEffect, useState } from 'react';
import BannerOverviewLodder from './BannerOverviewLodder';
import {  useNavigate } from 'react-router-dom';
import WatchVideoModal from '../Modal/WatchVideoModal';


const BannerSection = (): JSX.Element => {

  interface BannerMovie {
    backdrop_path : string;
    overview  : string ;
    original_title : string
    id : number

  }


  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const logo = useAppSelector(state => state.movieLogo.logoUrl)
  const logoIsLodding:any = useAppSelector(state => state.movieLogo.isLodding)
 
  const[showVideo , setShowVideo] = useState(false)
  const [isWatchVideo ,  setIsWatchVideo] = useState(false)
 
  
  const bannerMovie:BannerMovie = useAppSelector((state:any) => state.allMovie.bannerMovie)
  const movieIsLodding = useAppSelector(state => state.allMovie.isLodding)
  
  // const isLodding:boolean = useAppSelector(state=>state.allMovie.isLodding)

  
  
  //checking condition when bannerMovie is not empty and then call the dispatch function
  if(Object.keys(bannerMovie).length !== 0){
    dispatch(fetchMovieLogo(bannerMovie.id))
  }

  

  useEffect(()=>{
      dispatch(fetchMovieVideo(bannerMovie?.id))

      // setTimeout(() => {
      //   setShowVideo(true)
      // }, 10000);
      
      setTimeout(()=>{
         
        setShowVideo(false)
      },80000);
  },[bannerMovie.id])
  

  
  const video:any = useAppSelector(state =>state.movieVideo.videos);
  const isLoading = useAppSelector(state => state.movieVideo.isLoadding)
  // console.log(video)

  interface ElememtType {
    type : string
  }
  
  const trailerVideo = video?.filter((elem:ElememtType) => elem.type === 'Trailer')

  const playTrailer = () =>{
    setIsWatchVideo(true)
  }



  return (
    <div className="w-full h-full ">
      {isWatchVideo && <WatchVideoModal  setIsWatch = {setIsWatchVideo} movieId = {bannerMovie?.id}/>}
      <figure className="banner_height relative ">
        {showVideo === false  ? <img src={`https://image.tmdb.org/t/p/original/${bannerMovie.backdrop_path}`} alt="banner" className='m-o w-full h-full' /> 
      //  : showVideo=== true? <iframe src={`https://www.youtube.com/embed/${trailerVideo[0]?.key}?autoplay=1&mute=1`} allow='autoplay; encrypted-media' allowFullScreen  className=' w-full h-full object-cover' ></iframe>
        : ''
      }
        <div className="h-full w-full  text-white absolute top-0 left-0 bg-black bg-opacity-5 pl-16 pt-40 sm:pt-28 sm:pl-8 custom_gradient1 z-20">
          <div className='w-1/2 sm:w-full'>
            {/* <h1 className="text-7xl font-bold py-4">{bannerMovie.original_title}</h1> */}
            {movieIsLodding ?  <div className=' w-72 h-20 bg-sky-950 rounded-md Lodder mb-5'></div> :
            <img src={`https://image.tmdb.org/t/p/w500/${logo}`} alt="movieTitle"  className='mb-5 max-h-20 sm:max-h-10'/>}
            {movieIsLodding ? <BannerOverviewLodder/> : <p className="text-md pb-4 sm:text-sm">{bannerMovie?.overview?.slice(0,200)}..</p>}
            
          </div>


          {movieIsLodding ?  <div className='flex'>
            <div className=" bg-sky-950 rounded-md  h-11  w-36 mr-4 Lodder"></div>
                
              <div className=" bg-sky-950 rounded-md  h-11  w-36 mr-4 Lodder"></div>
          </div> :
          <div className='flex'>
            
            <button className="bg-white rounded-md px-6 sm:px-3 py-1 text-black font-semibold mr-4 hover:bg-gray-300 flex items-center" onClick={playTrailer}>
               <span className='mr-1 text-4xl sm:text-xl'><BsFillPlayFill /></span>Play
            </button>

            <button className="bg-gray-400 bg-opacity-30 rounded-md px-6 sm:px-3 py-1 text-white font-semibold hover:bg-opacity-40 flex items-center" onClick={()=> navigate(`/movie/${bannerMovie.id}-${bannerMovie.original_title}`)}>
              <span className='mr-2 text-2xl sm:text-xl'><BsInfoCircle/></span>More Info
            </button>
          </div>}
        </div>

        <div className='w-full h-1/2  absolute bottom-0 left-0 custom_gradient'></div>

        <span className=' absolute  bottom-20 z-[999999] h-11 mx-8 sm:mx-0 right-0 left-0  '>
          <TrendingNow/>
        </span>
      </figure>
    </div>
  )
}

export default BannerSection