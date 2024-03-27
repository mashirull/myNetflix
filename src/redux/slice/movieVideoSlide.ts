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


export const  fetchMovieVideo = createAsyncThunk('movieVideo' ,  async(movieId:number)=>{
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNjY1Y2JkOTFlNjNhODM4NDY5N2UwYmI5NTZmM2Q0OSIsInN1YiI6IjYzYTg4ZGEzOTFiNTMwMDA4Y2I3YjJhNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UMZOH18UtDt36r2F8D6wrbDpcvJ7sCKphy02m89OaKQ'
        }
      };

      const response = await fetch( `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US` , options);

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