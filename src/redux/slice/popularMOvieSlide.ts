import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";



interface InitialState {
    popularMoviedata : object[] ;
    isLoadding : boolean;
    isError : boolean
}


const initialState:InitialState = {
    popularMoviedata : [] ,
    isLoadding : false ,
    isError : false
}



export const fetchPopularMovir = createAsyncThunk('popularMovie'  ,  async ()=>{
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNjY1Y2JkOTFlNjNhODM4NDY5N2UwYmI5NTZmM2Q0OSIsInN1YiI6IjYzYTg4ZGEzOTFiNTMwMDA4Y2I3YjJhNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UMZOH18UtDt36r2F8D6wrbDpcvJ7sCKphy02m89OaKQ'
        }
      };

    const response = await fetch( 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1' , options);

    const data = await response.json()

    return data.results

})



export const popularMovieSlice = createSlice({
    initialState ,

    name : 'popular',

    extraReducers : (builder) => {
        builder.addCase(fetchPopularMovir.pending , (state ) => {
            state.isLoadding = true
        }) , 

        builder.addCase(fetchPopularMovir.fulfilled , (state , action) => {
            state.popularMoviedata = action.payload
            state.isLoadding = false
        }) ,

        builder.addCase(fetchPopularMovir.rejected , (state) => {
            state.isLoadding = false
            state.isError = true
        })
    } ,

   reducers : {

   }
})


export default popularMovieSlice.reducer