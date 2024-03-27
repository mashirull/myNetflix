import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";


const initialState = {
    movieGenres  : [] ,
    isLodding : false
}

export const fetchTvGenres = createAsyncThunk('genres' , async()=> {

    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNjY1Y2JkOTFlNjNhODM4NDY5N2UwYmI5NTZmM2Q0OSIsInN1YiI6IjYzYTg4ZGEzOTFiNTMwMDA4Y2I3YjJhNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UMZOH18UtDt36r2F8D6wrbDpcvJ7sCKphy02m89OaKQ'
        }
      };
      


    const response = await fetch('https://api.themoviedb.org/3/genre/tv/list?language=en',options)
    const data  =  await response.json()

    return data

})

export const TvGenresSlice = createSlice({
    name : 'genresMovie' ,
    initialState ,

    extraReducers : (builder) => {
        builder.addCase(fetchTvGenres.pending , (state) => {
            state.isLodding = true
        }),

        builder.addCase(fetchTvGenres.fulfilled , (state , action) => {
            state.movieGenres = action.payload.genres
            state.isLodding = false
        } )
    },

    reducers : {}
})

export default TvGenresSlice.reducer