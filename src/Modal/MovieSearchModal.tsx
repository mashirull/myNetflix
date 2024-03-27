
const MovieSearchModal = ({setSearchModal}:any) => {
  return (
    <div className=' bg-black  h-[100vh] absolute top-2 bottom-0 left-5 right-5 text-white '>
        <button className=" text-2xl absolute top-0 right-0 bg-black hover:bg-red-600 text-white cursor-pointer p-3 h-8 w-8 flex items-center justify-center " onClick={()=>setSearchModal(false)}>X</button>
        <form  className=" text-center my-5">
            <input type="text" placeholder="Search by movie name: - " className="  py-2 px-3" />
        </form>
    </div>
  )
}

export default MovieSearchModal