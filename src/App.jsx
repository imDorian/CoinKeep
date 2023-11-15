import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import Home from './pages/Home/Home'
import Financial from './pages/Financial/Financial'
import Profile from './pages/Profile/Profile'

function App () {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<Register />} />
        <Route path='/inicio' element={<Home />} />
        <Route path='/misfinanzas' element={<Financial />} />
        <Route path='/perfil' element={<Profile />} />
      </Routes>
    </Router>
  )
}

export default App
