import { configureStore } from "@reduxjs/toolkit";
import trendingMovieReducer from '../slice/trandingMovieSlide';
import popularMovieReducer from '../slice/popularMOvieSlide';
import TopRatedMovieReducer from "../slice/TopRatedSlide";
import  tvShowReducer  from "../slice/TvSeriesSlide";
import logoReducer from "../slice/logoSlide";
import movieGenresReducer from "../slice/movieGenres";
import tvGentresReducer from "../slice/tvGenresSlice";
import movieVideoReducer from "../slice/movieVideoSlide";
import imdbReducer from "../slice/imdbSlide";
import movieDetalReducer from "../slice/MOvieDetalsSlide";
import tvDetailsReducer from "../slice/tvDetalsSlide";
import castImagesReducer from "../slice/castImagesSlide";
import movieSearchReducer from "../slice/SearchMovieSlide";
import upcomingMOvieReducer from "../slice/UpcomingMovieSlide";
import addWishlistReducer from "../slice/AddToWishlistSlide";
import LikeReducer  from "../slice/LikeSlide";
import authReducer from "../slice/auth/authSlice"


export const Store = configureStore({
    reducer : {
        TrendingMovie : trendingMovieReducer ,
        popularMovie : popularMovieReducer,
        TopRatedMovie : TopRatedMovieReducer,
        tvShow : tvShowReducer,
        movieLogo : logoReducer,
        movieGenres : movieGenresReducer,
        tvGenres : tvGentresReducer,
        movieVideo  : movieVideoReducer,
        imdbData : imdbReducer,
        movieDetail : movieDetalReducer,
        tvDetail : tvDetailsReducer,
        castImages : castImagesReducer,
        movieWishlist : addWishlistReducer,
        movieSearch : movieSearchReducer,
        upcomingMOvie : upcomingMOvieReducer,
        movieLikeUnlike : LikeReducer,
        UserAuth :  authReducer

    }
})

export type RootState = ReturnType<typeof Store.getState>
export type AppDispatch = typeof Store.dispatch