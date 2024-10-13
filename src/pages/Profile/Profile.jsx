import React from 'react'
import Container from '../../components/Container/Container'
import NavBar from '../../components/NavBar/NavBar'
import { useNavigate } from 'react-router-dom'
import './Profile.css'
import Welcome from '../../components/Welcome/Welcome'
import { useStore } from '../../stores/useStore'
import Settings from '../../components/Settings/Settings'
import { googleLogout } from '@react-oauth/google'

const Profile = () => {
  const navigate = useNavigate()
  const cookies = JSON.parse(window.localStorage.getItem('userdata'))
  console.log(cookies)
  const { currency } = useStore()

  const handleLogout = async e => {
    e.preventDefault()
    window.localStorage.removeItem('userdata')
    googleLogout()
    navigate('/')
  }
  return (
    <Container className='flex-col'>
      <Welcome currency={currency} />
      <div className='flex items-stretch justify-evenly flex-row w-full'>
        <div className='flex flex-col text-start justify-center text-lg'>
          <span className='font-semibold text-xl'>{cookies.user.name}</span>
          <span>{cookies.user.email}</span>
        </div>
        <img
          className='rounded-full bg-cover w-[5rem]'
          src={cookies.user.image}
        />
      </div>
      <Settings />
      <button id='logout--btn' onClick={handleLogout}>
        Cerrar sesión
      </button>
      <NavBar />
    </Container>
  )
}

export default Profile
