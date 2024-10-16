import React, { useEffect } from 'react'
import Container from '../../components/Container/Container'
import NavBar from '../../components/NavBar/NavBar'
import { useStore } from '../../stores/useStore'
import { verifyToken } from '../../functions/verifyToken'
import { useNavigate } from 'react-router-dom'
import Welcome from '../../components/Welcome/Welcome'
import List from '../../components/List/List'

const Financial = () => {
  const cookies = JSON.parse(window.localStorage.getItem('userdata'))
  const navigate = useNavigate()
  // const fetchData = useStore(state => state.fetchData)
  const { fetchData, income } = useStore()
  const currency = '€'

  const fetchDataUser = async () => {
    const data = await verifyToken()
    if (data.status !== 200) {
      navigate('/')
    }
    if (data.status === 200) {
      await fetchData(cookies.user.data)
    }
  }

  useEffect(() => {
    if (cookies) {
      try {
        fetchDataUser()
      } catch (error) {
        console.error(error)
        navigate('/')
      }
    } else {
      navigate('/')
    }
  }, [])

  return (
    <Container className='overflow-hidden'>
      <Welcome
        currency={currency}
        username={cookies?.user?.name}
        pageSelected={2}
      />
      {/* <h1 className='p-0 m-0 pt-7'>Mis Finanzas</h1> */}

      <List data={income} />
      <NavBar />
    </Container>
  )
}

export default Financial
