import Slider from "react-slick";
import MovieCard from "./MovieCard";
// import {useState} from 'react'
import { fetchTrendingMovieData } from "../redux/slice/trandingMovieSlide";
import {useEffect, useState} from 'react';
import LoaderCard from "./LoaderCard";
import { useAppDispatch, useAppSelector } from "../Hook";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SampleNextArrow from "../customButtom/SampleNextArrow";
import SamplePrevArrow from "../customButtom/SamplePrevArrow";



const TrendingNow = ():JSX.Element => {

  interface Movies {
    poster_path: string ;
    original_title : string ;
    genre_ids : number;
    id : number;
    vote_average : number,
    backdrop_path : string
  }
    

    const [time , setTime] = useState('day')

    const movies = useAppSelector((state:any) => state.TrendingMovie.trandingMovie)
    const isLodding:boolean = useAppSelector((state:any) => state.TrendingMovie.isLodding)
    const isError:boolean = useAppSelector((state:any) => state.TrendingMovie.isError)
   
    const dispatch = useAppDispatch()

  useEffect(() => {

    if(time == 'day'){
      dispatch(fetchTrendingMovieData('day'))
    }
    if(time === 'week'){
      dispatch(fetchTrendingMovieData('week'))
    }
 
   
  }, [time])

  const settings = {
    // className: 'center',
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 2,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1300,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 1,
          infinite: true,
        }
      },
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
          infinite: true,
        }
      },
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          Infinity : true
          // initialSlide: 2
        }
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          Infinity : true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          Infinity : true
        }
      },
      {
        breakpoint: 490,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        }
      },
      {
        breakpoint: 360,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        }
      },
    ]
  };
  

  return (
    <div className=" ">
        <div className=" flex items-center">
          <h1 className="text-white text-xl pb-4 sm:pt-2 sm:px-3">Tranding Now</h1>
          <div className=" ml-1 pb-4">
            <button className={` mx-1 py-1 px-2 bg-white rounded-md text-xs font-semibold  ${time === 'day' && ' !bg-sky-900 text-white'} hover:bg-sky-900 hover:text-white`} onClick={()=>setTime('day')}>day</button>
            <button  className={` mx-1 py-1 px-2 bg-white rounded-md text-xs font-semibold ${time === 'week' && ' !bg-sky-900 text-white'} hover:bg-sky-900 hover:text-white `} onClick={()=>setTime('week')}>Week</button>
          </div>
        </div>
        <div className=" ">
          {isLodding && <LoaderCard/> }
          {isError && <h1 className="text-red-600">Something went wrong</h1>}
          <Slider {...settings}>
            {!isLodding && movies.map((movie:Movies , i:number) => {
              return <MovieCard key={i}  imageUrl = {movie.poster_path} movieTitle={movie.original_title} genres={movie.genre_ids} movieId = {movie.id} type="movie"  vote_average={movie.vote_average} backdrop_path={movie.backdrop_path}/>
              
            })}
          </Slider>

        </div>
    </div>
  )
}

export default TrendingNow