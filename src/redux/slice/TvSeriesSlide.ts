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




export const fetchTvSeries = createAsyncThunk('tv' , async ()=> {

        const options = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNjY1Y2JkOTFlNjNhODM4NDY5N2UwYmI5NTZmM2Q0OSIsInN1YiI6IjYzYTg4ZGEzOTFiNTMwMDA4Y2I3YjJhNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UMZOH18UtDt36r2F8D6wrbDpcvJ7sCKphy02m89OaKQ'
            }
          };

    const response = await fetch(`https://api.themoviedb.org/3/trending/tv/day?language=en-US' ` , options)
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