import React, { useState } from 'react'
import { Method } from '../List/List'
import CreditCardIcon from '../../icons/CreditCardIcon'
import CashIcon from '../../icons/CashIcon'
import TrashIcon from '../../icons/TrashIcon'
import EditIcon from '../../icons/EditIcon'
import { useNavigate } from 'react-router-dom'

function isDecimal (numero) {
  if (!Number.isInteger(numero)) return Number(numero).toFixed(2)
  return Number(numero)
}

function traductorModel (e) {
  if (e === 'income') return 'Ingreso'
  if (e === 'expense') return 'Gasto'
  if (e === 'saving') return 'Ahorro'
  if (e === 'investment') return 'Inversión'
}
const SwipeableListItem = ({
  id,
  description,
  category,
  model,
  method,
  currency,
  quantity,
  formatedData,
  handleModalDelete
}) => {
  const [touchStartX, setTouchStartX] = useState('')
  const [touchMoveX, setTouchMoveX] = useState('')
  const [isTimeOutActive, setIsTimeOutActive] = useState(false)
  const [isSwiping, setIsSwiping] = useState(false)
  const navigate = useNavigate()

  function handleTouchStart (e) {
    const touch = e.touches[0].clientX
    if (!isTimeOutActive) {
      setTouchStartX(touch)
      setIsSwiping(true)
    }
  }

  function handleTouchMove (e) {
    let touch = e.touches[0].clientX - touchStartX
    if (!isTimeOutActive) {
      if (touch > 250) {
        touch = 250
      } else if (touch < -250) {
        touch = -250
      }
      setTouchMoveX(touch)
    }
  }

  function timeOut () {
    setTimeout(() => {
      setTouchMoveX(0)
      setIsTimeOutActive(false)
    }, 3000)
  }

  function handleTouchEnd () {
    if (!isTimeOutActive) {
      setIsSwiping(false)
      if (touchMoveX < -100) {
        setIsTimeOutActive(true)
        setTouchMoveX(-150)
        timeOut()
      } else if (touchMoveX > 100) {
        setIsTimeOutActive(true)
        setTouchMoveX(150)
        timeOut()
      } else if (touchMoveX < 100 || touchMoveX > -100) {
        setTouchMoveX(0)
      }
    }
  }

  // function openDetails () {
  //   navigate(`/transaction/${id}`)
  // }

  function editItem () {
    console.log('editar')
  }

  return (
    <li
      className='w-full relative bg-[var(--bg-color)] overflow-hidden flex items-center h-16'
      key={id}
    >
      <div className='w-full h-full flex flex-row items-center justify-center box-border py-1 px-1'>
        <button
          className='h-full bg-slate-400 flex justify-start items-center rounded-l-lg rounded-r-none box-border ps-5 transition-all duration-500 gap-2'
          onClick={editItem}
          style={{
            width: isSwiping && touchMoveX > 200 ? '100%' : '50%'
          }}
        >
          <EditIcon className='size-5' />
          Editar
        </button>
        <button
          className='h-full bg-red-400 flex items-center justify-end rounded-r-lg rounded-l-none box-border pe-5 transition-all duration-500 gap-2'
          onClick={() =>
            handleModalDelete(
              id,
              description,
              category,
              model,
              method,
              currency,
              quantity,
              formatedData
            )
          }
          style={{
            width: isSwiping && touchMoveX < -200 ? '100%' : '50%'
          }}
        >
          Borrar
          <TrashIcon className='size-5' />
        </button>
      </div>
      <div
        className='w-full py-3 px-2 box-border grid grid-cols-[0.5fr_2.5fr_1fr_1.5fr] justify-items-center absolute bg-[var(--bg-color)]'
        style={{
          transform: `translateX(${touchMoveX}px)`,
          transition: isSwiping ? 'none' : 'transform 0.3s ease'
        }}
        onTouchStart={e => handleTouchStart(e)}
        onTouchMove={e => handleTouchMove(e)}
        onTouchEnd={e => handleTouchEnd(e)}
        // onClick={openDetails}
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
      </div>
    </li>
  )
}

export default SwipeableListItem
