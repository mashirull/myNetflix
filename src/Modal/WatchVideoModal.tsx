import { useEffect } from "react";
import { fetchMovieVideo } from "../redux/slice/movieVideoSlide";
import { useAppDispatch, useAppSelector } from "../Hook";

const WatchVideoModal = ({setIsWatch , movieId}:any) => {

    const videos = useAppSelector(state => state?.movieVideo?.videos)
    console.log(videos)
    const isLoading = useAppSelector(state => state.movieVideo.isLoadding)
    // const isError = useAppSelector(state => state.movieVideo.isError)

    const dispatch = useAppDispatch()

    const trailerVideo:any = videos?.filter((elem:any) => elem.type === 'Trailer')

    useEffect(()=>{
        dispatch(fetchMovieVideo(movieId))
    },[])

  return (
    <div className=" w-full h-[100vh] absolute top-0 left-0 bottom-0 bg-black bg-opacity-75 flex items-center justify-center z-[9999999999999999999]">
        <div className=" w-[90%] h-[85%] bg-black relative flex items-center justify-center">
            <button className=" text-3xl absolute -top-8 -right-5 text-red-700 p-1 bg-black " onClick={()=>setIsWatch(false)}>X</button>
            {isLoading ? <h1 className=" text-2xl text-white">Please Wait a Moment....</h1> : <iframe src={`https://www.youtube.com/embed/${trailerVideo[0]?.key}`}  frameBorder="0" className="w-full h-full"></iframe>}

            {/* {isError && <h1 className=" text-red-700 text-2xl">Something went wrong</h1>} */}
        </div>
    </div>
  )
}

export default WatchVideoModal;