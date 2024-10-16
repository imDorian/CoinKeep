import React, { useEffect, useMemo } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { verifyToken } from '../../functions/verifyToken'
import Container from '../../components/Container/Container'
import Welcome from '../../components/Welcome/Welcome'
import { useStore } from '../../stores/useStore'
import NavBar from '../../components/NavBar/NavBar'
import IsModalUpdates from '../../components/IsModalUpdates/IsModalUpdates'
import { putMethodSchema } from '../../functions/putMethodSchema'
import { googleLogout } from '@react-oauth/google'
import Grid from '../../components/Grid/Grid'
import BalanceWidget from '../../components/BalanceWidget/BalanceWidget'
import ValutWidget from '../../components/ValutWidget/ValutWidget'

const HomePage = () => {
  const navigate = useNavigate()
  const cookies = JSON.parse(window.localStorage.getItem('userdata'))
  // const isUpdates = JSON.parse(window.localStorage.getItem('updates'))
  const { balance, fetchData, valut } = useStore()

  useEffect(() => {
    const fetchDataUser = async () => {
      const token = await verifyToken()
      if (token.status !== 200) {
        googleLogout()
        navigate('/')
      }
      if (token.status === 200) {
        fetchData(cookies.user.data)
      }
    }
    if (cookies) {
      try {
        fetchDataUser()
      } catch (error) {
        console.error(error)
        googleLogout()
        navigate('/')
      }
    } else {
      googleLogout()
      navigate('/')
    }
  }, [])

  useEffect(() => {
    putMethodSchema(balance._id, balance, 'balance')
  }, [balance])

  const mappedValuts = useMemo(() => {
    return valut?.map(item => {
      const { title, goal, model, _id: id, currency } = item
      return (
        <ValutWidget
          key={id}
          title={title}
          goal={goal}
          model={model}
          currency={currency}
        />
      )
    })
  }, [valut])

  return (
    <Container>
      <Welcome username={cookies?.user?.name} />
      <h1 className='text-start p-0 m-0 ps-5 mb-3 w-full'>
        Bienvenido a <br /> CoinKeep <b>{cookies?.user?.name}</b>
      </h1>
      <IsModalUpdates />
      <Grid>
        <BalanceWidget />
        {mappedValuts}
        <ValutWidget />
      </Grid>

      <NavBar />
    </Container>
  )
}

export default HomePage
