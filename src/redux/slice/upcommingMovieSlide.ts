import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";



interface InitialState {
    upcommingMovie : object[];
    isLodding : boolean;
    isError : boolean
}


const initialState:InitialState = {
    upcommingMovie : [] ,
    isLodding : false,
    isError : false
}




export const fetchUpcommingMovie = createAsyncThunk('upcommingMovie' , async ()=> {

        const options = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNjY1Y2JkOTFlNjNhODM4NDY5N2UwYmI5NTZmM2Q0OSIsInN1YiI6IjYzYTg4ZGEzOTFiNTMwMDA4Y2I3YjJhNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UMZOH18UtDt36r2F8D6wrbDpcvJ7sCKphy02m89OaKQ'
            }
          };

    const response = await fetch(`https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1` , options)
    const data = await response.json()

    return data.results
})




export const upcommingMovieSlice = createSlice({
    initialState ,
     name : 'upcomming_movie' ,
     extraReducers : (builder) => {
        builder.addCase(fetchUpcommingMovie.pending , (state ) => {
            state.isLodding = true
        }) ,

        builder.addCase(fetchUpcommingMovie.fulfilled , (state , action) => {
            state.isLodding = false
            state.upcommingMovie = action.payload
        }) , 

        builder.addCase(fetchUpcommingMovie.rejected ,  (state ) => {
            state.isError = true
            state.isLodding = false
        } )
     },


     reducers : {

     }
})


export default upcommingMovieSlice.reducer