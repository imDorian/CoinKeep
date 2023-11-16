/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'
import './SpendInput.css'
import CashIcon from '../../icons/CashIcon'
import CreditCardIcon from '../../icons/CreditCardIcon'
import { useStore } from '../../stores/useStore'
import { putData } from '../../functions/putData'
import { isThisMonth } from '../../functions/timeController'

function capitalizeFirstLetter (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export const METHOD = {
  CARD: 'card',
  CASH: 'cash'
}

const SpendInput = ({ currency }) => {
  const cookies = JSON.parse(window.localStorage.getItem('userdata'))
  const [method, setMethod] = useState(METHOD.CARD)
  const { personal_spend: personalSpend, available_personal_spend: availablePersonalSpend } = useStore()
  const monthSpendCard = personalSpend && personalSpend.filter(ex => ex && ex.method === 'card' && isThisMonth(ex.createdAt)).reduce((total, da) => total + parseFloat(da.quantity), 0).toFixed(2)
  const monthSpendCash = personalSpend && personalSpend.filter(ex => ex && ex.method === 'cash' && isThisMonth(ex.createdAt)).reduce((total, da) => total + parseFloat(da.quantity), 0).toFixed(2)
  const totalPersonalSpending = {
    card: availablePersonalSpend.card - monthSpendCard,
    cash: availablePersonalSpend.cash - monthSpendCash
  }
  const [newData, setNewData] = useState({
    establishment: '',
    product: '',
    quantity: Number,
    currency: '€',
    description: '',
    method
  })

  useEffect(() => {
    useStore.setState({
      balance_personal_spend: {
        card: totalPersonalSpending.card,
        cash: totalPersonalSpending.cash
      }
    })
  }, [personalSpend, availablePersonalSpend])

  useEffect(() => {
    setNewData({
      ...newData,
      method
    })
    console.log(newData)
  }, [method])

  console.log(personalSpend)

  const addToSpend = async (e) => {
    e.preventDefault()
    const PERSONAL_SPEND = 'personal_spend'
    if (newData.quantity <= totalPersonalSpending[method] && totalPersonalSpending[method] > 0 && newData.quantity !== '' && newData.quantity > 0 && newData.establishment !== '' && newData.product !== '') {
      const { json, res } = await putData(PERSONAL_SPEND, cookies.user.data, newData)
      console.log(json, res)
      useStore.setState({
        personal_spend: [json, ...personalSpend]
      })
      setNewData({
        ...newData,
        establishment: '',
        product: '',
        quantity: Number
      })
      console.log(useStore.getState())
    } else {
      console.log('No hay disponibilidad para gasto personal')
    }
  }

  const handlePayMethod = (e) => {
    setMethod(e)
    setNewData({
      ...newData,
      method
    })
  }

  const MethodButtons = () => {
    return (
      <div className='pay-method__container'>
        <button onClick={e => { e.preventDefault(); handlePayMethod(METHOD.CARD) }} className={method === METHOD.CARD ? 'pay-method__button method-selected' : 'pay-method__button'}><CreditCardIcon color='white' size='23px' /></button>
        <button onClick={e => { e.preventDefault(); handlePayMethod(METHOD.CASH) }} className={method === METHOD.CASH ? 'pay-method__button method-selected' : 'pay-method__button'}><CashIcon color='white' size='23px' /></button>
      </div>
    )
  }
  return (
    <form className='spend-input__form'>
      <h3>Introduce nuevo gasto personal</h3>
      <div className='spend-input__container'>
        <div className='spend-input__inputs'>
          <input type='text' required placeholder='Establecimiento' value={newData.establishment} onChange={e => setNewData({ ...newData, establishment: capitalizeFirstLetter(e.target.value) })} />
          <input type='text' required placeholder='Producto o servicio' value={newData.product} onChange={e => setNewData({ ...newData, product: capitalizeFirstLetter(e.target.value) })} />
        </div>
        <div className='spend-input__container2'>
          <MethodButtons />
          <div className='input-currency__container'>
            <input required value={newData.quantity} onChange={(e) => setNewData({ ...newData, quantity: isNaN(e.target.valueAsNumber) ? Number : e.target.valueAsNumber })} className='spend-input' placeholder={currency} type='number' />
            {/* <span className='currency'>{currency}</span> */}
          </div>
        </div>
      </div>
      <div className='spend-input__btn'>
        <button onClick={addToSpend}>Agregar gasto</button>
      </div>
    </form>
  )
}

export default SpendInput
