import MovieCard from "./MovieCard";
import LoaderCard from "./LoaderCard";
import { useEffect} from 'react';
import { fetchTvSeries } from "../redux/slice/TvSeriesSlide";
import { useAppDispatch, useAppSelector } from "../Hook";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SampleNextArrow from "../customButtom/SampleNextArrow";
import SamplePrevArrow from "../customButtom/SamplePrevArrow";


const TvShow = () => {

    interface TVShow {
        poster_path : string ;
        name : string ;
        genre_ids : number;
        type : string;
        id :  number
      }
    
        // const dispatch = useDispatch()
        const tvShow = useAppSelector((state:any) => state.tvShow.tvShow )
        const isLoadding:boolean = useAppSelector((state:any) => state.tvShow.isLodding)
        const isError:boolean = useAppSelector((state:any) => state.tvShow.isError)


      const dispatch = useAppDispatch()
      

        useEffect(() => {
          dispatch(fetchTvSeries())
        
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
    <div className=" mx-8 my-5 sm:mx-0">
        <h1 className="text-white text-xl pb-4">Tv Shows</h1>
        <div className="">
        {isLoadding && <LoaderCard/>}
        {isError  && <h1 className="text-red-500">Something went wrong</h1>}
        <Slider {...settings}>
          {tvShow.map((tvShow:TVShow , i:number) => {
              return <MovieCard key={i} imageUrl= {tvShow.poster_path} movieTitle={tvShow.name} genres={tvShow.genre_ids} type = 'tv' movieId={tvShow.id}/>
          })}
        </Slider>
        </div>
    </div>
  )
}

export default TvShow