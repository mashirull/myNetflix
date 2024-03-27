import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";

interface InitialState {
    tvDetail : object 
    isLoading : boolean 
    isError : boolean
}


const initialState:InitialState = {
    tvDetail : {} ,
    isLoading : false ,
    isError : false
}




export const fetchTvDetails = createAsyncThunk('tvDetails' , async (tvId : number) => {
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNjY1Y2JkOTFlNjNhODM4NDY5N2UwYmI5NTZmM2Q0OSIsInN1YiI6IjYzYTg4ZGEzOTFiNTMwMDA4Y2I3YjJhNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UMZOH18UtDt36r2F8D6wrbDpcvJ7sCKphy02m89OaKQ'
        }
      };
      
    const response = await fetch(`https://api.themoviedb.org/3/tv/${tvId}?language=en-US `,options);
    const data = await response.json();
    return data
})


export const tvDetailsSlice = createSlice({
    name : 'tvDe',
    initialState,
    extraReducers : (builder)=> {
        builder.addCase(fetchTvDetails.pending , (state)=> {
            state.isLoading = true
        })

        builder.addCase(fetchTvDetails.fulfilled , (state , action) => {
            state.isLoading = false;
            state.tvDetail = action.payload
        })
        builder.addCase(fetchTvDetails.rejected , (state) => {
            state.isError = true;
            state.isLoading = false
        })
    },
    reducers : {

    }
})


export default tvDetailsSlice.reducer;


