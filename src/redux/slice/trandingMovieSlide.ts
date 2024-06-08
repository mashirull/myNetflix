import {createSlice , createAsyncThunk} from '@reduxjs/toolkit';


interface InitialState {
  trandingMovie: object[] ;
  isLodding : boolean;
  bannerMovie : {} ;
  isError : boolean;
 

}

const initialState:InitialState = {
    trandingMovie : [],
    isLodding : false,
    bannerMovie : {}, 
    isError : false,
}

const BASE_URL = import.meta.env.VITE_MOVIEDB_BASE_URL
const BEARER = import.meta.env.VITE_SECURITY_BEARER


export const fetchTrendingMovieData = createAsyncThunk('fetchMovie' , async (time:string)=>{
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: BEARER ,
        }
      };

     const responce =  await fetch(`${BASE_URL}trending/movie/${time}?language=en-US`, options)
      const data = await responce.json()
      return data.results
      
       
}) 




 export const trendingMovieSlice = createSlice({
    initialState , 
    name  : 'movie' ,

    extraReducers :(builder)=> {
        builder.addCase(fetchTrendingMovieData.pending , ( state) => {
          state.isLodding = true
        }), 

        builder.addCase(fetchTrendingMovieData.fulfilled ,  (state , action) => {
          state.trandingMovie = action.payload
          state.isLodding = false
          state.bannerMovie = action.payload[0]
        }),

        builder.addCase(fetchTrendingMovieData.rejected , (state ) => {
          state.isLodding = false
          state.isError = true
        })
    } ,



    reducers : {



    }
 })


 export const allMovie = trendingMovieSlice.actions
 export default trendingMovieSlice.reducer
  
   