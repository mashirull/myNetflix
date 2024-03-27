import { useAppSelector } from "."



const movieGenres   = useAppSelector(state => state.movieGenres.movieGenres)

export const UseMovieGenreses = (genres :[]) => {


    const genresArr : string[] = []

    const intersection = movieGenres.filter((elem: {id : number}) => {
        return genres?.includes(elem.id)
       })
    
       intersection.forEach((elem : {name:string})=>{
        genresArr.push(elem.name)
       })
    
    return genresArr
}