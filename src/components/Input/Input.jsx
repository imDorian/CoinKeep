/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from 'react'
import './Input.css'
import { CATEGORIAS_INGRESOS } from '../../categories/INCOME_CATEGORIES'
import { CATEGORIAS_GASTOS } from '../../categories/EXPENSES_CATEGORIES'
import { TIPOS_INGRESOS } from '../../categories/INCOME_TYPES'
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
  const [loading, setLoading] = useState(false)
  const [method, setMethod] = useState('card')
  const newDatt = new Date().toISOString()
  console.log(newDatt)
  const [date, setDate] = useState(newDatt.slice(0, 10))
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
    expense: 'expense'
  }
  const [newData, setNewData] = useState({
    category: CATEGORIAS_INGRESOS[0],
    type: TIPOS_INGRESOS[0],
    quantity: '',
    currency,
    description: '',
    date: newDatt,
    method,
    model: typeSelected
  })
  const categorySelectedFunction = () => {
    if (typeSelected === categories.income) return CATEGORIAS_INGRESOS
    if (typeSelected === categories.expense) return CATEGORIAS_GASTOS
  }
  const categoriesSelected = categorySelectedFunction()

  const handleMethod = e => {
    setMethod(e)
  }

  function formateDate (e) {
    const newDate = new Date(e).toISOString()
    console.log(newDate)
    const today = new Date()
    const year = newDate.slice(0, 4)
    const month = newDate.slice(5, 7)
    const day = newDate.slice(8, 10)

    let hours = today.getHours()
    hours = hours < 10 ? `0${hours}` : hours // Agrega un cero a la hora si es necesario
    let minutes = today.getMinutes()
    minutes = minutes < 10 ? `0${minutes}` : minutes // Agrega un cero a los minutos si es necesario
    let seconds = today.getSeconds()
    seconds = seconds < 10 ? `0${seconds}` : seconds // Agrega un cero a los segundos si es necesario

    const formattedDatetime = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`
    const formattedDate = `${year}-${month}-${day}`
    console.log(formattedDate, formattedDatetime)
    return { formattedDate, formattedDatetime }
  }

  const addToList = async e => {
    e.preventDefault()
    if (newData.quantity !== '' && newData.quantity > 0) {
      setLoading(true)
      console.log(newData.date)
      try {
        const newBalance = {
          ...balance,
          [method]:
            balance[method] +
            (typeSelected === 'income'
              ? Number(newData.quantity)
              : Number(-newData.quantity))
        }

        const { json: jsonData, res } = await putData(
          typeSelected,
          cookies.user.data,
          newData
        )

        if (res.status === 200) {
          useStore.setState(state => {
            const currentList = state[typeSelected] || []

            return {
              [typeSelected]: [...currentList, jsonData],
              balance: newBalance
            }
          })

          const { formattedDatetime } = formateDate(new Date())
          setNewData({
            ...newData,
            quantity: '', // Restablece la cantidad
            description: '',
            date: formattedDatetime
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
      model: typeSelected,
      category: categoriesSelected[0]
    })
  }, [typeSelected])

  useEffect(() => {
    setNewData({
      ...newData,
      method
    })
  }, [method])

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
    console.log(e.target.value)
    const { formattedDatetime, formattedDate } = formateDate(e.target.value)
    setNewData({
      ...newData,
      date: formattedDatetime
    })
    setDate(formattedDate)
  }

  function handleInput (e) {
    const quant = e.target.value
    if (isNaN(quant)) return
    setNewData({ ...newData, quantity: Number(quant) || '' })
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
      </nav>
      <form className='input-form'>
        <div>
          <select
            className='truncate '
            style={{ textAlign: 'center' }}
            value={newData.category}
            onChange={e => setNewData({ ...newData, category: e.target.value })}
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
              setNewData({
                ...newData,
                description: e.target.value.toLocaleUpperCase()
              })
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
    </div>
  )
}

export default Input
