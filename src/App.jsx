import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import Home from './pages/Home/Home'
import Financial from './pages/Financial/Financial'
import Profile from './pages/Profile/Profile'
import ShareExpenses from './pages/ShareExpenses/ShareExpenses'

function App () {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<Register />} />
        <Route path='/inicio' element={<Home />} />
        <Route path='/wallet' element={<Financial />} />
        <Route path='/compartir' element={<ShareExpenses />} />
        <Route path='/perfil' element={<Profile />} />
      </Routes>
    </Router>
  )
}

export default App
