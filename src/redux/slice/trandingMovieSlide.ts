import {createSlice , createAsyncThunk} from '@reduxjs/toolkit';


interface InitialState {
  trandingMovie: object[] ;
  isLodding : boolean;
  bannerMovie : {} ;
  isError : boolean

}

const initialState:InitialState = {
    trandingMovie : [],
    isLodding : false,
    bannerMovie : {}, 
    isError : false
}


export const fetchAllMovieData = createAsyncThunk('fetchMovie' , async ()=>{
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNjY1Y2JkOTFlNjNhODM4NDY5N2UwYmI5NTZmM2Q0OSIsInN1YiI6IjYzYTg4ZGEzOTFiNTMwMDA4Y2I3YjJhNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UMZOH18UtDt36r2F8D6wrbDpcvJ7sCKphy02m89OaKQ'
        }
      };

     const responce =  await fetch('https://api.themoviedb.org/3/trending/movie/day?language=en-US', options)
      const data = await responce.json()
      return data.results
      
       
}) 




 export const movieSlice = createSlice({
    initialState , 
    name  : 'movie' ,

    extraReducers :(builder)=> {
        builder.addCase(fetchAllMovieData.pending , ( state) => {
          state.isLodding = true
        }), 

        builder.addCase(fetchAllMovieData.fulfilled ,  (state , action) => {
          state.trandingMovie = action.payload
          state.isLodding = false
          state.bannerMovie = action.payload[0]

          
        }),

        builder.addCase(fetchAllMovieData.rejected , (state ) => {
          state.isLodding = false
          state.isError = true
        })
    } ,



    reducers : {



    }
 })


 export const allMovie = movieSlice.actions
 export default movieSlice.reducer
  
   