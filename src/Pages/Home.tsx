// import React from 'react'
import BannerSection from "../component/BannerSection";
import PopularMovie from "../component/PopularMovie";
import UpcommingMovie from "../component/TopRatedMovie";
import TvShow from "../component/TvShow";

const Home = () => {
  return (
    <>
        <BannerSection/>
        <PopularMovie/>
        <UpcommingMovie/>
        <TvShow/>
    </>
  )
}

export default Home