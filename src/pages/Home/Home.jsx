import React, { useState, useEffect } from 'react'
import ListDiary from '../../components/ListDiary/ListDiary'
import { TIPOS_GASTOS } from '../../categories/EXPENSES_TYPES'
import { useNavigate } from 'react-router-dom'
import { verifyToken } from '../../functions/verifyToken'
import Container from '../../components/Container/Container'
import Welcome from '../../components/Welcome/Welcome'
import SpendInput from '../../components/SpendInput/SpendInput'
import { useStore } from '../../stores/useStore'
import NavBar from '../../components/NavBar/NavBar'
import ModalDelete from '../../components/ModalDelete/ModalDelete'
import IsModalUpdates from '../../components/IsModalUpdates/IsModalUpdates'
import { putMethodSchema } from '../../functions/putMethodSchema'
import { googleLogout } from '@react-oauth/google'

const HomePage = () => {
  const [editSwitch, setEditSwitch] = useState(false)
  const navigate = useNavigate()
  const cookies = JSON.parse(window.localStorage.getItem('userdata'))
  // const isUpdates = JSON.parse(window.localStorage.getItem('updates'))
  const {
    personal_spend: personalSpend,
    balance_personal_spend: personalBalance,
    balance,
    fetchData
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
      const token = await verifyToken()
      if (token.status !== 200) {
        googleLogout()
        navigate('/')
      }
      if (token.status === 200) {
        console.log(cookies)
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
    <Container>
      <Welcome username={cookies.user.name} currency='€' pageSelected={0} />
      <h1
        style={{
          width: '100%',
          textAlign: 'start',
          fontSize: '30px',
          paddingLeft: '25px',
          fontWeight: '400'
        }}
      >
        Bienvenido a <br /> CoinKeep <b>{cookies.user.name}</b>
      </h1>
      <IsModalUpdates />

      <NavBar />
    </Container>
  )
}

export default HomePage
