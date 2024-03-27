import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";


const initialState = {
    imdbData  : '' ,
    isLodding : false
}

export const fetchImdbRatting = createAsyncThunk('movieImdb' , async(imdb_id:number)=> {

    
      


    const response = await fetch(`http://www.omdbapi.com/?i=${imdb_id}&apikey=2c94c6c2`)
    const data  =  await response.json()
    return data

})

export const ImdbSlice = createSlice({
    name : 'imdb' ,
    initialState ,

    extraReducers : (builder) => {
        builder.addCase(fetchImdbRatting.pending , (state) => {
            state.isLodding = true
        }),

        builder.addCase(fetchImdbRatting.fulfilled , (state , action) => {
            state.imdbData = action.payload.imdbRating
            state.isLodding = false
        } )
    },

    reducers : {}
})

export default ImdbSlice.reducer