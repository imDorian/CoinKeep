import Article from '../Article/Article'
import { useStore } from '../../stores/useStore'
import IsBlurSpan from '../IsBlurSpan/IsBlurSpan'
import { useState } from 'react'
import SwitchIcon from '../../icons/SwitchIcon'
import EditIcon from '../../icons/EditIcon'
import QuitIcon from '../../icons/QuitIcon'

const BalanceWidget = () => {
  const { balance, currency } = useStore()
  const [isEdit, setIsEdit] = useState(false)
  const [switchTransfer, setSwitchTransfer] = useState(false)
  const method = {
    card: 'Tarjeta',
    cash: 'Efectivo'
  }

  const handleEdit = () => {
    setIsEdit(!isEdit)
  }

  const handleSwitch = () => {
    setSwitchTransfer(!switchTransfer)
  }
  return (
    <Article className={isEdit ? 'h-[180px]' : 'h-[150px]'} width='100%'>
      {!isEdit ? (
        <h2>Balance</h2>
      ) : (
        <span className='text-lg'>Transferir de </span>
      )}
      <section
        className={
          !isEdit
            ? 'grid grid-cols-2 px-4 justify-items-center items-center'
            : 'grid grid-cols-[1fr_0.5fr_1fr] justify-items-center text-center w-[80%] items-center overflow-auto'
        }
      >
        {isEdit ? (
          <span>{switchTransfer ? method.card : method.cash}</span>
        ) : (
          <span>Tarjeta</span>
        )}

        {isEdit && (
          <button onClick={handleSwitch}>
            <SwitchIcon className='size-6 text-[var(--brand-color)]' />
          </button>
        )}
        {isEdit && <span>{switchTransfer ? method.cash : method.card}</span>}
        {!isEdit && (
          <span>
            <IsBlurSpan>
              {balance.card && balance.card.toFixed(2)}
              {currency}
            </IsBlurSpan>
          </span>
        )}
      </section>
      {!isEdit && (
        <section className='grid grid-cols-2 justify-items-center'>
          <span>Efectivo</span>
          <span>
            <IsBlurSpan>
              {balance.cash && balance.cash.toFixed(2)}
              {currency}
            </IsBlurSpan>
          </span>
        </section>
      )}
      {isEdit && (
        <>
          <input
            className='text-center h-7 rounded-md w-[80%]'
            type='number'
            placeholder='ej: 120€'
          />
          <button
            className='mt-1 tracking-wider bg-emerald-600 text-neutral-800 font-bold text-center text-basic w-[80%] flex p-[2px] justify-center
           '
          >
            Transferir
          </button>
          <button onClick={handleEdit} className='absolute top-1 right-0'>
            <QuitIcon className='text-neutral-500 stroke-transparent size-4' />
          </button>
        </>
      )}
      {!isEdit && (
        <button onClick={handleEdit} className='absolute top-1 right-0'>
          <EditIcon className='size-4 stroke-transparent text-neutral-400' />
        </button>
      )}
    </Article>
  )
}

export default BalanceWidget
