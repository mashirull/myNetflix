import {createSlice , createAsyncThunk} from '@reduxjs/toolkit';


interface InitialState {
  movieDetail: {} ;
  isLodding : boolean;
  isError : boolean

}

const initialState:InitialState = {
    movieDetail : {},
    isLodding : false, 
    isError : false
}


export const fetchMovieDetals = createAsyncThunk('fetchMoviedetals' , async (movieId : Number)=>{
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNjY1Y2JkOTFlNjNhODM4NDY5N2UwYmI5NTZmM2Q0OSIsInN1YiI6IjYzYTg4ZGEzOTFiNTMwMDA4Y2I3YjJhNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UMZOH18UtDt36r2F8D6wrbDpcvJ7sCKphy02m89OaKQ'
        }
      };

     const responce =  await fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`, options)
      const data = await responce.json()
      return data
       
}) 




 export const movieDetalSlice = createSlice({
    initialState , 
    name  : 'movieDetails' ,

    extraReducers :(builder)=> {
        builder.addCase(fetchMovieDetals.pending , ( state) => {
          state.isLodding = true
        }), 

        builder.addCase(fetchMovieDetals.fulfilled ,  (state , action) => {
          state.movieDetail = action.payload
          state.isLodding = false
          
        }),

        builder.addCase(fetchMovieDetals.rejected , (state ) => {
          state.isLodding = false
          state.isError = true
        })
    } ,



    reducers : {



    }
 })


//  export const allMovie = movieSlice.actions
 export default movieDetalSlice.reducer
  
   

