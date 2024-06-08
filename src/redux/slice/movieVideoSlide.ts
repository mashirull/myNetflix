import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';


interface InitialState {
    videos : object[]
    isLoadding : boolean ,
    isError : boolean
}


const initialState:InitialState = {
    videos : [],
    isLoadding : false,
    isError: false
}

const BASE_URL = import.meta.env.VITE_MOVIEDB_BASE_URL
const BEARER = import.meta.env.VITE_SECURITY_BEARER


export const  fetchMovieVideo = createAsyncThunk('movieVideo' ,  async(movieId:number)=>{
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: BEARER
        }
      };

      const response = await fetch( `${BASE_URL}movie/${movieId}/videos?language=en-US` , options);

    const data = await response.json()

    return data.results

})

export const MovieVideoSlice = createSlice({
    initialState,
    name : 'video',

    extraReducers : (builder)=>{
        builder.addCase(fetchMovieVideo.pending , (state ) => {
            state.isLoadding = true
        }) , 

        builder.addCase(fetchMovieVideo.fulfilled , (state , action) => {
            state.videos = action.payload
            state.isLoadding = false
        }) ,

        builder.addCase(fetchMovieVideo.rejected , (state) => {
            state.isLoadding = false
            state.isError = true
        })
    },

    reducers : {

    }
})


export default MovieVideoSlice.reducer