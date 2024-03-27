import { createSlice  ,  createAsyncThunk} from "@reduxjs/toolkit";

interface InitialState {
    logoUrl : string | null 
    isLodding : boolean
}

const initialState:InitialState= { 
    logoUrl: null,
    isLodding : false
}


export const fetchMovieLogo = createAsyncThunk('fetchinglogo' , async (movieId:number)=>{
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNjY1Y2JkOTFlNjNhODM4NDY5N2UwYmI5NTZmM2Q0OSIsInN1YiI6IjYzYTg4ZGEzOTFiNTMwMDA4Y2I3YjJhNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UMZOH18UtDt36r2F8D6wrbDpcvJ7sCKphy02m89OaKQ'
        }
      };

     const responce =  await fetch(`https://api.themoviedb.org/3/movie/${movieId}/images`, options)
      const data = await responce.json()
      console.log(data)
      return data.logos
})

const logoSlice = createSlice({
    name : 'logo' ,
    initialState ,

    extraReducers : (buildre)=>{
        buildre.addCase(fetchMovieLogo.pending , (state ) => {
            state.isLodding = true
        })

        buildre.addCase(fetchMovieLogo.fulfilled , (state , action) => {
            state.logoUrl = action.payload[0]['file_path']
            state.isLodding = false
            
        })

        buildre.addCase(fetchMovieLogo.rejected , (state ) => {
            state.isLodding = false
        })
    } ,

    reducers : {

    }
})


export default logoSlice.reducer