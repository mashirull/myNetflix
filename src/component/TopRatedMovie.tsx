
import MovieCard from "./MovieCard";
import LoaderCard from "./LoaderCard";
import {useEffect} from 'react';
import { fetchTopRatedgMovie} from "../redux/slice/TopRatedSlide";
import { useAppDispatch, useAppSelector } from "../Hook";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SampleNextArrow from "../customButtom/SampleNextArrow";
import SamplePrevArrow from "../customButtom/SamplePrevArrow";

const UpcommingMovie = ():JSX.Element => {

  interface TopRatedMOvie {
    poster_path : string ;
    original_title : string;
    genre_ids : number;
    id : number;
    vote_average : number,
    backdrop_path : string
  }

    const topRatedMovie = useAppSelector((state:any) => state.TopRatedMovie.topRatedMoviesData)
     const isLodding:boolean = useAppSelector((state:any) => state.TopRatedMovie.isLodding)
     const isError:boolean = useAppSelector((state:any) => state.TopRatedMovie.isError)
     const dispatch = useAppDispatch()


     useEffect(() => {
        dispatch(fetchTopRatedgMovie(1))
     },[])

     const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 7,
      slidesToScroll: 1,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
      responsive: [
        {
          breakpoint: 1300,
          settings: {
            slidesToShow: 6,
            slidesToScroll: 2,
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
      <div className=" mx-8 my-5 sm:mx-0">
          <h1 className="text-white text-xl pb-4">Top Rated</h1>
          <div className=" ">
            {isLodding && <LoaderCard/>}
            {isError && <h1 className="text-red-500">Something went Wrong</h1>}
            <Slider {...settings}>
              {topRatedMovie.map((movie:TopRatedMOvie , i:number) => {
                return <MovieCard  key={i} imageUrl={movie.poster_path} movieTitle={movie.original_title} genres={movie.genre_ids} movieId={movie.id} type="movie" vote_average={movie.vote_average} backdrop_path={movie.backdrop_path}/>
              })}
            </Slider>
          </div>
      </div>
    )
}

export default UpcommingMovie