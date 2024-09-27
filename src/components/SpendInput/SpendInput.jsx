/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'
import './SpendInput.css'
import CashIcon from '../../icons/CashIcon'
import CreditCardIcon from '../../icons/CreditCardIcon'
import { useStore } from '../../stores/useStore'
import { putData } from '../../functions/putData'
import { isThisMonth } from '../../functions/timeController'
import { putMethodSchema } from '../../functions/putMethodSchema'
import PlusCircle from '../../icons/PlusCircle'
import QuitIcon from '../../icons/QuitIcon'

export function capitalizeFirstLetter (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export const METHOD = {
  CARD: 'card',
  CASH: 'cash'
}

const SpendInput = ({ currency }) => {
  const cookies = JSON.parse(window.localStorage.getItem('userdata'))
  const [method, setMethod] = useState(METHOD.CARD)
  const { personal_spend: personalSpend, available_personal_spend: availablePersonalSpend, dateSelected, balance_personal_spend: personalBalance } = useStore()
  const monthSpendCard = personalSpend && personalSpend.filter(ex => ex && ex.method === 'card' && isThisMonth(ex.date)).reduce((total, da) => total + parseFloat(da.quantity), 0).toFixed(2)
  const monthSpendCash = personalSpend && personalSpend.filter(ex => ex && ex.method === 'cash' && isThisMonth(ex.date)).reduce((total, da) => total + parseFloat(da.quantity), 0).toFixed(2)
  const totalPersonalSpending = {
    card: availablePersonalSpend.card - monthSpendCard,
    cash: availablePersonalSpend.cash - monthSpendCash
  }
  const [newProduct, setNewProduct] = useState('')
  const [newData, setNewData] = useState({
    establishment: '',
    product: [],
    quantity: Number,
    currency: '€',
    description: '',
    method,
    date: dateSelected,
    model: 'personal'
  })

  useEffect(() => {
    setNewData({
      ...newData,
      method
    })
  }, [method])

  useEffect(() => {
    setNewData({
      ...newData,
      date: dateSelected
    })
  }, [dateSelected])

  const addToSpend = async (e) => {
    e.preventDefault()
    const PERSONAL_SPEND = 'personal_spend'
    if (newData.quantity <= personalBalance[method] && personalBalance[method] > 0 && newData.quantity !== '' && newData.quantity > 0 && newData.establishment !== '' && newData.product.length !== 0) {
      const { json, res } = await putData(PERSONAL_SPEND, cookies.user.data, newData)
      if (res.status === 200) {
        const newPersonalBalance = {
          ...personalBalance,
          [method]: personalBalance[method] - (newData.quantity)
        }
        useStore.setState({
          personal_spend: [...personalSpend, json],
          balance_personal_spend: newPersonalBalance
        })
        setNewData({
          ...newData,
          establishment: '',
          product: [],
          quantity: Number
        })
      }
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

  const addNewProduct = (e) => {
    e.preventDefault()
    if (newProduct !== '') {
      setNewData({
        ...newData,
        product: [...newData.product, newProduct]
      })
      setNewProduct('')
    }
  }
  const quitNewProduct = (e, i) => {
    e.preventDefault()
    const productsFiltered = [...newData.product]
    productsFiltered.splice(i, 1)
    console.log(productsFiltered)
    setNewData({
      ...newData,
      product: productsFiltered
    })
  }
  return (
    <form className='spend-input__form'>
      <h3>Introduce nuevo gasto personal <div id='info-date'>Info.<span>Puedes añadir gastos cambiando la fecha de "Gasto Diario"</span></div></h3>
      <div className='spend-input__container'>
        <div className='spend-input__inputs'>
          <input type='text' required placeholder='Establecimiento' value={newData.establishment} onChange={e => setNewData({ ...newData, establishment: capitalizeFirstLetter(e.target.value) })} />
          {newData.product.length > 0 && newData.product.map((p, index) => <span key={p}><input value={p} disabled /><button onClick={e => quitNewProduct(e, index)}><QuitIcon color='rgb(255, 107, 107)' size='24px' /></button></span>)}
          <span><input type='text' required placeholder='Producto o servicio' value={newProduct} onChange={e => setNewProduct(capitalizeFirstLetter(e.target.value))} /><button onClick={e => addNewProduct(e)}><PlusCircle color='aquamarine' size='24px' /></button></span>
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
