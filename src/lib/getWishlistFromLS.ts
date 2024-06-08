
export const getWishlistFromLS = ():any => {
    if(JSON.parse(localStorage.getItem('wishlist')) === null){
        return []
    }
    else{
        return JSON.parse(localStorage.getItem('wishlist'))
    }

}