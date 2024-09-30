import React from 'react'
import Container from '../../components/Container/Container'
import ImageProfile from '../../components/ImageProfile/ImageProfile'
import NavBar from '../../components/NavBar/NavBar'
import { useNavigate } from 'react-router-dom'
import './Profile.css'

const Profile = () => {
  const navigate = useNavigate()
  const cookies = JSON.parse(window.localStorage.getItem('userdata'))

  const handleLogout = async e => {
    e.preventDefault()
    window.localStorage.removeItem('userdata')
    navigate('/')
  }
  return (
    <Container>
      <ImageProfile src='https://nexus-net.info/wp-content/uploads/2017/01/user.png' />
      <div className='image-name__container'>
        <h3>{cookies.user.name}</h3>
        <h3>{cookies.user.email}</h3>
      </div>
      <button id='logout--btn' onClick={handleLogout}>
        Cerrar sesión
      </button>
      <NavBar />
    </Container>
  )
}

export default Profile
