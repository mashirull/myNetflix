import {createSlice , createAsyncThunk} from '@reduxjs/toolkit';


interface InitialState {
    searchData: object[] ;
    isLodding : boolean;
    isError : boolean,
    allInfo : {}
}


const initialState:InitialState  =  {
    searchData : [],
    isLodding : false,
    isError : false,
    allInfo : {}
}


const BASE_URL = import.meta.env.VITE_MOVIEDB_BASE_URL
const BEARER = import.meta.env.VITE_SECURITY_BEARER


export const fetchSearchMovieData = createAsyncThunk('movieSearch' , async(para:{queryString : string , pageNumber:number})=>{
  const {queryString ,pageNumber} = para
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: BEARER
        }
      };


      const responce = await fetch(`${BASE_URL}search/movie?query=${queryString}&include_adult=false&language=en-US&page=${1}`, options)
      const data = await responce.json()
      // console.log(pageNumber)
      console.log(data)
      // console.log(queryString)
      return data
})


export const movieDataSlice = createSlice({
    initialState,
    name :  "searchData",
    extraReducers :(builder)=> {
        builder.addCase(fetchSearchMovieData.pending , ( state) => {
          state.isLodding = true
        }), 

        builder.addCase(fetchSearchMovieData.fulfilled ,  (state , action) => {
          state.searchData = action.payload.results
          state.allInfo = action.payload
          state.isLodding = false
          
        }),

        builder.addCase(fetchSearchMovieData.rejected , (state ) => {
          state.isLodding = false
          state.isError = true
        })
    } ,
    

})

export default movieDataSlice.reducer