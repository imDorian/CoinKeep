import React, { useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
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
import CreateValut from '../../components/CreateValut/CreateValut'
import ValutDetails from '../../components/ValutDetails/ValutDetails'

const HomePage = () => {
  const navigate = useNavigate()
  const cookies = JSON.parse(window.localStorage.getItem('userdata'))
  const { balance, fetchData, valut, isCreateValut, isValutDetails } =
    useStore()
  console.log(valut)

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
    return valut?.map((item, index) => {
      const {
        title,
        goal,
        model,
        _id: id,
        currency,
        accumulatedData,
        category,
        createdAt
      } = item
      return (
        <ValutWidget
          key={id}
          id={id}
          title={title}
          category={category}
          goal={goal}
          model={model}
          currency={currency}
          accumulatedData={accumulatedData}
          index={index}
          createdAt={createdAt}
        />
      )
    })
  }, [valut])

  return (
    <>
      {isValutDetails && <ValutDetails />}
      {isCreateValut && <CreateValut />}
      <Container>
        {/* {isCreateValut && <CreateValut />} */}
        <Welcome username={cookies?.user?.name} />
        <h1 className='text-start p-0 m-0 ps-5 mb-3 w-full text-lg'>
          Bienvenido a KeepCoin <b>{cookies?.user?.name}</b>
        </h1>
        <IsModalUpdates />
        <BalanceWidget className='mx-4 h-[150px]' />
        <Grid cols='1fr 1fr'>
          {mappedValuts}
          <ValutWidget />
        </Grid>

        <NavBar />
      </Container>
    </>
  )
}

export default HomePage
