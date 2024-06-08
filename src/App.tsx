import Navbar from './component/Navbar';
import './App.css';
import Footer from './component/Footer';
import Home from './Pages/Home';
import Movies from './Pages/Movies';
import { BrowserRouter , Routes , Route } from 'react-router-dom';
import MovieDetails from './component/MovieDetails';
import TvDetails from './component/tvDetails';
import MyList from './Pages/MyList';


function App() {

  
  return (
    <>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path='/' element = {<Home/>}/> 
          <Route path='/movie/:id' element = {<MovieDetails/>}/>
          <Route path='/TVseries/:id' element = {<TvDetails/>}/>
          <Route path= '/movies' element = {<Movies/>} />
          <Route path= '/mylist'  element = {<MyList/>}/>
          <Route path= '*'  element = {<h1 style={{color:"red"}}>Page not Found</h1>}/>
        </Routes>
        <Footer/>
      </BrowserRouter>
      
    </>
  )
}

export default App
