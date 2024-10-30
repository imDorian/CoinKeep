/* eslint-disable react/prop-types */
import './List.css'
import { useStore } from '../../stores/useStore'
import { useMemo, useState } from 'react'
import CreditCardIcon from '../../icons/CreditCardIcon'
import CashIcon from '../../icons/CashIcon'

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

const TIPOS = ['Ingresos', 'Gastos']
const TYPES = ['income', 'expense']
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
  const { income, expense } = useStore()
  const [typeSelected, setTypeSelected] = useState('')
  const [sortList, setSortList] = useState(SORT.dateUp)
  const thisMonth = new Date().getMonth()
  const [monthSelected, setMonthSelected] = useState(MONTHS[thisMonth])
  const [search, setSearch] = useState({
    search: '',
    element: []
  })
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
      filteredTypes.filter(item =>
        item.category.toLowerCase().includes(search.search.toLowerCase())
      )
    )
  }, [filteredTypes, search.search, monthSelected])

  function traductorModel (e) {
    if (e === 'income') return 'Ingreso'
    if (e === 'expense') return 'Gasto'
    if (e === 'saving') return 'Ahorro'
    if (e === 'investment') return 'Inversión'
  }

  const months = useMemo(() => {
    return monthSelect(filteredTypes)
  }, [filteredTypes])

  function isDecimal (numero) {
    if (!Number.isInteger(numero)) return Number(numero).toFixed(2)
    return Number(numero)
  }

  return (
    <div className='w-full px-3 my-1  rounded-[30px] list flex flex-col gap-2'>
      <div className='flex items-center justify-center py-2 md:py-8 flex-wrap text-sm gap-2'>
        <button
          onClick={e => handleTypes(e.target.name)}
          type='button'
          className={
            typeSelected === ''
              ? 'text-blue-500 border-blue-500'
              : 'border-neutral-500'
          }
        >
          Todos los tipos
        </button>
        {TIPOS?.map((item, i) => (
          <button
            onClick={e => handleTypes(e.target.name)}
            name={TYPES[i]}
            key={crypto.randomUUID()}
            type='button'
            className={
              typeSelected === TYPES[i]
                ? 'text-blue-500 border-blue-500'
                : 'border-neutral-500'
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
          <option value={SORT.dateUp}>↑ Fecha, la más reciente primero</option>
          <option value={SORT.dateDown}>↓ Fecha, la más antigua primero</option>
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
            <li
              className='w-full py-3 grid grid-cols-[0.5fr_2.5fr_1fr_1.5fr] justify-items-center'
              key={id}
            >
              <div className='flex items-center rounded-full justify-center text-center'>
                <span className='text-xl bg-neutral-700 size-11 flex items-center justify-center rounded-full'>
                  {category.slice(0, 2)}
                </span>
              </div>
              <div className='w-full flex flex-col text-start items-start truncate ps-3'>
                <span className='w-full truncate'>{category.slice(2)}</span>
                <span className='text-neutral-400 text-sm truncate'>
                  {description}
                </span>
              </div>
              <div className='flex flex-col items-start w-full text-start'>
                <span className='w-full'>{traductorModel(model)}</span>
                <span className='text-neutral-400'>
                  {method === Method.card ? (
                    <CreditCardIcon className='size-5' />
                  ) : (
                    <CashIcon className='size-5' />
                  )}
                </span>
              </div>
              <div className='w-full flex flex-col text-end justify-between truncate'>
                <span className={model !== 'income' ? 'text-red-300' : ''}>
                  {model !== 'income' && '-'}
                  {isDecimal(quantity)}
                  {currency}
                </span>
                <span className='text-end text-neutral-400 text-sm truncate'>
                  {formatedData}
                </span>
              </div>
            </li>
          )
        })}
        {filteredData.length === 0 && (
          <span className='text-center p-8 text-neutral-300'>
            Todavía no hay transacciones, añade para empezar.
          </span>
        )}
      </ul>
    </div>
  )
}

export default List
