import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";



interface InitialState {
    popularMoviedata : object[] ;
    isLoadding : boolean;
    isError : boolean;
    total_pages : number
}


const initialState:InitialState = {
    popularMoviedata : [] ,
    isLoadding : false ,
    isError : false,
    total_pages : 0
}


const BASE_URL = import.meta.env.VITE_MOVIEDB_BASE_URL
const BEARER = import.meta.env.VITE_SECURITY_BEARER



export const fetchPopularMovir = createAsyncThunk('popularMovie'  ,  async (page:number)=>{
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: BEARER
        }
      };

    const response = await fetch( `${BASE_URL}movie/popular?language=en-US&page=${page}` , options);

    const data = await response.json()

    return data

})



export const popularMovieSlice = createSlice({
    initialState ,

    name : 'popular',

    extraReducers : (builder) => {
        builder.addCase(fetchPopularMovir.pending , (state ) => {
            state.isLoadding = true
        }) , 

        builder.addCase(fetchPopularMovir.fulfilled , (state , action) => {
            state.popularMoviedata = action.payload.results
            state.isLoadding = false
            state.total_pages = action.payload.total_pages
        }) ,

        builder.addCase(fetchPopularMovir.rejected , (state) => {
            state.isLoadding = false
            state.isError = true
        })
    } ,

   
})


export default popularMovieSlice.reducer