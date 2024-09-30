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
    <Article width='100%'>
      {!isEdit ? (
        <h2>Balance</h2>
      ) : (
        <span className='text-lg'>Transferir de </span>
      )}
      <section
        className={
          !isEdit
            ? 'grid grid-cols-2 px-4 justify-items-center'
            : 'grid grid-cols-3 justify-items-center text-center px-4'
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
        <section className='grid grid-cols-2 justify-items-center px-4'>
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
            className='text-center h-7 rounded-md'
            type='number'
            placeholder='ej: 120€'
          />
          <button className='mt-1 tracking-wider bg-emerald-600 text-neutral-800 font-bold text-lg'>
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
