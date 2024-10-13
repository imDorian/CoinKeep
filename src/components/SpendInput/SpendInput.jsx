/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'
import './SpendInput.css'
import CashIcon from '../../icons/CashIcon'
import CreditCardIcon from '../../icons/CreditCardIcon'
import { useStore } from '../../stores/useStore'
import { putData } from '../../functions/putData'
import { isThisMonth } from '../../functions/timeController'

export function capitalizeFirstLetter (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export const METHOD = {
  CARD: 'card',
  CASH: 'cash'
}

const SpendInput = () => {
  const cookies = JSON.parse(window.localStorage.getItem('userdata'))
  const [method, setMethod] = useState(METHOD.CARD)
  const {
    personal_spend: personalSpend,
    available_personal_spend: availablePersonalSpend,
    dateSelected,
    balance_personal_spend: personalBalance,
    currency
  } = useStore()
  const monthSpendCard =
    personalSpend &&
    personalSpend
      .filter(ex => ex && ex.method === 'card' && isThisMonth(ex.date))
      .reduce((total, da) => total + parseFloat(da.quantity), 0)
      .toFixed(2)
  const monthSpendCash =
    personalSpend &&
    personalSpend
      .filter(ex => ex && ex.method === 'cash' && isThisMonth(ex.date))
      .reduce((total, da) => total + parseFloat(da.quantity), 0)
      .toFixed(2)
  const totalPersonalSpending = {
    card: availablePersonalSpend.card - monthSpendCard,
    cash: availablePersonalSpend.cash - monthSpendCash
  }
  const [newProduct, setNewProduct] = useState('')
  const [newData, setNewData] = useState({
    category: '',
    description: '',
    quantity: Number,
    currency: '€',
    description: '',
    method,
    date: dateSelected,
    model: 'personal'
  })

  function handleDescription (e) {
    const product = e.target.value
    setNewData({
      ...newData,
      product
    })
  }

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

  const addToSpend = async e => {
    e.preventDefault()
    const PERSONAL_SPEND = 'personal_spend'
    if (newData.category && newData.description) {
      const { json, res } = await putData(
        PERSONAL_SPEND,
        cookies.user.data,
        newData
      )
      if (res.status === 200) {
        const newPersonalBalance = {
          ...personalBalance,
          [method]: personalBalance[method] - newData.quantity
        }
        useStore.setState({
          personal_spend: [...personalSpend, json],
          balance_personal_spend: newPersonalBalance
        })
        setNewData({
          ...newData,
          category: '',
          description: '',
          quantity: Number
        })
      }
    }
  }

  const handlePayMethod = e => {
    setMethod(e)
    setNewData({
      ...newData,
      method
    })
  }

  const MethodButtons = () => {
    return (
      <div className='flex flex-row items-start justify-evenly gap-3 w-full transition-all duration-300'>
        <button
          className='p-0 m-0 h-10'
          onClick={e => {
            e.preventDefault()
            handlePayMethod(METHOD.CARD)
          }}
        >
          <CreditCardIcon
            className={
              method === METHOD.CARD
                ? 'text-[var(--brand-color)] w-auto'
                : 'w-auto'
            }
          />
        </button>
        <button
          className='p-0 m-0 h-10'
          onClick={e => {
            e.preventDefault()
            handlePayMethod(METHOD.CASH)
          }}
        >
          <CashIcon
            className={
              method === METHOD.CASH
                ? 'text-[var(--brand-color)] w-auto'
                : 'w-auto'
            }
          />
        </button>
      </div>
    )
  }

  function handleQuantity (e) {
    const quant = e.target.value
    if (isNaN(quant)) return
    setNewData({
      ...newData,
      quantity: quant
    })
  }

  const personalExpenseCategories = [
    {
      name: 'Comida 🍔',
      description: 'Gastos relacionados con alimentos y bebidas.'
    },
    {
      name: 'Transporte 🚗',
      description: 'Gastos en transporte público o gasolina.'
    },
    {
      name: 'Entretenimiento 🎉',
      description: 'Gastos en actividades recreativas.'
    },
    { name: 'Ropa 👗', description: 'Compras de ropa y accesorios.' },
    { name: 'Salud 🏥', description: 'Gastos médicos y de bienestar.' },
    {
      name: 'Hogar 🏠',
      description: 'Gastos en servicios del hogar y mantenimiento.'
    },
    {
      name: 'Regalos 🎁',
      description: 'Gastos en regalos para otras personas.'
    },
    {
      name: 'Educación 🎓',
      description: 'Gastos en cursos, libros y materiales de estudio.'
    },
    {
      name: 'Mascotas 🐾',
      description: 'Gastos relacionados con el cuidado de mascotas.'
    },
    { name: 'Ahorro 💰', description: 'Dinero destinado al ahorro personal.' }
  ]

  return (
    <form className='my-2 flex flex-col items-stretch justify-center gap-2 w-auto px-7 box-content'>
      <h3 className='text-lg'>
        Introduce nuevo gasto personal
        <div id='info-date'>
          Info.
          <span>Puedes añadir gastos cambiando la fecha de "Gasto Diario"</span>
        </div>
      </h3>
      <div className='flex flex-row flex-nowrap items-center w-full my-3'>
        <div className='flex flex-col items-end gap-3 w-[50%]'>
          <select
            className='h-10 rounded-full text-center w-[90%]'
            type='text'
            required
            placeholder='ej: McDonalds'
            value={newData.category}
            onChange={e =>
              setNewData({
                ...newData,
                category: capitalizeFirstLetter(e.target.value)
              })
            }
          >
            {personalExpenseCategories?.map(cat => {
              return (
                <option
                  className='text-end'
                  key={crypto.randomUUID()}
                  value={cat.name}
                >
                  {cat.name}
                </option>
              )
            })}
          </select>

          <input
            className='text-center rounded-full h-10 w-[90%]'
            type='text'
            required
            placeholder='Descripcion'
            value={newData.description}
            onChange={handleDescription}
          />
          {/* <button
              className='border-0 p-0 m-0'
              onClick={e => addNewProduct(e)}
            >
              <PlusCircle color='aquamarine' size='24px' />
            </button> */}
        </div>
        <div className='flex flex-col items-center w-[50%] gap-3'>
          <MethodButtons />
          <input
            required
            value={newData.quantity}
            onChange={handleQuantity}
            className='rounded-full h-10 text-center w-[70%]'
            placeholder={'ej: 12' + currency}
            type='tel'
            pattern='[0-9]*'
          />
        </div>
      </div>
      <div className='spend-input__btn'>
        <button onClick={addToSpend}>Agregar gasto</button>
      </div>
    </form>
  )
}

export default SpendInput
