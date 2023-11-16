import React, { useState, useEffect } from 'react'
import ListDiary from '../../components/ListDiary/ListDiary'
import { TIPOS_GASTOS } from '../../categories/EXPENSES_TYPES'
import { useNavigate } from 'react-router-dom'
import { verifyToken } from '../../functions/verifyToken'
import Container from '../../components/Container/Container'
import Welcome from '../../components/Welcome/Welcome'
import SpendInput from '../../components/SpendInput/SpendInput'
import { useStore } from '../../stores/useStore'
import SpendingsLimit from '../../components/SpendigsLimit/SpendingsLimit'
import NavBar from '../../components/NavBar/NavBar'
import Grid from '../../components/Grid/Grid'
import Spendings from '../../components/Spendings/Spendings'
import Edit from '../../components/Edit/Edit'
import ModalDelete from '../../components/ModalDelete/ModalDelete'
import WeekCalendar from '../../components/WeekCalendar/WeekCalendar'

const HomePage = () => {
  const [editSwitch, setEditSwitch] = useState(false)
  const fetchData = useStore(state => state.fetchData)
  const navigate = useNavigate()
  const cookies = JSON.parse(window.localStorage.getItem('userdata'))
  console.log(cookies)
  const { personal_spend: personalSpend } = useStore()

  useEffect(() => {
    const fetchDataUser = async () => {
      const data = await verifyToken()
      if (data.status !== 200) {
        navigate('/')
      }
      if (data.status === 200) {
        fetchData(cookies.user.data)
      }
    }
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
    <>
      <Container>
        <Welcome username={cookies.user.name} currency='€' />
        <h1 style={{ width: '100%', textAlign: 'start', fontSize: '30px' }}>Bienvenido a <br /> CoinKeep {cookies.user.name}</h1>
        <WeekCalendar currency='€' />
        <Grid>
          <SpendingsLimit currency='€' />
          <Spendings currency='€' />
        </Grid>
        <SpendInput currency='€' personalSpend={personalSpend} />
        <Edit setEditSwitch={setEditSwitch} editSwitch={editSwitch} />
        <ModalDelete />
        <ListDiary editSwitch={editSwitch} currency='€' data={personalSpend} types={TIPOS_GASTOS[3]} title='Gasto Diario' />
      </Container>
      <NavBar />
    </>

  )
}

export default HomePage
