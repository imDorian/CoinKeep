import React from 'react'
import Container from '../../components/Container/Container'
import ImageProfile from '../../components/ImageProfile/ImageProfile'
import NavBar from '../../components/NavBar/NavBar'
import { useNavigate } from 'react-router-dom'

const Profile = () => {
  const navigate = useNavigate()
  const cookies = JSON.parse(window.localStorage.getItem('userdata'))

  const handleLogout = async (e) => {
    e.preventDefault()
    window.localStorage.removeItem('userdata')
    navigate('/')
  }
  return (
    <Container>
      <div className='image-name__container'>
        <ImageProfile src={cookies.user.imageUrl ?? 'https://lh3.googleusercontent.com/IDFj-TPwtvy-RJvPEsI5f0vEudpeqm9DaBJv237eYCIIGCGDtYYZP3M-OOffmIGQ34lMXVkMZHQ4WypM=w544-h544-p-l90-rj'} />
        <h3>{cookies.user.name}</h3>
        <button onClick={handleLogout}>Cerrar sesión</button>
      </div>
      <NavBar />
    </Container>
  )
}

export default Profile
