import Slider from "react-slick";
import MovieCard from "./MovieCard";
import { fetchPopularMovir } from "../redux/slice/popularMOvieSlide";
import {useEffect} from 'react';
import LoaderCard from "./LoaderCard";
import { useAppDispatch, useAppSelector } from "../Hook";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SampleNextArrow from "../customButtom/SampleNextArrow";
import SamplePrevArrow from "../customButtom/SamplePrevArrow";




const PopularMovie = () => {

  interface Movies {
    poster_path : string
    original_title : string
    genre_ids : number
    id : number
  }

    const dispatch = useAppDispatch()
    const PopularMovie = useAppSelector((state:any) => state.popularMovie.popularMoviedata )
    const isLoadding:boolean = useAppSelector((state:any) => state.popularMovie.isLoadding)
    const isError:boolean = useAppSelector((state:any) => state.popularMovie.isError)


    useEffect(() => {
      
      dispatch(fetchPopularMovir())
    
      
    }, [])

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
            slidesToShow: 7,
            slidesToScroll: 1,
            infinite: true,
          }
        },
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 6,
            slidesToScroll: 1,
            infinite: true,
          }
        },
        {
          breakpoint: 1000,
          settings: {
            slidesToShow: 5,
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
            slidesToShow: 2,
            slidesToScroll: 1,
            infinite: true,
          }
        },
      ]
    };
    



  return (
    <div className="mx-8 my-5 mt-44 sm:mx-0 ">
        <h1 className="text-white text-xl pb-4">Popular Movies</h1>
        <div className=" ">
          {isLoadding && <LoaderCard/>}
          {isError  && <h1 className="text-red-500">Something went wrong</h1>}
          <Slider {...settings}>
            {PopularMovie.map((movie:Movies , i:number) => {
              return <MovieCard key={i} imageUrl= {movie.poster_path} movieTitle={movie.original_title} genres={movie.genre_ids} movieId={movie.id} type="movie"/>
            })}
          </Slider>

        </div>
    </div>
  )
}

export default PopularMovie