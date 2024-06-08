import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";


const initialState = {
    movieGenres  : [] ,
    isLodding : false
}

const BASE_URL = import.meta.env.VITE_MOVIEDB_BASE_URL
const BEARER = import.meta.env.VITE_SECURITY_BEARER

export const fetchTvGenres = createAsyncThunk('genres' , async()=> {

    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: BEARER
        }
      };
      


    const response = await fetch(`${BASE_URL}genre/tv/list?language=en`,options)
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