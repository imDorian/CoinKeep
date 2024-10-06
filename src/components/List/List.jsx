/* eslint-disable react/prop-types */
import './List.css'
import { useStore } from '../../stores/useStore'
import { useEffect, useState } from 'react'
import CreditCardIcon from '../../icons/CreditCardIcon'
import CashIcon from '../../icons/CashIcon'
import UpIcon from '../../icons/UpIcon'

export const thisMonth = new Date().toLocaleDateString('es-ES', {
  month: 'long'
})

const TIPOS = ['Ingresos', 'Gastos', 'Ahorro', 'Inversión']
const TYPES = ['income', 'expense', 'saving', 'investment']
const Types = {
  income: 'income',
  expense: 'expense',
  saving: 'saving',
  investment: 'investment'
}
const Method = {
  card: 'card',
  cash: 'cash'
}
const SORT = {
  dateUp: 'dateUp',
  dateDown: 'dateDown',
  quantUp: 'quantUp',
  quantDown: 'quantDown'
}

const List = () => {
  const { income, expense, saving, investment, balance } = useStore()
  const [typeSelected, setTypeSelected] = useState('')
  const [sortList, setSortList] = useState(SORT.dateUp)
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
    if (typeSelected === Types.investment) {
      return sortedArray(investment)
    }
    if (typeSelected === Types.saving) {
      return sortedArray(saving)
    }
    const allTypes = income.concat(expense).concat(investment).concat(saving)

    return sortedArray(allTypes)
  }
  const filteredTypes = filterTypes()
  function handleTypes (e) {
    setTypeSelected(e)
  }

  return (
    <div className='w-full p-2 mx-4 my-1 bg-[var(--gray-color)] rounded-[30px] list'>
      <div className='flex items-center justify-center py-2 md:py-8 flex-wrap text-sm gap-2'>
        <button
          name=''
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
      <span className='flex px-4 py-1 justify-between'>
        <input
          className='rounded-lg bg-neutral-800 border border-neutral-600 text-start px-1'
          placeholder='ej: Restaurante'
          type='search'
          name='search'
          id='search'
        />
        <select
          name='sort'
          id='sort'
          value={sortList}
          onChange={handleSort}
          className='rounded-lg p-1 bg-neutral-800 border border-neutral-600'
        >
          <option value={SORT.dateUp}>Fecha ↑</option>
          <option value={SORT.dateDown}>Fecha ↓</option>
          <option value={SORT.quantUp}>Monto ↑</option>
          <option value={SORT.quantDown}>Monto ↓</option>
        </select>
      </span>
      <ul className='flex flex-col px-5 h-[42vh] divide-y-[1px] divide-neutral-600 overflow-y-auto mb-6'>
        {filteredTypes?.map((item, index) => {
          const {
            category,
            currency,
            quantity,
            type,
            date,
            method,
            _id: id
          } = item
          const formatedData = new Date(date).toLocaleDateString('es-Es', {
            day: 'numeric',
            month: 'short',
            year: '2-digit'
          })
          return (
            <li
              className='w-full grid grid-cols-[2fr_2fr_1fr_2fr] py-3'
              key={id}
            >
              <span className='text-start truncate'>{category}</span>
              <span className='text-end'>
                {quantity}
                {currency}
              </span>
              <span className='flex justify-end'>
                {method === Method.card ? <CreditCardIcon /> : <CashIcon />}
              </span>
              <span className='text-end'>{formatedData}</span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default List
