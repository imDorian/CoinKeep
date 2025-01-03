import React, { useState } from 'react'
import './ItemGroup.css'

const ItemGroup = ({
  id,
  category,
  title,
  type,
  fromUser,
  toUser,
  divide,
  currency,
  amount,
  fecha
}) => {
  const [isDetails, setIsDetails] = useState(false)
  function handleDetails () {
    setIsDetails(!isDetails)
  }
  return (
    <li
      key={id}
      className='w-full overflow-hidden transaction-group text-end'
      style={{
        alignItems: 'flex-start'
      }}
    >
      <div className='w-full py-3  grid grid-cols-[0.5fr_4fr_2fr] items-center transition-all duration-300'>
        {/* <button
      onClick={handleDetails}
      className='text-end p-0 m-0 '
    >
      Mostrar más
    </button> */}
        <span className='text-xl bg-neutral-700 size-10 flex items-center justify-center rounded-full'>
          {!category ? '↘️' : category.slice(0, 2)}
        </span>
        <div className='w-full flex flex-col text-start items-start justify-between truncate ps-2'>
          <span className='w-full truncate text-base'>
            {title || 'Transferencia'}
          </span>
          <span className='text-neutral-400 truncate w-full text-sm'>
            {type === 'income' ? (
              <>
                Recibido por{' '}
                <span className='font-medium'>
                  {fromUser.name}
                  <span className='text-xs'>{fromUser.username.slice(-5)}</span>
                </span>
              </>
            ) : type === 'expense' ? (
              <>
                Pagado por{' '}
                <span className='font-medium'>
                  {fromUser.name}
                  <span className='text-xs'>
                    {fromUser.username?.slice(-5)}
                  </span>
                </span>
              </>
            ) : (
              !type && (
                <>
                  De{' '}
                  <span className='font-medium'>
                    {fromUser.name}
                    <span className='text-xs'>
                      {fromUser.username.slice(-5)}
                    </span>
                  </span>{' '}
                  a{' '}
                  <span className='font-medium'>
                    {toUser.name}
                    <span className='text-xs'>{toUser.username.slice(-5)}</span>
                  </span>
                </>
              )
            )}
          </span>
        </div>
        <div className='w-full flex flex-col text-end justify-between truncate'>
          <span className='font-medium'>
            {amount?.toFixed(2)}
            {currency?.slice(0, 2)}
          </span>
          <span className='text-end text-neutral-400 truncate text-sm'>
            {fecha}
          </span>
        </div>
      </div>
      {divide.length !== 0 && (
        <button
          onClick={handleDetails}
          className='text-end text-sm text-slate-400 p-0 mb-3'
        >
          {isDetails ? 'Mostrar menos' : 'Mostrar más'}
        </button>
      )}
      {divide.length !== 0 && (
        <ul
          className={
            isDetails
              ? 'w-full flex text-center flex-col divide-y divide-neutral-700 box-border transaction-group h-auto transition-all duration-300 px-10 pb-3'
              : 'w-full flex flex-col divide-y divide-neutral-700 box-border h-0 overflow-hidden transaction-group transition-all duration-300 text-center opacity-0'
          }
        >
          {divide.map(d => {
            const { user, amount, name, settled, _id: id } = d
            return (
              <li key={id} className='grid grid-cols-2 w-full my-1 p-0'>
                <span className='font-medium'>{name}</span>
                <span className='text-neutral-400'>
                  {amount?.toFixed(2)}
                  {currency?.slice(0, 2)}
                </span>
              </li>
            )
          })}
        </ul>
      )}
    </li>
  )
}

export default ItemGroup
