// import React from 'react'
import { FaListUl , FaHeart , FaPlay} from "react-icons/fa";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import CircularProgressBar from "./CircularProgressBar";
// import MOvieDetalsSlide from "../redux/slice/MOvieDetalsSlide";
import { fetchMovieDetals } from "../redux/slice/MOvieDetalsSlide";
import { useAppDispatch } from "../Hook";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../Hook";
import { fetchImdbRatting } from "../redux/slice/imdbSlide";
import CastImageCard from "./CastImageCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SampleNextArrow from "../customButtom/SampleNextArrow";
import SamplePrevArrow from "../customButtom/SamplePrevArrow";
import Slider from "react-slick";
import { fetchCastData } from "../redux/slice/castImagesSlide";
import WatchVideoModal from "../Modal/WatchVideoModal";
import DetailsLodder from "./DetailsLodder";




const MovieDetails = () => {

    interface MovieDetail {
        original_title : string ;
        backdrop_path : string ;
        poster_path : string ;
        overview : string ;
        release_date : string ;
        genres : object[] ;
        status : string ;
        production_companies : object[] ;
        spoken_languages : object[] ;
        vote_average : number ;
        runtime : number ;
        imdb_id : number ;
        tagline : string ;
        revenue : number ;
        budget : number;
        homepage : string ;
        id : number
    }
    
    
    const detail:MovieDetail = useAppSelector(state => state.movieDetail.movieDetail)
    const DetailIsLodder = useAppSelector(state => state.movieDetail.isLodding)
    const imdbData = useAppSelector(state => state.imdbData.imdbData)
    const castImages =  useAppSelector(state => state.castImages.castData)
    const imdbIsLoading = useAppSelector(state => state.imdbData.isLodding)
    const [isWatchVideo ,  setIsWatchVideo] = useState(false)
    

    let hour = null
    let minuts = null
    
    const runtime = detail?.runtime

    for(let i=1 ; i<100 ; i++){
        if(60*i >= runtime){
            hour = i-1
            minuts = runtime - (60*(i-1))
            break
        }
    }

    

    const dispatch = useAppDispatch();
    const param:{id:string} = useParams()
    
    
    
    useEffect(()=>{
       window.scrollTo(0,0)
        dispatch(fetchMovieDetals(parseInt(param.id)))
    },[])
    
   
     useEffect(()=>{
         if(Object.keys(detail).length !== 0){
             dispatch(fetchImdbRatting(detail?.imdb_id))
             dispatch(fetchCastData(detail?.id))
         }

     },[detail])
    

    
    const settings = {
        className: 'center',
        dots: false,
        infinite: false,
        speed: 400,
        slidesToShow: 6,
        slidesToScroll: 3,
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
              breakpoint: 1200,
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
                slidesToShow: 3,
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

    const playTrailer = () => {
        setIsWatchVideo(true)
    }

        

  return (
    <>
        {isWatchVideo && <WatchVideoModal  setIsWatch = {setIsWatchVideo} movieId = {detail?.id}/>}
        <div className="">
            <div className=" h-[70px]"></div>
            <h1 className="  w-full bg-sky-950 px-10 py-1 text-center text-sky-700 text-lg">Movie Details</h1>
            
            {DetailIsLodder ? <DetailsLodder/> : <div className="  flex  relative  lg:justify-center  border-red-700 ">
                <div className="w-[20%] h-[550px] 1200px:w-[25%]   lg:hidden"></div>
                <figure style={{"backgroundImage": `url(https://image.tmdb.org/t/p/original${detail.backdrop_path})`}} className= {`w-[80%] 1200px:w-[75%] lg:px-5 mediaQ lg:bg-center h-[550px] overflow-hidden relative   bg-left-top bg-no-repeat bg-cover  `} >
                    {/* <img src="https://image.tmdb.org/t/p/original/kqSxCsGIT4rqrZTTMpYP8RIzojv.jpg" alt="backdrop"  className="w-full h-full scale-105"/> */}
                    <div className="w-full h-full bigImgGradient absolute top-0 left-0 ">
                        <div className=" text-white mt-20 lg:mt-5 ml-32 pr-5 lg:ml-0 lg:px-10">
                            <h1 className=" text-[34px] 460:text-[28px] font-medium font-sans">{detail.original_title}<span className=" font-light text-gray-200 460:text-[14px]">({detail.release_date?.slice(0,4)})</span></h1>

                            <div className=" text-sm 460:text-[10px] py-1">
                                <span className=" px-2 py-[2px] border border-dotted"><span className=" text-yellow-800 text-md"><span className="bg-yellow-600 text-white px-1 text-xs">IMDb</span> </span> - {imdbIsLoading==false && imdbData}</span>
 
                                <span className=" px-2">{detail.release_date}(IN)</span>  
                                <span className=" px-2">{detail.genres?.map((genre,i)=> <span key={i}>{genre.name} , </span>)}</span> 
                                
                            </div> 

                            <div className="flex items-center my-5">
                                <div className="flex mr-5 items-center">
                                    <CircularProgressBar vote = {detail.vote_average} h={16} w= {16}/>
                                    <div className=" pl-3 font-semibold text-sm">
                                        <p className=" 460:text-[10px] 460:hidden">User <br /> Score</p>
                                    </div>

                                </div>
                                <div className="p-4 bg-sky-950 rounded-full h-10 w-10 flex items-center justify-center cursor-pointer"><span><FaListUl/></span></div>
                                <div className=" p-4 bg-sky-950 rounded-full h-10 w-10 flex items-center justify-center mx-5 460:mx-1 cursor-pointer"><span><FaHeart/></span></div>
                                <div className=" p-4 flex items-center cursor-pointer hover:text-gray-400 font-medium" onClick={playTrailer}><span className="mr-3"><FaPlay/></span> <span className=" 460:text-[12px]">Play Trailer</span> </div>
                            </div>

                            <h1 className=" font-serif text-md text-gray-400">" {detail.tagline} "</h1>
                            <div>
                                <h1 className="my-3 text-xl">Overview</h1>
                                <p className=" text-sm">{detail.overview}</p>
                            </div>
                            
                            <div className="flex items-center justify-between w-[80%] lg:w-[100%] my-7">
                                <div>
                                    <h1 className="font-semibold text-md">Duration</h1>
                                    <p className=" text-sm"><span >{`${hour}h ${minuts}m`}</span></p>
                                </div>
                                <div>
                                    <h1 className="font-semibold text-md">Language</h1>
                                    <p className=" text-sm">{detail?.spoken_languages?.slice(0,1).map((ele , i)=> <span key={i}>{ele.english_name}</span>)}</p>
                                </div>
                                <div>
                                    <h1 className="font-semibold text-md">Status</h1>
                                    <p className=" text-sm">{detail.status}</p>
                                </div>
                            </div>

                        </div>
                    </div>
                </figure>

                <div className="w-[320px] lg:hidden h-[500px]  absolute left-10 bottom-6 rounded-md bg-sky-950">
                    <img src={`https://image.tmdb.org/t/p/original${detail.poster_path}`} alt="poster" className="w-full h-full rounded-md" />
                </div>
            </div>}
            <div className=" flex lg:flex-col lg:justify-center lg:items-center">
                <div className=" h-[450px] lg:h-[365px] w-[80%] lg:w-[100%]  overflow-hidden ml-10 lg:ml-0">
                    <h1 className=" text-white text-2xl py-3 lg:px-3">Top Billed Cast </h1>
                    <Slider {...settings}>
                        {castImages?.cast?.map((elem:any ,i:number)=> <CastImageCard key={i} profile_path= {elem.profile_path} original_name= {elem.original_name} character= {elem.character}/>)}
                    </Slider>
                </div>
                <div className=" h-[auto] w-[28%] lg:w-[95%] text-white p-4 ml-1  flex flex-col items-stretch justify-between">
                    <h1 className=" py-0 my-0 text-xl">Other Details</h1>
                    <hr className=" mb-3" />
                    <h1 className=" text-lg">Production Companies</h1>
                    <div className=" mb-5 lg:flex lg:flex-wrap">
                        {detail?.production_companies?.map((elem , i) => {
                            return (
                                <div className="my-2 bg-white p-2 lg:mx-4" key={i}>
                                    <div className=" mr-4 w-[5.6rem] h-[2.7rem] "><img src={`https://image.tmdb.org/t/p/original${elem.logo_path}`} alt= {elem.name}  className=" h-full w-full"/> </div>   
                                    <p className=" text-xs pt-2 text-black">{elem.name}</p>    
                                </div>
                            )
                        })}
                    </div>
                    <div className="mb-5">
                        <h1 className=" text-lg">Original Language</h1>
                        <p className=" font-light text-sm">{detail?.spoken_languages?.slice(0,1).map((ele , i)=> <span key={i}>{ele.english_name}</span> )}</p>
                    </div>
                    <div className="mb-5">
                        <h1 className=" text-lg">Budget</h1>
                        <p className="font-light text-sm">{detail?.budget}</p>
                    </div>
                    <div className="mb-5">
                        <h1 className=" text-lg">Revenue</h1>
                        <p className="font-light text-sm">{detail?.revenue}</p>
                    </div>
                    <a href={detail.homepage} target="black" className=" bg-sky-900 p-1  my-3 text-center">See Movie Homepage</a>
                </div>
            </div>
        </div>
    </>
  )
}

export default MovieDetails