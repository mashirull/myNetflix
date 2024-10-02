

const MovieError = () => {

    const reloadPage = ()=> {
        window.location.reload()
    }

  return (
    <div className=' flex items-center flex-col'>
        <h1 className=" text-white text-3xl text-center">Something Went Wrong</h1>
        <p className=" text-xl text-white pt-2">Please Check your Internet Connection & Download VPN from <a href="https://chromewebstore.google.com/detail/free-vpn-for-chrome-vpn-p/majdfhpaihoncoakbjgbdhglocklcgno?hl=en" target="_black" className=" text-blue-400 hover:text-blue-200">here</a> </p>
        <button className=' bg-transparent border border-gray-200 rounded-md py-2 px-4 text-gray-100 mt-8' onClick={reloadPage}>Reload page</button>
    </div>
  )
}

export default MovieError