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
import IsModalUpdates from '../../components/IsModalUpdates/IsModalUpdates'
import { putMethodSchema } from '../../functions/putMethodSchema'
import Objective from '../../components/Objective/Objective'
import Calendar from '../../components/Calendar/Calendar'

const HomePage = () => {
  const [editSwitch, setEditSwitch] = useState(false)
  const fetchData = useStore(state => state.fetchData)
  const navigate = useNavigate()
  const cookies = JSON.parse(window.localStorage.getItem('userdata'))
  // const isUpdates = JSON.parse(window.localStorage.getItem('updates'))
  const {
    personal_spend: personalSpend,
    balance_personal_spend: personalBalance,
    balance,
    monthGoal
  } = useStore()
  const updateData = async (id, data, cat) => {
    const { res, json } = await putMethodSchema(id, data, cat)
    console.log(res, json)
  }

  useEffect(() => {
    useStore.setState({
      selectedPage: 'home'
    })
  }, [])
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

  useEffect(() => {
    updateData(personalBalance._id, personalBalance, 'personal_balance')
  }, [personalBalance])
  useEffect(() => {
    updateData(balance._id, balance, 'balance')
  }, [balance])

  return (
    <div style={{ marginTop: '7vh' }}>
      <Container>
        <Welcome username={cookies.user.name} currency='€' pageSelected={0} />
        <h1 style={{ width: '100%', textAlign: 'start', fontSize: '30px' }}>
          Bienvenido a <br /> CoinKeep {cookies.user.name}
        </h1>
        <IsModalUpdates />
        {/* <WeekCalendar currency='€' startDate={monthGoal.startDate} endDate={monthGoal.endDate} /> */}
        <Grid>
          <Objective />
          <Calendar
            startDate={monthGoal.startDate}
            endDate={monthGoal.endDate}
            expenses={personalSpend}
            limit={monthGoal.monthGoal}
          />
          <Spendings currency='€' />
          {/* <SpendingsLimit currency='€' /> */}
        </Grid>
        <SpendInput currency='€' personalSpend={personalSpend} />
        <ModalDelete />
        <ListDiary
          editSwitch={editSwitch}
          currency='€'
          data={personalSpend}
          types={TIPOS_GASTOS[3]}
          title='Gasto Diario'
        />
      </Container>
      <NavBar />
    </div>
  )
}

export default HomePage
