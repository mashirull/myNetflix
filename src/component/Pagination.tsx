import { BsThreeDots } from "react-icons/bs";
import { useNavigate } from "react-router-dom";


const Pagination = ({totalPageNumber , page , category}:any):JSX.Element => {

    const navigate = useNavigate()
     
    let numberArray:number[] = []

    let starting = 1
    let ending = 5


    if(page > 5){
        starting = page-2
        ending = page+2
    }

    for(let i=starting ; i <= ending ; i++){
        numberArray.push(i)
    }




  return (
    <div className=" text-white flex items-center justify-center">
        {page > 5 &&  <span className=" text-2xl text-gray-400"><BsThreeDots/></span>}
        {numberArray.map((number:number , i:number) => {
            return (
                <span className={` bg-sky-900  cursor-pointer mx-2 px-2 460:mx-1 py-1 text-xs rounded-full  text-white hover:bg-white hover:!text-black font-semibold ${page === number && 'bg-white !text-black font-semibold'}`} key={i} onClick={()=>navigate(`/movies?category=${category}&page=${number}`)}>{number}</span>
            )
        })}
        {page < totalPageNumber && 
        <div className=" flex items-center justify-center">
            <span className=" text-2xl text-gray-400 inline"><BsThreeDots/></span>
            <span className=" text-xs text-gray-400 ml-1">({totalPageNumber - 8}+)</span>
        </div>}
        
    </div>
  )
}

export default Pagination