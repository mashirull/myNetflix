import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";



interface InitialState {
    topRatedMoviesData : object[];
    isLodding : boolean;
    isError : boolean;
    total_pages : number
}


const initialState:InitialState = {
    topRatedMoviesData : [] ,
    isLodding : false,
    isError : false,
    total_pages : 0
}


const BASE_URL = import.meta.env.VITE_MOVIEDB_BASE_URL
const BEARER = import.meta.env.VITE_SECURITY_BEARER

export const fetchTopRatedgMovie = createAsyncThunk('upcommingMovie' , async (page:number)=> {

        const options = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: BEARER
            }
          };

    const response = await fetch(`${BASE_URL}movie/top_rated?language=en-US&page=${page}` , options)
    const data = await response.json()

    return data
})




export const TopRatedMovieSlice = createSlice({
    initialState ,
     name : 'topRated_movie' ,
     extraReducers : (builder) => {
        builder.addCase(fetchTopRatedgMovie.pending , (state ) => {
            state.isLodding = true
        }) ,

        builder.addCase(fetchTopRatedgMovie.fulfilled , (state , action) => {
            state.isLodding = false
            state.topRatedMoviesData = action.payload.results
            state.total_pages = action.payload.total_pages
        }) , 

        builder.addCase(fetchTopRatedgMovie.rejected ,  (state ) => {
            state.isError = true
            state.isLodding = false
        } )
     },


     reducers : {

     }
})


export default TopRatedMovieSlice.reducer