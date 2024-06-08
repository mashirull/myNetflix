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

const BASE_URL = import.meta.env.VITE_MOVIEDB_BASE_URL
const BEARER = import.meta.env.VITE_SECURITY_BEARER




export const fetchTvDetails = createAsyncThunk('tvDetails' , async (tvId : number) => {
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: BEARER
          
        }
      };
      
    const response = await fetch(`${BASE_URL}tv/${tvId}?language=en-US `,options);
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


