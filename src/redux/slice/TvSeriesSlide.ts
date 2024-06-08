import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";



interface InitialState {
    tvShow : object[];
    isLodding : boolean;
    isError : boolean
}


const initialState:InitialState = {
    tvShow : [] ,
    isLodding : false,
    isError : false
}

const BASE_URL = import.meta.env.VITE_MOVIEDB_BASE_URL
const BEARER = import.meta.env.VITE_SECURITY_BEARER




export const fetchTvSeries = createAsyncThunk('tv' , async ()=> {

        const options = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: BEARER
            }
          };

    const response = await fetch(`${BASE_URL}trending/tv/day?language=en-US' ` , options)
    const data = await response.json()

    return data.results
})




export const tvShowSlice = createSlice({
    initialState ,
     name : 'tv_Show' ,
     extraReducers : (builder) => {
        builder.addCase(fetchTvSeries.pending , (state ) => {
            state.isLodding = true
        }) ,

        builder.addCase(fetchTvSeries.fulfilled , (state , action) => {
            state.isLodding = false
            state.tvShow = action.payload
        }) , 

        builder.addCase(fetchTvSeries.rejected ,  (state ) => {
            state.isError = true
            state.isLodding = false
        } )
     },


     reducers : {

     }
})



export default tvShowSlice.reducer