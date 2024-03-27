// import React from 'react'
import { FaListUl , FaHeart , FaPlay} from "react-icons/fa";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
// import MOvieDetalsSlide from "../redux/slice/MOvieDetalsSlide";
import { useAppDispatch } from "../Hook";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../Hook";
// import { fetchImdbRatting } from "../redux/slice/imdbSlide";
import { fetchTvDetails } from "../redux/slice/tvDetalsSlide";



const TvDetails = () => {

    interface TvDetail {
        original_name : string ;
        backdrop_path : string ;
        poster_path : string ;
        overview : string ;
        first_air_date : string ;
        genres : object[] ;
        status : string ;
        production_companies : object[] ;
        // spoken_languages : object[] ;
        vote_average : number ;
        // runtime : number ;
        // imdb_id : number ;
        tagline : string ;
        number_of_episodes : number ;
        number_of_seasons : number



    }
    
    
    const detail:TvDetail = useAppSelector(state => state.tvDetail.tvDetail)
    const imdbData = useAppSelector(state => state.imdbData.imdbData)
    const imdbIsLoading = useAppSelector(state => state.imdbData.isLodding)
    
    const vote:number = detail.vote_average
    
    const percentage = (vote/10*100).toFixed(0);
    
    // let hour = null
    // let minuts = null
    
    // const runtime = detail?.runtime

    // for(let i=1 ; i<100 ; i++){
    //     if(60*i >= runtime){
    //         hour = i-1
    //         minuts = runtime - (60*(i-1))
    //         break
    //     }
    // }

    

    const dispatch = useAppDispatch();
    const param:{id:string} = useParams()
    
    
    
    useEffect(()=>{
        dispatch(fetchTvDetails(parseInt(param.id)))
    },[])
         

  return (
    <>
        <div className="">
            <div className=" h-[70px]"></div>
            <h1 className=" text-white w-full bg-slate-400 px-10 py-1 text-xl">Movie Details</h1>
            <div className="  flex relative ">
                <div className="w-[20%] h-[550px] "></div>
                <figure style={{"backgroundImage": `url(https://image.tmdb.org/t/p/original${detail.backdrop_path})`}} className= {`w-[80%] h-[550px] overflow-hidden relative   bg-left-top bg-no-repeat bg-cover  `} >
                    {/* <img src="https://image.tmdb.org/t/p/original/kqSxCsGIT4rqrZTTMpYP8RIzojv.jpg" alt="backdrop"  className="w-full h-full scale-105"/> */}
                    <div className="w-full h-full bigImgGradient absolute top-0 left-0 ">
                        <div className=" text-white mt-20 ml-32 pr-5">
                            <h1 className=" text-[34px] font-medium font-sans">{detail.original_name}<span className=" font-light text-gray-200">({detail.first_air_date?.slice(0,4)})</span></h1>

                            <div className=" text-sm py-1">
                                <span className=" px-2 py-[2px] border border-dotted"><span className=" text-yellow-800 text-md"><span className="bg-yellow-600 text-white px-1 text-xs">IMDb</span> </span> - {imdbIsLoading==false && imdbData}</span>
 
                                <span className=" px-2">{detail.first_air_date}(IN)</span>  
                                <span className=" px-2">{detail.genres?.map((genre,i)=> <span key={i}>{genre.name} , </span>)}</span> 
                                
                            </div> 

                            <div className="flex items-center my-5">
                                <div className="flex mr-5 items-center">
                                    <div  className="h-16 w-16 text-white bg-sky-950 rounded-full p-1 hover:scale-110 cursor-pointer">
                                        <CircularProgressbar value={percentage}  text={`${percentage}%`} strokeWidth={7} styles={buildStyles({textColor: 'white' , textSize : '25px' ,trailColor:'#19261C' , pathColor: '#09ED24'})}/>
                                    </div>
                                    <div className=" pl-3 font-semibold text-sm">
                                        <p>User <br /> Score</p>
                                    </div>

                                </div>
                                <div className="p-4 bg-sky-950 rounded-full h-10 w-10 flex items-center justify-center cursor-pointer"><span><FaListUl/></span></div>
                                <div className=" p-4 bg-sky-950 rounded-full h-10 w-10 flex items-center justify-center mx-5 cursor-pointer"><span><FaHeart/></span></div>
                                <div className=" p-4 flex items-center cursor-pointer hover:text-gray-400 font-medium"><span className="mr-3"><FaPlay/></span> <span>Play Trailer</span> </div>
                            </div>

                            <h1 className=" font-serif text-md text-gray-400">" {detail.tagline} "</h1>
                            <div>
                                <h1 className="my-3 text-xl">Overview</h1>
                                <p className=" text-sm">{detail.overview}</p>
                            </div>
                            
                            <div className="flex items-center justify-between w-[80%] my-7">
                                <div>
                                    <h1 className="font-semibold text-md">Seasons</h1>
                                    <p className=" text-sm"><span >{detail.number_of_seasons}</span></p>
                                </div>
                                <div>
                                    <h1 className="font-semibold text-md">Episodes</h1>
                                    <p className=" text-sm">{detail.number_of_episodes}</p>
                                </div>
                                <div>
                                    <h1 className="font-semibold text-md">Status</h1>
                                    <p className=" text-sm">{detail.status}</p>
                                </div>
                            </div>

                        </div>
                    </div>
                </figure>

                <div className="w-[320px] h-[500px]  absolute left-10 bottom-6 rounded-md">
                    <img src={`https://image.tmdb.org/t/p/original${detail.poster_path}`} alt="poster" className="w-full h-full rounded-md" />
                </div>
            </div>
        </div>
    </>
  )
}

export default TvDetails;