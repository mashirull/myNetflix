import Navbar from './component/Navbar';
import {useEffect} from 'react'
import './App.css';
import Footer from './component/Footer';
import Home from './Pages/Home';
import { fetchMovieGenres } from './redux/slice/movieGenres';
import { useAppDispatch } from './Hook';
import { BrowserRouter , Routes , Route } from 'react-router-dom';
import MovieDetails from './component/MovieDetails';
import TvDetails from './component/tvDetails';



function App() {

  const dispatch = useAppDispatch()

  useEffect(() => {
   dispatch(fetchMovieGenres()) 
   
  }, [])
  
 

  return (
    <>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path='/' element = {<Home/>}/>
          <Route path='/movie/:id' element = {<MovieDetails/>}/>
          <Route path='/TVseries/:id' element = {<TvDetails/>}/>
        </Routes>
        <Footer/>
      </BrowserRouter>
      
    </>
  )
}

export default App
