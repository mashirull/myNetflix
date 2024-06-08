import { createSlice  ,  createAsyncThunk} from "@reduxjs/toolkit";

interface InitialState {
    logoUrl : string | null 
    isLodding : boolean
}

const initialState:InitialState= { 
    logoUrl: null,
    isLodding : false
}

const BASE_URL = import.meta.env.VITE_MOVIEDB_BASE_URL
const BEARER = import.meta.env.VITE_SECURITY_BEARER


export const fetchMovieLogo = createAsyncThunk('fetchinglogo' , async (movieId:number)=>{
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: BEARER
        }
      };

     const responce =  await fetch(`${BASE_URL}movie/${movieId}/images`, options)
      const data = await responce.json()
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