

const MovieError = () => {

    const reloadPage = ()=> {
        window.location.reload()
    }

  return (
    <div className=' flex items-center flex-col'>
        <h1 className=" text-white text-3xl text-center">Something Went Wrong</h1>
        <p className=" text-xs text-white pt-2">Please Check your Internet Connection</p>
        <button className=' bg-transparent border border-gray-200 rounded-md py-2 px-4 text-gray-100 mt-8' onClick={reloadPage}>Reload page</button>
    </div>
  )
}

export default MovieError