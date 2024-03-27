import { createSlice  ,  createAsyncThunk} from "@reduxjs/toolkit";

interface InitialState {
    castData :  {} ;
    isLoading : boolean
}

const initialState:InitialState= { 
    castData: {} ,
    isLoading : false
}


export const fetchCastData = createAsyncThunk('fetchCastImage' , async (movieId:number)=>{
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNjY1Y2JkOTFlNjNhODM4NDY5N2UwYmI5NTZmM2Q0OSIsInN1YiI6IjYzYTg4ZGEzOTFiNTMwMDA4Y2I3YjJhNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UMZOH18UtDt36r2F8D6wrbDpcvJ7sCKphy02m89OaKQ'
        }
      };

     const responce =  await fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`, options)
      const data = await responce.json()
      return data
})

const castImageslice = createSlice({
    name : 'cast' ,
    initialState ,

    extraReducers : (builder)=>{

        builder.addCase(fetchCastData.pending , (state) => {
            state.isLoading = true
        })


        builder.addCase(fetchCastData.fulfilled , (state , action) => {
            state.castData = action.payload
            state.isLoading = false
            
        })

        builder.addCase(fetchCastData.rejected , (state) => {
            state.isLoading = false
        })
    } ,

    reducers : {

    }
})


export default castImageslice.reducer