
import "./styles/App.css"
import Favorite from './pages/Favorites';
import Home from './pages/Home';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/navBar';
import Footer from "./components/footer";
import { Movieprovider } from './Context/MovieContext';

function App() {
  return (
    <Movieprovider>
      <NavBar />
      <main className='main-content'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/favorites' element={<Favorite />} />
        </Routes>
      </main>
      <Footer />
    </Movieprovider>
  );
}

export default App;
