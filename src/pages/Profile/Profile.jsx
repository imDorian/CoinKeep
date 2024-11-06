import React, { useEffect } from 'react'
import Container from '../../components/Container/Container'
import NavBar from '../../components/NavBar/NavBar'
import { useNavigate } from 'react-router-dom'
import './Profile.css'
import Welcome from '../../components/Welcome/Welcome'
import { useStore } from '../../stores/useStore'
import Settings from '../../components/Settings/Settings'
import { googleLogout } from '@react-oauth/google'
import { verifyToken } from '../../functions/verifyToken'

const Profile = () => {
  const navigate = useNavigate()
  const cookies = JSON.parse(window.localStorage.getItem('userdata'))
  const { currency, fetchData, balance } = useStore()

  useEffect(() => {
    if (!balance._id) {
      try {
        console.log('fetch')
        fetchData(cookies.user.data)
      } catch (error) {
        console.error(error)
        navigate('/')
      }
    }
  }, [])

  const handleLogout = async e => {
    e.preventDefault()
    window.localStorage.removeItem('userdata')
    useStore.setState({
      name: '',
      email: '',
      imageUrl: '',
      currency: '€',
      username: '',
      income: [],
      expense: [],
      share: {},
      valutDetails: {},
      resolveDetails: {},
      groupDetails: {},
      balance: {}
    })
    googleLogout()
    navigate('/')
  }
  return (
    <Container className='flex-col px-5'>
      <Welcome currency={currency} />
      <div className='flex items-stretch justify-evenly flex-row w-full'>
        <div className='flex flex-col text-start justify-center text-lg'>
          <div className='flex flex-row items-center justify-between'>
            <span className='font-semibold text-xl'>{cookies.user.name}</span>
            <span className='text-base text-neutral-400'>
              {cookies.user.username}
            </span>
          </div>
          <span>{cookies.user.email}</span>
        </div>
        <img
          className='rounded-full bg-cover w-[5rem]'
          src={cookies.user.image}
        />
      </div>
      <Settings />
      <button
        className='bg-red-500 rounded-lg py-2 px-3 w-full box-border'
        onClick={handleLogout}
      >
        Cerrar sesión
      </button>
      <NavBar />
    </Container>
  )
}

export default Profile
