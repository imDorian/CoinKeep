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
import AddIcon from '../../icons/AddIcon'
import Balance from '../Balance/Balance'
import { putData } from '../../functions/putData'
import { userDataContext } from '../../contexts/ContextProvider'
import { useStore } from '../../stores/useStore'
import CreditCardIcon from '../../icons/CreditCardIcon'
import CashIcon from '../../icons/CashIcon'
const Input = ({ currency }) => {
  const { setTypeSelected, typeSelected } = useContext(userDataContext)
  const cookies = JSON.parse(window.localStorage.getItem('userdata'))
  const [isInput, setIsInput] = useState(false)
  const [method, setMethod] = useState('card')
  const store = useStore(state => state)
  const date = new Date()
  const addButton = typeSelected === 'income' ? 'Añadir ingreso' : typeSelected === 'expense' ? 'Añadir gasto' : typeSelected === 'saving' ? 'Añadir ahorro' : 'Añadir inversión'
  const categories = {
    income: 'income',
    expense: 'expense',
    saving: 'saving',
    investment: 'investment'
  }
  const [newData, setNewData] = useState({
    category: CATEGORIAS_INGRESOS[0],
    type: TIPOS_INGRESOS[0],
    quantity: '',
    currency: '€',
    description: '',
    date,
    method
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

  const handleInput = () => {
    setIsInput(!isInput)
  }
  const handleMethod = (e) => {
    setMethod(e)
  }

  // useEffect(() => {
  //   setNewData({
  //     ...newData,
  //     category: categoriesSelected[0],
  //     type: typesSelected[0],
  //     quantity: '',
  //     description: '',
  //     date
  //   })
  // }, [typeSelected])

  const addToList = async (e) => {
    e.preventDefault()
    // Si el balance (card o efectivo) te lo permite
    // REVISAR ESTO <------------------------------->
    const { json } = await putData(typeSelected, cookies.user.data, newData)
    // IF RES === 200 ENTONCES........
    useStore.setState({
      [typeSelected]: [json, ...store[typeSelected]]
    })
    console.log(newData)
  }

  const handleType = (e) => {
    setTypeSelected(e)
    setNewData({
      category: categoriesSelected[0],
      type: typesSelected[0],
      quantity: '',
      currency: '€',
      description: '',
      date
    })
    console.log(newData)
  }

  useEffect(() => {
    setNewData({
      ...newData,
      method
    })
  }, [method])

  const MethodButtons = () => {
    return (
      <div>
        <button onClick={e => { e.preventDefault(); handleMethod('card') }} className={method === 'card' ? 'method__button is-method' : 'method__button'}><CreditCardIcon color={method === 'card' ? 'aquamarine' : 'white'} size='23px' /></button>
        <button onClick={e => { e.preventDefault(); handleMethod('cash') }} className={method === 'cash' ? 'method__button is-method' : 'method__button'}><CashIcon color={method === 'cash' ? 'aquamarine' : 'white'} size='23px' /></button>
      </div>
    )
  }

  return (
    <div className='sticky'>
      <div id='finance__bar'>
        <h1>Mis Finanzas</h1>
        <button onClick={handleInput}><AddIcon size='24px' color='aquamarine' /></button>
      </div>
      <Balance currency={currency} />
      <nav id='handle-type'>
        <a href='#income' className={typeSelected === 'income' ? 'active' : ''} onClick={() => handleType(categories.income)}>Ingresos</a>
        <a href='#expense' className={typeSelected === 'expense' ? 'active' : ''} onClick={() => handleType(categories.expense)}>Gastos</a>
        <a href='#saving' className={typeSelected === 'saving' ? 'active' : ''} onClick={() => handleType(categories.saving)}>Ahorros</a>
        <a href='#investment' className={typeSelected === 'investment' ? 'active' : ''} onClick={() => handleType(categories.investment)}>Inversión</a>
      </nav>
      {isInput &&
        <form className='input-form'>
          <div>
            <select onChange={(e) => setNewData({ ...newData, category: e.target.value })} value={newData.category} name='select'>
              {categoriesSelected && categoriesSelected.map(category => {
                return (
                  <option key={category} value={category}>{category}</option>
                )
              })}
            </select>
            <select value={newData.type} onChange={(e) => setNewData({ ...newData, type: e.target.value })} name='income-types' id='income-types'>
              {typesSelected && typesSelected.map(type => {
                return (
                  <option key={type} value={type}>{type}</option>
                )
              })}
            </select>
          </div>
          <div className='input-form__input-container'>
            <input type='number' value={newData.quantity} placeholder='0' onChange={(e) => setNewData({ ...newData, quantity: parseFloat(e.target.value) })} />
            <span className='currency'>{currency}</span>
            <MethodButtons />
            <button onClick={addToList}>{addButton}</button>
          </div>
          {/* <textarea onChange={(e) => setNewData({ ...newData, description: e.target.value })} value={newData.description} name='description' id='description' cols='35' rows='4' placeholder='Describe tu ingreso' /> */}
        </form>}
    </div>
  )
}

export default Input
