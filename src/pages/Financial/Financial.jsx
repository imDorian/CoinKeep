import React, { useContext, useState, useEffect } from 'react'
import Container from '../../components/Container/Container'
import NavBar from '../../components/NavBar/NavBar'
import Incomes from '../../components/Incomes/Incomes'
import Edit from '../../components/Edit/Edit'
import Expenses from '../../components/Expenses/Expenses'
import { userDataContext } from '../../contexts/ContextProvider'
import Savings from '../../components/Savings/Savings'
import Investments from '../../components/Investments/Investments'
import AvailableToSpend from '../../components/AvailableToSpend/AvailableToSpend'
import Input from '../../components/Input/Input'
import './Financial.css'
import { useStore } from '../../stores/useStore'
import { verifyToken } from '../../functions/verifyToken'
import { useNavigate } from 'react-router-dom'
import Welcome from '../../components/Welcome/Welcome'
import Grid from '../../components/Grid/Grid'
import BalanceWidget from '../../components/BalanceWidget/BalanceWidget'
import PersonalBalanceWidget from '../../components/PersonalBalanceWidget/PersonalBalanceWidget'
import { MagicMotion } from 'react-magic-motion'
// import { useCookiesStore } from '../store/useCookiesStore'

const Financial = () => {
  const { typeSelected } = useContext(userDataContext)
  const [editSwitch, setEditSwitch] = useState(false)
  const cookies = JSON.parse(window.localStorage.getItem('userdata'))
  const navigate = useNavigate()
  // const fetchData = useStore(state => state.fetchData)
  const { fetchData } = useStore()
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
  useEffect(() => {
    useStore.setState({
      selectedPage: 'financial'
    })
  }, [])

  return (
    <div id='financial'>
      <Container>
        <Edit setEditSwitch={setEditSwitch} editSwitch={editSwitch} />
        <Welcome currency={currency} username={cookies.user.name} pageSelected={2} />
        <h1>Mis Finanzas</h1>
        <Grid width='100vw'>
          <BalanceWidget />
          <PersonalBalanceWidget />
        </Grid>
        <MagicMotion>
          <Incomes currency='€' editSwitch={editSwitch} />
          <Expenses currency='€' editSwitch={editSwitch} />
          <Savings currency='€' editSwitch={editSwitch} />
          <Investments currency='€' editSwitch={editSwitch} />
        </MagicMotion>

        <NavBar />
      </Container>
    </div>
  )
}

export default Financial
