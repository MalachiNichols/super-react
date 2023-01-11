import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './home/Home'
import Navbar from './header/Navbar';
import Footer from './footer/Footer'
import Error from './error/Error'

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/register' element={<Register />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/*' element={<Error/>} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
