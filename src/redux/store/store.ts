import { configureStore } from "@reduxjs/toolkit";
import movieReducer from '../slice/trandingMovieSlide';
import popularMovieReducer from '../slice/popularMOvieSlide';
import upcommingMovieReducer from "../slice/upcommingMovieSlide";
import  tvShowReducer  from "../slice/TvSeriesSlide";
import logoReducer from "../slice/logoSlide";
import movieGenresReducer from "../slice/movieGenres";
import tvGentresReducer from "../slice/tvGenresSlice";
import movieVideoReducer from "../slice/movieVideoSlide";
import imdbReducer from "../slice/imdbSlide";
import movieDetalReducer from "../slice/MOvieDetalsSlide";
import tvDetailsReducer from "../slice/tvDetalsSlide";
import castImagesReducer from "../slice/castImagesSlide"


export const Store = configureStore({
    reducer : {
        allMovie : movieReducer ,
        popularMovie : popularMovieReducer,
        upcommingMovie : upcommingMovieReducer,
        tvShow : tvShowReducer,
        movieLogo : logoReducer,
        movieGenres : movieGenresReducer,
        tvGenres : tvGentresReducer,
        movieVideo  : movieVideoReducer,
        imdbData : imdbReducer,
        movieDetail : movieDetalReducer,
        tvDetail : tvDetailsReducer,
        castImages : castImagesReducer

    }
})

export type RootState = ReturnType<typeof Store.getState>
export type AppDispatch = typeof Store.dispatch