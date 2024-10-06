import React, { useContext, useState, useEffect } from 'react'
import Container from '../../components/Container/Container'
import NavBar from '../../components/NavBar/NavBar'
import Incomes from '../../components/Incomes/Incomes'
import Edit from '../../components/Edit/Edit'
import Expenses from '../../components/Expenses/Expenses'
import Savings from '../../components/Savings/Savings'
import Investments from '../../components/Investments/Investments'
import './Financial.css'
import { useStore } from '../../stores/useStore'
import { verifyToken } from '../../functions/verifyToken'
import { useNavigate } from 'react-router-dom'
import Welcome from '../../components/Welcome/Welcome'
import Grid from '../../components/Grid/Grid'
import BalanceWidget from '../../components/BalanceWidget/BalanceWidget'
import PersonalBalanceWidget from '../../components/PersonalBalanceWidget/PersonalBalanceWidget'
import { MagicMotion } from 'react-magic-motion'
import Input from '../../components/Input/Input'
import List from '../../components/List/List'
// import { useCookiesStore } from '../store/useCookiesStore'

function selectWidget (widget) {
  if (widget === 'personalBalance') {
    return 'grid grid-cols-[30%_60%]  gap-x-3 w-[100%] transition-all duration-300 items-start justify-center'
  }
  if (widget === 'balance') {
    return 'grid grid-cols-[60%_30%] gap-x-3 w-[100%] transition-all duration-300 items-start justify-center'
  }
  if (widget === '') {
    return 'grid grid-cols-[45%_45%] gap-x-3 w-[100%] transition-all duration-300 items-start justify-center'
  }
}

const Financial = () => {
  const [editSwitch, setEditSwitch] = useState(false)
  const cookies = JSON.parse(window.localStorage.getItem('userdata'))
  const navigate = useNavigate()
  // const fetchData = useStore(state => state.fetchData)
  const { fetchData, focusWidget, income } = useStore()
  const currency = '€'

  const selectedWidget = selectWidget(focusWidget)

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
  useEffect(() => {
    useStore.setState({
      selectedPage: 'financial'
    })
  }, [])

  useEffect(() => {
    console.log(focusWidget)
  }, [focusWidget])
  return (
    <div id='financial'>
      <Container>
        <Welcome
          currency={currency}
          username={cookies.user.name}
          pageSelected={2}
        />
        <h1>Mis Finanzas</h1>
        <Grid className={selectedWidget}>
          <BalanceWidget />
          <PersonalBalanceWidget />
        </Grid>
        {/* <Edit setEditSwitch={setEditSwitch} editSwitch={editSwitch} />
        <Incomes currency='€' editSwitch={editSwitch} />
        <Expenses currency='€' editSwitch={editSwitch} />
        <Savings currency='€' editSwitch={editSwitch} />
        <Investments currency='€' editSwitch={editSwitch} /> */}
        <List data={income} />
        <NavBar />
      </Container>
    </div>
  )
}

export default Financial
