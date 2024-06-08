import {createSlice , createAsyncThunk} from '@reduxjs/toolkit';

interface InitialState {
    UpcomingMovieData: object[] ;
    isLodding : boolean;
    isError : boolean;
    total_pages : number
  
  }
  
  const initialState:InitialState = {
    UpcomingMovieData : [],
      isLodding : false, 
      isError : false,
      total_pages : 0
  }


const BASE_URL = import.meta.env.VITE_MOVIEDB_BASE_URL
const BEARER = import.meta.env.VITE_SECURITY_BEARER



export const fetchUpcomingMOvie = createAsyncThunk('upcomingdata' ,  async (page:number)=>{
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: BEARER
        }
      };
    const responce =  await fetch(`${BASE_URL}movie/upcoming?language=en-US&page=${page}` , options)
    const data = await responce.json()
    return data

})


export const upcomingMovieSlice = createSlice({
    name : 'upcomingmovie',
    initialState ,
    extraReducers : (builder:any) => {
        builder.addCase(fetchUpcomingMOvie.pending , (state:any) => {
            state.isLodding = true
        }),
        builder.addCase(fetchUpcomingMOvie.fulfilled ,  (state , action) => {
            state.UpcomingMovieData = action.payload.results
            state.isLodding = false
            state.total_pages = action.payload.total_pages
            
          }),
  
          builder.addCase(fetchUpcomingMOvie.rejected , (state ) => {
            state.isLodding = false
            state.isError = true
          })
    },
    
})

export default upcomingMovieSlice.reducer