/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from 'react'
import './Input.css'
import { CATEGORIAS_INGRESOS } from '../../categories/INCOME_CATEGORIES'
import { CATEGORIAS_GASTOS } from '../../categories/EXPENSES_CATEGORIES'
import { TIPOS_INGRESOS } from '../../categories/INCOME_TYPES'
import { TIPOS_GASTOS } from '../../categories/EXPENSES_TYPES'
import { CATEGORIAS_AHORROS } from '../../categories/SAVING_CATEGORIES'
import { CATEGORIAS_INVERSION } from '../../categories/INVESTMENT_CATEGORIES'
import { TIPOS_AHORROS } from '../../categories/SAVINGS_TYPES'
import { TIPOS_INVERSION } from '../../categories/INVESTMENT_TYPES'
import { putData } from '../../functions/putData'
import { userDataContext } from '../../contexts/ContextProvider'
import { useStore } from '../../stores/useStore'
import CreditCardIcon from '../../icons/CreditCardIcon'
import CashIcon from '../../icons/CashIcon'
import { putMethodSchema } from '../../functions/putMethodSchema'
const Input = ({ className }) => {
  const { setTypeSelected, typeSelected } = useContext(userDataContext)
  const { balance, currency } = useStore()
  const cookies = JSON.parse(window.localStorage.getItem('userdata'))
  const [isInput, setIsInput] = useState(true)
  const [loading, setLoading] = useState(false)
  const [method, setMethod] = useState('card')
  const [date, setDate] = useState('')
  const addButton =
    typeSelected === 'income'
      ? 'Añadir ingreso'
      : typeSelected === 'expense'
      ? 'Añadir gasto'
      : typeSelected === 'saving'
      ? 'Añadir ahorro'
      : 'Añadir inversión'
  const categories = {
    income: 'income',
    expense: 'expense',
    saving: 'saving',
    investment: 'investment'
  }
  const [newData, setNewData] = useState({
    category: '',
    type: TIPOS_INGRESOS[0],
    quantity: '',
    currency,
    description: '',
    date: new Date(date),
    method,
    model: typeSelected
  })
  const categorySelectedFunction = () => {
    if (typeSelected === categories.income) return CATEGORIAS_INGRESOS
    if (typeSelected === categories.expense) return CATEGORIAS_GASTOS
    if (typeSelected === categories.saving) return CATEGORIAS_AHORROS
    if (typeSelected === categories.investment) return CATEGORIAS_INVERSION
  }
  const typeSelectedFunction = () => {
    if (typeSelected === categories.income) return TIPOS_INGRESOS
    if (typeSelected === categories.expense) return TIPOS_GASTOS
    if (typeSelected === categories.saving) return TIPOS_AHORROS
    if (typeSelected === categories.investment) return TIPOS_INVERSION
  }
  const categoriesSelected = categorySelectedFunction()
  const typesSelected = typeSelectedFunction()

  const handleMethod = e => {
    setMethod(e)
  }

  useEffect(() => {
    // Obtén la fecha de hoy en el formato 'yyyy-MM-dd'
    const today = new Date()
    const year = today.getFullYear()
    let month = today.getMonth() + 1
    month = month < 10 ? `0${month}` : month // Agrega un cero al mes si es necesario
    let day = today.getDate()
    day = day < 10 ? `0${day}` : day // Agrega un cero al día si es necesario

    const formattedDate = `${year}-${month}-${day}`

    // Establece la fecha actual en el estado
    setDate(formattedDate)
  }, [])

  useEffect(() => {
    console.log(method, newData)
  }, [newData])

  const addToList = async e => {
    e.preventDefault()
    if (newData.quantity !== '' && newData.quantity !== 0) {
      setLoading(true)
      try {
        const newBalance = {
          ...balance,
          [method]:
            balance[method] +
            (typeSelected === 'income' ? newData.quantity : -newData.quantity)
        }

        const { json: jsonData, res } = await putData(
          typeSelected,
          cookies.user.data,
          newData
        )

        if (res.status === 200) {
          // Aquí accedemos dinámicamente a useStore[typeSelected]
          useStore.setState(state => {
            const currentList = state[typeSelected] || [] // Asegura que siempre sea un array

            return {
              [typeSelected]: [...currentList, jsonData], // Agrega el nuevo dato
              balance: newBalance
            }
          })

          setNewData({
            ...newData,
            quantity: '' // Restablece la cantidad
          })
        }
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
  }

  const handleType = e => {
    setTypeSelected(e)
  }

  const updateBalance = async (id, data, cat) => {
    const { res, json } = putMethodSchema(id, data, cat)
  }
  useEffect(() => {
    setNewData({
      ...newData,
      type: typesSelected[0],
      model: typeSelected
    })
    console.log(newData)
  }, [typeSelected])

  useEffect(() => {
    setNewData({
      ...newData,
      method
    })
  }, [method])

  useEffect(() => {
    setNewData({
      ...newData,
      date: new Date(date)
    })
  }, [date])

  useEffect(() => {
    updateBalance(balance._id, balance, 'balance')
  }, [balance])

  const MethodButtons = () => {
    return (
      <div>
        <button
          onClick={e => {
            e.preventDefault()
            handleMethod('card')
          }}
          className={
            method === 'card' ? 'method__button is-method' : 'method__button'
          }
        >
          <CreditCardIcon
            color={method === 'card' ? 'aquamarine' : 'white'}
            size='23px'
          />
        </button>
        <button
          onClick={e => {
            e.preventDefault()
            handleMethod('cash')
          }}
          className={
            method === 'cash' ? 'method__button is-method' : 'method__button'
          }
        >
          <CashIcon
            className={
              method === 'cash' ? 'text-[var(--brand-color)]' : 'text-white'
            }
            color={method === 'cash' ? 'aquamarine' : 'white'}
            size='23px'
          />
        </button>
      </div>
    )
  }

  const handleDate = e => {
    e.preventDefault()
    const newDate = e.target.value
    setDate(newDate)
  }

  function handleInput (e) {
    const quant = e.target.value
    if (isNaN(quant)) return
    setNewData({ ...newData, quantity: quant })
  }

  return (
    <div className={className}>
      <nav id='handle-type'>
        <a
          className={typeSelected === 'income' ? 'active' : ''}
          onClick={() => handleType(categories.income)}
        >
          Ingresos
        </a>
        <a
          className={typeSelected === 'expense' ? 'active' : ''}
          onClick={() => handleType(categories.expense)}
        >
          Gastos
        </a>
        <a
          className={typeSelected === 'saving' ? 'active' : ''}
          onClick={() => handleType(categories.saving)}
        >
          Ahorros
        </a>
        <a
          className={typeSelected === 'investment' ? 'active' : ''}
          onClick={() => handleType(categories.investment)}
        >
          Inversión
        </a>
      </nav>
      {isInput && (
        <form className='input-form'>
          <div>
            <select
              className='truncate '
              style={{ textAlign: 'center' }}
              value={newData.category}
              onChange={e =>
                setNewData({ ...newData, category: e.target.value })
              }
              name='income-types'
              id='income-types'
            >
              {categoriesSelected?.map(type => {
                return (
                  <option className='text-start' key={type} value={type}>
                    {type}
                  </option>
                )
              })}
            </select>
            <input
              style={{ fontSize: '16px' }}
              type='number'
              pattern='[0-9,]*'
              inputMode='decimal'
              id='inputValue'
              value={newData.quantity}
              placeholder={`ej: 3200${currency}`}
              onChange={handleInput}
            />
          </div>
          {/* <div className='input-form__input-container'> */}
          <div className='inputs--form'>
            <input
              type='text'
              onChange={e =>
                setNewData({ ...newData, description: e.target.value })
              }
              value={newData.description}
              placeholder='Descripción'
              style={{ fontSize: '16px' }}
            />
            <input
              style={{ border: 'none' }}
              type='date'
              id='selected-date'
              value={date}
              onChange={e => handleDate(e)}
            />
          </div>
          <div className='inputs--form'>
            <MethodButtons />
            <button onClick={addToList}>
              {loading ? 'Cargando...' : addButton}
            </button>
          </div>
          {/* </div> */}

          {/* <textarea onChange={(e) => setNewData({ ...newData, description: e.target.value })} value={newData.description} name='description' id='description' cols='35' rows='4' placeholder='Describe tu ingreso' /> */}
        </form>
      )}
    </div>
  )
}

export default Input
