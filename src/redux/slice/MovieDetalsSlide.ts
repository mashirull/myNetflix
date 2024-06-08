import {createSlice , createAsyncThunk} from '@reduxjs/toolkit';


interface InitialState {
  movieDetail: {} ;
  isLodding : boolean;
  isError : boolean

}

const initialState:InitialState = {
    movieDetail : {},
    isLodding : false, 
    isError : false
}

const BASE_URL = import.meta.env.VITE_MOVIEDB_BASE_URL
const BEARER = import.meta.env.VITE_SECURITY_BEARER


export const fetchMovieDetals = createAsyncThunk('fetchMoviedetals' , async (movieId : Number)=>{
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: BEARER
        }
      };

     const responce =  await fetch(`${BASE_URL}movie/${movieId}?language=en-US`, options)
      const data = await responce.json()
      return data
       
}) 




 export const movieDetalSlice = createSlice({
    initialState , 
    name  : 'movieDetails' ,

    extraReducers :(builder)=> {
        builder.addCase(fetchMovieDetals.pending , ( state) => {
          state.isLodding = true
        }), 

        builder.addCase(fetchMovieDetals.fulfilled ,  (state , action) => {
          state.movieDetail = action.payload
          state.isLodding = false
          
        }),

        builder.addCase(fetchMovieDetals.rejected , (state ) => {
          state.isLodding = false
          state.isError = true
        })
    } ,



    reducers : {



    }
 })


//  export const allMovie = movieSlice.actions
 export default movieDetalSlice.reducer
  
   

