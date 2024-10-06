/* eslint-disable react/prop-types */
import './List.css'
import { useStore } from '../../stores/useStore'
import { useEffect, useState } from 'react'
import { isEmpty } from '@cloudinary/url-gen/backwards/utils/isEmpty'
import CreditCardIcon from '../../icons/CreditCardIcon'
import CashIcon from '../../icons/CashIcon'

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

const List = () => {
  const { income, expense, saving, investment, balance } = useStore()
  const [typeSelected, setTypeSelected] = useState('')
  function filterTypes () {
    if (typeSelected === Types.income) {
      return income
    }
    if (typeSelected === Types.expense) {
      return expense
    }
    if (typeSelected === Types.investment) {
      return investment
    }
    if (typeSelected === Types.saving) {
      return saving
    }
    const allTypes = income.concat(expense).concat(investment).concat(saving)
    return allTypes
  }
  const filteredTypes = filterTypes()
  function handleTypes (e) {
    console.log(e)
    setTypeSelected(e)
  }

  useEffect(() => {
    console.log(income)
  }, [balance])

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
      <ul className='flex flex-col px-5 h-[40vh] divide-y-[1px] divide-neutral-600 overflow-y-auto mb-6'>
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
            <li className='w-full grid grid-cols-4 py-3' key={id}>
              <span className='text-start truncate'>{category}</span>
              <span className='text-end'>
                {quantity}
                {currency}
              </span>
              <span className='flex justify-center'>
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
