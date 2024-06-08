import  {createSlice}   from "@reduxjs/toolkit";
import { getWishlistFromLS } from "../../lib/getWishlistFromLS";


const initialState:{movieWishlist : ()=> object[]} = {
    movieWishlist : getWishlistFromLS()
}


const AddToWishlistSlice = createSlice({
    name  : 'addtowishlist' ,
    initialState ,
    reducers :  {
        AddToWishlist : (state:any , action:any)=> {
            const {movieId} = action.payload
            const isMovieIdInLIst =  state.movieWishlist.filter((elem:any)=> {
                if(elem.movieId === movieId){
                    return elem.movieId
                }
                else {
                    return null
                }
            } )
       
            if(isMovieIdInLIst.length !== 0){
                alert('Movie is already added to Wishlist')
            }
            else{
                state.movieWishlist = [...state.movieWishlist , action.payload]
                localStorage.setItem('wishlist' , JSON.stringify(state.movieWishlist))
            }

        },

        RemoveFromWishlist : (state:any , action:any)=> {
            const movieId = action.payload

            let updatedWishlist  = state.movieWishlist.filter(elem =>  elem.movieId !== movieId)
            state.movieWishlist = updatedWishlist
            localStorage.setItem('wishlist' , JSON.stringify(state.movieWishlist))
        }

    }
    
})


export const {AddToWishlist , RemoveFromWishlist} = AddToWishlistSlice.actions

export default AddToWishlistSlice.reducer