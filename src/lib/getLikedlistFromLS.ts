export const getLickedListFromLS = ():any => {
    const LSdata = JSON.parse(localStorage.getItem('movieLike'))

    if(LSdata === null){
        return []
    }
    else{
        return LSdata
    }
}