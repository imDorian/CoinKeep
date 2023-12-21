/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import './AvailableToSpend.css'
import { useStore } from '../../stores/useStore'
import CreditCardIcon from '../../icons/CreditCardIcon'
import CashIcon from '../../icons/CashIcon'
import { putMethodSchema } from '../../functions/putMethodSchema'

const AvailableToSpend = ({ currency }) => {
  const [transferInput, setTransferInput] = useState('')
  const { balance, available_personal_spend: availablePersonalSpend } = useStore()
  const [methodSelected, setMethodSelected] = useState('card')
  const handlePersonalSpend = async (e) => {
    e.preventDefault()
    if (parseFloat(balance[methodSelected]) >= transferInput && (balance[methodSelected]) !== 0 && transferInput !== '') {
      const newData = {
        ...availablePersonalSpend,
        [methodSelected]: parseFloat(transferInput)
      }
      const category = 'available_personal_spend'
      const { res } = await putMethodSchema(availablePersonalSpend._id, newData, category)
      if (res.status === 200) {
        useStore.setState({
          available_personal_spend: {
            ...availablePersonalSpend,
            [methodSelected]: parseFloat(transferInput)
          }
        })
        setTransferInput('')
      }
    } else {
      alert('El balance tiene que ser mayor o igual a la cantidad introducida')
    }
  }

  const handlePayMethod = (e) => {
    setMethodSelected(e)
  }

  const MethodButtons = () => {
    return (
      <section className='method__container'>
        <button onClick={e => { e.preventDefault(); handlePayMethod('card') }} className={methodSelected === 'card' ? 'pay-method__button method-selected' : 'pay-method__button'}><CreditCardIcon color='white' size='23px' /></button>
        <button onClick={e => { e.preventDefault(); handlePayMethod('cash') }} className={methodSelected === 'cash' ? 'pay-method__button method-selected' : 'pay-method__button'}><CashIcon color='white' size='23px' /></button>
      </section>
    )
  }

  useEffect(() => {
  }, [balance, transferInput])

  return (
    <article className='available-personal-spend'>
      <h3>Gasto Personal</h3>
      <section className='method-view__container'>
        <span>Tarjeta: {availablePersonalSpend.card}{currency}</span>
        <span>Efectivo: {availablePersonalSpend.cash}{currency}</span>
      </section>
      <MethodButtons />
      <section className='form__container'>
        <form onSubmit={handlePersonalSpend}>
          <input placeholder={methodSelected === 'card' ? balance.card + currency : balance.cash + currency} type='number' onChange={(e) => setTransferInput(e.target.value)} value={transferInput} />
          <button type='submit'>Ajustar gasto personal</button>
        </form>
      </section>
    </article>
  )
}

export default AvailableToSpend
