import React, { useEffect, useState } from 'react'
import AddIcon from '../../icons/AddIcon'
import { CATEGORIAS_GASTOS } from '../../categories/EXPENSES_CATEGORIES'
import { CURRENCIES } from '../../categories/CURRENCIES'
import { CATEGORIAS_INGRESOS } from '../../categories/INCOME_CATEGORIES'
import { useStore } from '../../stores/useStore'
import { useParams } from 'react-router-dom'

const AddShare = () => {
  const { groupDetails } = useStore()
  const { members, currency } = groupDetails
  const { id } = useParams()
  const [navAdd, setNavAdd] = useState('expense')
  const [addTransaction, setAddTransaction] = useState(false)
  const cookies = JSON.parse(window.localStorage.getItem('userdata'))
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    category: CATEGORIAS_GASTOS[0],
    currency: CURRENCIES[0],
    type: navAdd,
    group: id,
    fromUser: '',
    toUser: '',
    date: new Date().toISOString().slice(0, 10),
    divide: [],
    members: [],
    method: 'card'
  })
  const [divideMethod, setDivideMethod] = useState('equal')

  const filteredMembers = members?.filter(
    member => member._id !== formData.fromUser
  )

  function newDivide () {
    const divide = members?.map(member => {
      const { username, _id: id, name } = member
      const newDiv = {
        user: id,
        amount: (0).toFixed(2),
        username,
        name,
        checked: true
      }
      return newDiv
    })
    setFormData(prevData => ({
      ...prevData,
      divide
    }))
  }

  useEffect(() => {
    if (members?.length > 0 && formData.divide.length === 0) {
      newDivide()
    }
  }, [members])

  useEffect(() => {
    if (members) {
      setFormData(prev => ({
        ...prev,
        fromUser: members.find(m => m._id === cookies.user._id)._id
      }))
    }
  }, [members])

  useEffect(() => {
    if (formData.fromUser === formData.toUser) {
      setFormData(prev => ({
        ...prev,
        toUser: ''
      }))
    }
  }, [formData.fromUser])

  const categorySelected =
    navAdd === 'income' ? CATEGORIAS_INGRESOS : CATEGORIAS_GASTOS

  function handleAddTransaction () {
    setAddTransaction(!addTransaction)
  }

  function handleNavAdd (e) {
    setNavAdd(e.target.name)
    setFormData(prev => ({
      ...prev,
      type: e.target.name,
      category:
        e.target.name === 'income'
          ? CATEGORIAS_INGRESOS[0]
          : CATEGORIAS_GASTOS[0]
    }))
  }

  function handleFormData (e) {
    setFormData(prevData => {
      return {
        ...prevData,
        [e.target.name]: e.target.value || ''
      }
    })
  }

  async function handleDivide (id, e) {
    setFormData(prevData => {
      return {
        ...prevData,
        divide: prevData.divide.map(div =>
          div.user === id
            ? {
                ...div,
                checked: e.target.checked,
                amount: e.target.checked ? div.amount : (0).toFixed(2)
              }
            : div
        )
      }
    })
    handleAmounts()
  }

  function handleAmounts () {
    if (divideMethod === 'equal') {
      setFormData(prevData => {
        const activeMembers = prevData.divide.filter(d => d.checked).length
        const total = Number(prevData.amount) / Number(activeMembers)
        return {
          ...prevData,
          divide: prevData.divide.map(d =>
            d.checked
              ? { ...d, amount: total?.toFixed(2) }
              : { ...d, amount: 0 }
          )
        }
      })
    }
  }
  useEffect(() => {
    handleAmounts()
  }, [formData.amount, divideMethod])

  function handleDivideMethod (e) {
    setDivideMethod(e.target.value)
  }

  function typeFormatt (e) {
    if (e === 'income') return 'incomes'
    if (e === 'expense') return 'expenses'
    if (e === 'transfer') return 'transfers'
  }

  const type = typeFormatt(formData.type)

  async function submitData (e) {
    e.preventDefault()
    setLoading(true)
    if (formData.amount > 0) {
      try {
        const url =
          import.meta.env.VITE_URL +
          `/data/postgrouptransaction/${groupDetails._id}`
        const res = await window.fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
            // Authorization: `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify(formData)
        })
        console.log(res)
        if (res.status === 200) {
          console.log('Transaction added successfully')
          const json = await res.json()
          console.log(json)
          console.log(type)
          useStore.setState({
            groupDetails: {
              ...groupDetails,
              [type]: [...groupDetails[type], json.transaction],
              debts: json.debts
            }
          })
          setFormData({ ...formData, amount: 0, title: '' })
          setLoading(false)
          setAddTransaction(!addTransaction)
        } else {
          console.log('Error adding transaction')
          setLoading(false)
        }
      } catch (error) {
        console.error(error)
        setLoading(false)
      }
    }
  }

  function handleDivideAmount (e, id) {
    setFormData(prev => ({
      ...prev,
      divide: prev.divide.map(d =>
        d.user === id ? { ...d, amount: Number(e.target.value) || '' } : d
      )
    }))
  }

  function handleBlurDivideAmount (id) {
    setFormData(prev => ({
      ...prev,
      divide: prev.divide.map(d =>
        d.user === id ? { ...d, amount: Number(d.amount)?.toFixed(2) } : d
      )
    }))
  }

  function handleBlurAmount () {
    setFormData(prev => ({
      ...prev,
      amount: Number(prev.amount).toFixed(2)
    }))
  }

  return (
    <div
      className={
        !addTransaction
          ? 'fixed bottom-10 right-5 transition-all duration-500 h-0 w-0 bg-transparent rounded-3xl overflow-hidden box-border z-50 opacity-100'
          : 'fixed bottom-10 right-5  transition-all duration-300  h-[75vh] w-[90vw] bg-[#3a3a3a] rounded-3xl  box-border overflow-y-auto overflow-x-hidden z-50'
      }
    >
      <button
        className={
          addTransaction
            ? 'absolute top-5 right-3 transition-all duration-300 rounded-full p-0 opacity-100'
            : 'absolute top-5 right-3 transition-all duration-500 rounded-full p-0 opacity-0 '
        }
        onClick={handleAddTransaction}
        // disabled={addTransaction}
      >
        <AddIcon className='size-8 text-red-500  rounded-full rotate-45' />
      </button>
      <div
        className={
          !addTransaction
            ? 'opacity-0 transition-all duration-300'
            : 'opacity-100  transition-all duration-500 flex flex-col p-5 gap-5'
        }
      >
        <h1 className='text-xl p-0 m-0 font-medium'>Añadir</h1>
        <ul className='flex flex-row divide-x divide-neutral-400 font-medium text-base w-full justify-between items-center text-center'>
          <li className='w-full'>
            <button
              onClick={handleNavAdd}
              name='expense'
              className={
                navAdd === 'expense'
                  ? 'p-0 text-emerald-400 w-full px-5 truncate box-border transition-colors duration-300'
                  : 'p-0 text-neutral-300 w-full px-5 truncate box-border transition-colors duration-300'
              }
            >
              Gasto
            </button>
          </li>
          <li className='w-full'>
            <button
              onClick={handleNavAdd}
              name='income'
              className={
                navAdd === 'income'
                  ? 'p-0 text-emerald-400 w-full px-5 truncate box-border transition-colors duration-300'
                  : 'p-0 text-neutral-300 w-full px-5 truncate box-border transition-colors duration-300'
              }
            >
              Ingreso
            </button>
          </li>
          <li className='w-full truncate'>
            <button
              onClick={handleNavAdd}
              name='transfer'
              className={
                navAdd === 'transfer'
                  ? 'p-0 text-emerald-400 w-full px-5 truncate box-border transition-colors duration-300'
                  : 'p-0 text-neutral-300 w-full px-5 truncate box-border transition-colors duration-300'
              }
            >
              Transferencia
            </button>
          </li>
        </ul>
        <form onSubmit={submitData} className='flex flex-col gap-1 w-full'>
          <div className='grid grid-cols-[3fr_62px_0.5fr] gap-2 items-end'>
            <label
              htmlFor='title-add'
              className='flex flex-col items-start text-lg gap-1'
            >
              Título
              <input
                id='title-add'
                type='text'
                placeholder='Por ejemplo, Restaurante'
                className='rounded-lg px-3 py-1 h-9 bg-neutral-900 w-full'
                name='title'
                onChange={handleFormData}
                value={formData.title}
                required
              />
            </label>
            <label
              htmlFor='category-add'
              className='flex flex-col items-start justify-center text-lg w-full'
            >
              {/* Categoría */}
              <select
                id='category-add'
                type='text'
                className='rounded-lg py-1 px-2 h-9 bg-neutral-900 w-full'
                name='category'
                onChange={handleFormData}
                value={formData.category}
              >
                {categorySelected?.map(item => (
                  <option key={crypto.randomUUID()} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className='grid grid-cols-[3fr_62px_0.5fr] gap-2 items-end'>
            <label
              htmlFor='quantity-add'
              className='flex flex-col justify-center items-start text-lg gap-1'
            >
              Cantidad
              <input
                required
                id='quantity-add'
                type='number'
                pattern='[0-9,]*'
                inputMode='decimal'
                placeholder='Por ejemplo, 33€'
                className='rounded-lg py-1 px-3 bg-neutral-900 w-full'
                name='amount'
                onChange={handleFormData}
                value={formData.amount}
                onBlur={handleBlurAmount}
              />
            </label>
            <label
              htmlFor='currency-add'
              className='h-9 flex flex-col text-lg items-center'
            >
              <select
                id='currency-add'
                type='text'
                className='rounded-lg px-0 py-1 bg-neutral-900 text-center w-full h-9'
                onChange={handleFormData}
                value={formData.currency}
                name='currency'
              >
                {CURRENCIES?.map(item => (
                  <option key={crypto.randomUUID()} value={item}>
                    {item?.slice(0, 2)}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className='w-full flex flex-col'>
            <span
              title='Modalidad preferida de vuelta'
              className='text-start w-full text-lg'
            >
              Modalidad
            </span>
            <div className='flex flex-row w-fit rounded-lg bg-neutral-900 text-lg h-9'>
              <input
                name='method'
                type='radio'
                value='card'
                id='card-add'
                className='peer/card hidden'
                checked={formData.method === 'card'}
                onChange={handleFormData}
              />
              <label
                className='peer-checked/card:bg-blue-500 py-1 px-3 rounded-lg transition-colors duration-300'
                htmlFor='card-add'
              >
                Tarjeta
              </label>
              <input
                name='method'
                type='radio'
                value='cash'
                id='cash-add'
                className='peer/cash hidden'
                checked={formData.method === 'cash'}
                onChange={handleFormData}
              />
              <label
                htmlFor='cash-add'
                className='peer-checked/cash:bg-blue-500 py-1 px-3 rounded-lg transition-colors duration-300'
              >
                Efectivo
              </label>
            </div>
          </div>
          <div className='w-full grid grid-cols-2 text-lg gap-2'>
            <label
              htmlFor='paid-for-add'
              className='flex flex-col text-lg items-start'
            >
              {navAdd === 'expense' && 'Pagado por'}
              {navAdd === 'income' && 'Recibido por'}
              {navAdd === 'transfer' && 'Desde'}
              <select
                id='paid-for-add'
                type='text'
                className='rounded-lg py-1 px-3 bg-neutral-900 text-start w-full h-9'
                onChange={handleFormData}
                name='fromUser'
                value={formData.fromUser}
              >
                {members?.map(member => {
                  return (
                    <option key={member._id} value={member._id}>
                      {member.username}
                    </option>
                  )
                })}
              </select>
            </label>
            <label
              htmlFor='date-add'
              className='flex flex-col text-lg items-start'
            >
              Cuando
              <input
                id='date-add'
                type='date'
                placeholder='Por ejemplo, Restaurante'
                className='rounded-lg  bg-neutral-900 py-1 h-9 px-3 w-full'
                onChange={handleFormData}
                value={formData.date}
                name='date'
              />
            </label>
          </div>
          {navAdd !== 'transfer' && (
            <div className='flex flex-col gap-2 mt-2 w-full'>
              <div className='w-full flex flex-row justify-between items-end'>
                <h2 className='text-start text-lg font-medium'>Dividir</h2>
                <select
                  name='divide-options'
                  id='divide-options'
                  className='py-1 px-2 truncate bg-neutral-600 border border-neutral-500'
                  value={divideMethod}
                  onChange={handleDivideMethod}
                >
                  <option value='equal'>Igualmente</option>
                  <option value='custom'>Personalizado</option>
                </select>
              </div>
              <ul className='divide-y divide-neutral-600 bg-neutral-800 rounded-xl px-2 py-1'>
                {formData.divide?.map((div, i) => {
                  const { user, name, checked, username } = div

                  return (
                    <li key={user} className='w-full py-2'>
                      <label
                        htmlFor={user}
                        className='grid grid-cols-[0.5fr_2fr_1fr] text-lg items-center justify-items-center'
                      >
                        <input
                          id={user}
                          type='checkbox'
                          className='size-5 text-end'
                          value={user}
                          checked={checked}
                          onChange={e => handleDivide(user, e)}
                          // disabled={user === cookies.user._id}
                          //   value={}
                        />
                        <span className='text-start w-full'>
                          {name}
                          <span className='text-sm text-neutral-400'>
                            {username.slice(-5)}
                          </span>
                        </span>

                        <span className='w-full flex flex-row items-center gap-2'>
                          <input
                            type='number'
                            className='w-full text-center rounded-lg h-max'
                            pattern='[0-9,]*'
                            inputMode='decimal'
                            disabled={divideMethod === 'equal' || !checked}
                            // placeholder={}
                            name='amount'
                            value={formData.divide[i].amount}
                            onChange={e => handleDivideAmount(e, user, i)}
                            onBlur={() => handleBlurDivideAmount(user)}
                          />
                          {currency.slice(0, 2)}
                        </span>
                      </label>
                    </li>
                  )
                })}
              </ul>
            </div>
          )}
          {navAdd === 'transfer' && (
            <div className='w-full flex flex-col'>
              <label
                htmlFor='transfer-to-add'
                className='flex flex-col items-start justify-start text-lg'
              >
                Transferir a
                <select
                  name='toUser'
                  id='transfer-to-add'
                  className='px-3 py-1 bg-neutral-900 text-start w-full h-9'
                  value={formData.toUser}
                  onChange={handleFormData}
                  required
                >
                  <option name='' id='' value=''>
                    Participantes
                  </option>
                  {filteredMembers?.map(m => (
                    <option key={m._id} value={m._id}>
                      {m.username}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          )}
          <button
            type='submit'
            className='w-full py-2 bg-emerald-800 box-border mt-3 disabled:opacity-70'
            disabled={loading}
          >
            {navAdd === 'expense' && !loading && 'Añadir Gasto'}
            {navAdd === 'income' && !loading && 'Añadir Ingreso'}
            {navAdd === 'transfer' && !loading && 'Transferir'}
            {loading && 'Cargando...'}
          </button>
        </form>
      </div>

      <button
        className={
          !addTransaction
            ? 'fixed bottom-10 right-5 transition-all duration-300 rounded-full p-0 shadow-lg shadow-neutral-950 z-50 opacity-100'
            : 'fixed bottom-10 right-3 transition-all duration-300 rounded-full p-0 shadow-lg shadow-neutral-950 opacity-0'
        }
        onClick={handleAddTransaction}
        disabled={addTransaction}
      >
        <AddIcon
          className={
            !addTransaction
              ? 'size-12 text-[var(--brand-color)] rounded-full transition-all duration-300'
              : 'size-8 text-red-500  rounded-full rotate-45 transition-all duration-300'
          }
        />
      </button>
    </div>
  )
}

export default AddShare
