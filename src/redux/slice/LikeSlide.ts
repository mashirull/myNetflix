import  {createSlice}   from "@reduxjs/toolkit";
import { getLickedListFromLS } from "../../lib/getLikedlistFromLS";


interface InitialState {
    likedMovie : object[]
}

const initialState:InitialState = {
    likedMovie : getLickedListFromLS()
}


 const LikeSlice = createSlice({
    name : 'MovieLike', 
    initialState , 
    reducers : {
        movieLikeAndUnlike : (state:any ,  action): void=>{
            const {movieId} = action.payload
        
            
            const isExist = state.likedMovie?.filter((elem:any) => elem.movieId === movieId)
            
            if(isExist.length != 0){
                state.likedMovie = state.likedMovie.filter((elem:any) => elem.movieId !== movieId)
                localStorage.setItem('movieLike' , JSON.stringify(state.likedMovie))
            }
            else{
                state.likedMovie =  [...state.likedMovie   ,  action.payload]
                localStorage.setItem('movieLike' , JSON.stringify(state.likedMovie))
            }
            
        }
    }
    
     
})

export const {movieLikeAndUnlike} =  LikeSlice.actions

export default LikeSlice.reducer