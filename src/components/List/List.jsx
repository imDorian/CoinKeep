/* eslint-disable react/prop-types */
import './List.css'
import { useStore } from '../../stores/useStore'
import { useEffect, useMemo, useState } from 'react'
import CreditCardIcon from '../../icons/CreditCardIcon'
import CashIcon from '../../icons/CashIcon'
import SwipeableListItem from '../SwipeableListItem/SwipeableListItem'
import { useNavigate } from 'react-router-dom'
import { putMethodSchema } from '../../functions/putMethodSchema'

const MONTHS = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre'
]

const TIPOS = ['Gastos', 'Ingresos']
const TYPES = ['expense', 'income']
const Types = {
  income: 'income',
  expense: 'expense'
}
export const Method = {
  card: 'card',
  cash: 'cash'
}
export const SORT = {
  dateUp: 'dateUp',
  dateDown: 'dateDown',
  quantUp: 'quantUp',
  quantDown: 'quantDown'
}

const List = () => {
  const navigate = useNavigate()
  const { income, expense, deleteListItem, currency, balance } = useStore()
  const [typeSelected, setTypeSelected] = useState('')
  const [sortList, setSortList] = useState(SORT.dateUp)
  const thisMonth = new Date().getMonth()
  const [monthSelected, setMonthSelected] = useState(MONTHS[thisMonth])
  const [search, setSearch] = useState({
    search: '',
    element: []
  })
  const [isModalDelete, setIsModalDelete] = useState(false)
  const [isLoadingDeleteItem, setIsLoadingDeleteItem] = useState(false)

  function handleSearch (e) {
    const newSearch = e.target.value
    setSearch({
      ...search,
      search: newSearch
    })
  }
  function sortedArray (array) {
    if (sortList === SORT.dateUp) {
      return array.sort((a, b) => new Date(b.date) - new Date(a.date))
    }
    if (sortList === SORT.dateDown) {
      return array.sort((a, b) => new Date(a.date) - new Date(b.date))
    }
    if (sortList === SORT.quantUp) {
      return array.sort((a, b) => b.quantity - a.quantity)
    }
    if (sortList === SORT.quantDown) {
      return array.sort((a, b) => a.quantity - b.quantity)
    }
  }
  function onlyMonthSelected (array) {
    const newElements = []
    array.forEach(e => {
      const date = new Date(e.date).toLocaleDateString('es-Es', {
        month: 'long'
      })
      if (date.toUpperCase() === monthSelected.toUpperCase()) {
        newElements.push(e)
      }
    })
    return newElements
  }
  function handleSort (e) {
    const sort = e.target.value
    setSortList(sort)
  }
  function filterTypes () {
    if (typeSelected === Types.income) {
      return sortedArray(income)
    }
    if (typeSelected === Types.expense) {
      return sortedArray(expense)
    }
    const allTypes = income.concat(expense)

    return sortedArray(allTypes)
  }
  const filteredTypes = filterTypes()
  function handleTypes (e) {
    setTypeSelected(e)
  }

  function handleMonth (e) {
    const month = e.target.value
    setMonthSelected(month)
  }

  function monthSelect (array) {
    const indexMonths = []
    const newMonths = []
    for (const element of array) {
      const month = new Date(element.date).getMonth()
      if (!indexMonths.includes(month)) {
        indexMonths.push(month)
      }
    }
    if (indexMonths.length > 0) {
      const sortedIndexMonths = indexMonths.sort((a, b) => b - a)
      sortedIndexMonths.forEach(e => newMonths.push(MONTHS[e]))
    } else if (indexMonths.length === 0) {
      return ['Meses']
    }
    return newMonths
  }

  const filteredData = useMemo(() => {
    return onlyMonthSelected(
      filteredTypes.filter(
        item =>
          item.category?.toLowerCase().includes(search.search.toLowerCase()) ||
          item.description
            ?.toLowerCase()
            .includes(search.search.toLowerCase()) ||
          item.method?.toLowerCase().includes(search.search.toLowerCase())
      )
    )
  }, [filteredTypes, search.search, monthSelected])

  const months = useMemo(() => {
    return monthSelect(filteredTypes)
  }, [filteredTypes])

  const updateBalance = async (id, data, cat) => {
    putMethodSchema(id, data, cat)
  }

  useEffect(() => {
    if (balance._id) {
      updateBalance(balance._id, balance, 'balance')
    }
  }, [balance])

  const ModalDelete = () => {
    return (
      isModalDelete && (
        <dialog
          open={isModalDelete}
          className='bg-neutral-800 rounded-lg fixed -top-20 right-0 left-0 bottom-0 z-50 shadow-lg border border-neutral-700 mx-3'
        >
          <div className='flex flex-col gap-5 py-4 px-4'>
            <h2>¿Estás seguro que deseas eliminar esta transacción?</h2>
            <div className='grid grid-cols-3 grid-rows-2 bg-neutral-700 rounded-lg'>
              <span className='text-slate-300 text-nowrap'>
                {deleteListItem.category}
              </span>
              <span className='text-slate-300'>{deleteListItem.model}</span>
              <span className='text-slate-300'>
                {deleteListItem.quantity}
                {currency?.slice(0, 2)}
              </span>
              <span className='text-slate-300'>
                {deleteListItem.description}
              </span>
              <span className='text-slate-300'>{deleteListItem.method}</span>
              <span className='text-slate-300'>
                {deleteListItem.formatedData}
              </span>
            </div>
            <div className='flex gap-10 justify-center'>
              <button className='bg-neutral-700' onClick={handleModalDelete}>
                Cancelar
              </button>
              <button
                disabled={isLoadingDeleteItem}
                onClick={deleteItem}
                className='text-red-500'
              >
                {isLoadingDeleteItem ? 'Borrando...' : 'Sí, estoy seguro.'}
              </button>
            </div>
          </div>
        </dialog>
      )
    )
  }

  function handleModalDelete (
    id,
    description,
    category,
    model,
    method,
    currency,
    quantity,
    formatedData
  ) {
    useStore.setState({
      deleteListItem: {
        id,
        description,
        category,
        model,
        method,
        currency,
        quantity,
        formatedData
      }
    })
    setIsModalDelete(!isModalDelete)
  }

  async function deleteItem () {
    console.log('borrar')
    setIsLoadingDeleteItem(true)
    try {
      const url =
        import.meta.env.VITE_URL + `/data/deletelistitem/${deleteListItem.id}`
      const res = await window.fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      console.log(res)
      if (res.status === 200) {
        const json = await res.json()
        console.log(json)
        setIsModalDelete(!isModalDelete)
        useStore.setState(prevState => ({
          [json.type]: prevState[json.type].filter(
            item => item._id !== json._id
          ),
          balance: {
            ...balance,
            card:
              deleteListItem.method === 'card' && json.type === 'income'
                ? prevState.balance.card - deleteListItem.quantity
                : deleteListItem.method === 'card' && json.type === 'expense'
                ? prevState.balance.card + deleteListItem.quantity
                : prevState.balance.card,
            cash:
              deleteListItem.method === 'cash' && json.type === 'income'
                ? prevState.balance.cash - deleteListItem.quantity
                : deleteListItem.method === 'cash' && json.type === 'expense'
                ? prevState.balance.cash + deleteListItem.quantity
                : prevState.balance.cash
          }
        }))
      } else {
        console.log('error')
      }
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoadingDeleteItem(false)
    }
  }

  return (
    <div className='w-full h-full flex relative'>
      <ModalDelete />
      <div className='w-full h-full px-3 my-1 rounded-[30px] list flex flex-col gap-2 fade-in'>
        <div className='flex items-center justify-center py-2 md:py-8 flex-wrap text-sm gap-2'>
          <button
            onClick={e => handleTypes(e.target.name)}
            type='button'
            className={
              typeSelected === ''
                ? 'text-blue-500 border-blue-500 list-types transition-all duration-300'
                : 'border-neutral-500 list-types transition-all duration-300'
            }
          >
            Todos los tipos
          </button>
          {TIPOS?.map((item, i) => (
            <button
              onClick={e => handleTypes(e.target.name)}
              name={TYPES[i]}
              key={i}
              type='button'
              className={
                typeSelected === TYPES[i]
                  ? 'text-blue-500 border-blue-500 list-types transition-all duration-300'
                  : 'border-neutral-500 list-types transition-all duration-300'
              }
            >
              {item}
            </button>
          ))}
        </div>
        <span className='grid grid-cols-[1.5fr_1fr_1fr] gap-2 justify-items-center items-stretch w-full'>
          <input
            onChange={handleSearch}
            value={search.search}
            className='rounded-lg bg-neutral-800 border border-neutral-600 text-start px-1 w-full'
            placeholder='ej: Alimentación'
            type='search'
            name='search'
            id='search'
          />
          <select
            value={monthSelected}
            onChange={handleMonth}
            className='truncate w-full rounded-lg bg-neutral-800 border border-neutral-600'
            name=''
          >
            {months?.map(month => {
              return (
                <option key={crypto.randomUUID()} value={month}>
                  {month}
                </option>
              )
            })}
          </select>
          <select
            name='sort'
            id='sort'
            value={sortList}
            onChange={handleSort}
            className='rounded-lg py-1 bg-neutral-800 border border-neutral-600 w-full truncate'
          >
            <option value={SORT.dateUp}>
              ↑ Fecha, la más reciente primero
            </option>
            <option value={SORT.dateDown}>
              ↓ Fecha, la más antigua primero
            </option>
            <option value={SORT.quantUp}>↑ Monto, el más alto primero</option>
            <option value={SORT.quantDown}>↓ Monto, el más bajo primero</option>
          </select>
        </span>
        <ul className='flex flex-col px-1 divide-y-[1px] divide-neutral-700 mb-3 mt-1'>
          {filteredData?.map((item, index) => {
            const {
              category,
              currency,
              quantity,
              date,
              method,
              _id: id,
              description,
              model
            } = item
            const formatedData = new Date(date).toLocaleDateString('es-Es', {
              day: 'numeric',
              month: 'short',
              year: '2-digit'
            })
            return (
              <SwipeableListItem
                key={id}
                formatedData={formatedData}
                id={id}
                model={model}
                method={method}
                category={category}
                currency={currency}
                quantity={quantity}
                description={description}
                handleModalDelete={handleModalDelete}
              />
            )
          })}
          {filteredData.length === 0 && (
            <span className='text-center p-8 text-neutral-300'>
              Todavía no hay transacciones, añade para empezar.
            </span>
          )}
        </ul>
      </div>
    </div>
  )
}

export default List
