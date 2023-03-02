import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './pages/Navbar';
import Home from './pages/home/Home'
import About from './pages/about/About'
import Contact from './pages/Contact';
import Board from './pages/board/Board';
import Register from './pages/auth/Register';
import SignIn from './pages/auth/SignIn';
import Error from './pages/Error'
import Footer from './pages/Footer'

function App() {
  return (
    <Router>
      <div id='page-container'>
        <div id='content-wrap'>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            {/* <Route path='/contact' element={<Contact />} /> */}
            <Route path='/board' element={<Board id={ 1 }/>} />
            <Route path='/register' element={<Register />} />
            <Route path='/signin' element={<SignIn />} />
            <Route path='/*' element={<Error/>} />
          </Routes>
        </div>
        <Footer id='footer' />
      </div>
    </Router>
  );
}

export default App;
