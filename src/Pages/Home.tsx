// import React from 'react'
import BannerSection from "../component/BannerSection";
import PopularMovie from "../component/PopularMovie";
import UpcommingMovie from "../component/TopRatedMovie";
import TvShow from "../component/TvShow";
import { useAppSelector } from "../Hook";
import MovieError from "../Error/MovieError";

const Home = () => {

  const isError = useAppSelector((state:any) => state.TrendingMovie.isError)
 

  return (
    <>
    { isError ? <div className="pt-52"><MovieError/></div> :<span>
      <BannerSection/>
      <PopularMovie/>
      <UpcommingMovie/>
      <TvShow/>
      </span>}
    </>
  )
}

export default Home