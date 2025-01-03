import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import Home from './pages/Home/Home'
import Financial from './pages/Financial/Financial'
import Profile from './pages/Profile/Profile'
import ShareExpenses from './pages/ShareExpenses/ShareExpenses'
import ValutDetails from './components/ValutDetails/ValutDetails'
import CreateValut from './components/CreateValut/CreateValut'
import ShareGroup from './components/ShareGroup/ShareGroup'
import CreateGroup from './components/CreateGroup/CreateGroup'
import GroupOptions from './components/GroupOptions/GroupOptions'
import DetailsTransaction from './components/DetailsTransaction/DetailsTransaction'

function App () {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<Register />} />
        <Route path='/home' element={<Home />} />
        <Route path='/list' element={<Financial />} />
        <Route path='/share' element={<ShareExpenses />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/valut/:id' element={<ValutDetails />} />
        <Route path='/createvalut' element={<CreateValut />} />
        <Route path='/group/:id' element={<ShareGroup />} />
        <Route path='/creategroup' element={<CreateGroup />} />
        <Route path='groupoptions/:id' element={<GroupOptions />} />
        <Route path='transaction/:id' element={<DetailsTransaction />} />
      </Routes>
    </Router>
  )
}

export default App
