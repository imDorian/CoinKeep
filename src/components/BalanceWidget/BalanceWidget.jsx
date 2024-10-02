import Article from '../Article/Article'
import { useStore } from '../../stores/useStore'
import IsBlurSpan from '../IsBlurSpan/IsBlurSpan'
import { useEffect, useState } from 'react'
import SwitchIcon from '../../icons/SwitchIcon'
import EditIcon from '../../icons/EditIcon'
import QuitIcon from '../../icons/QuitIcon'

const BalanceWidget = () => {
  const { balance, currency, focusWidget } = useStore()
  const [isEdit, setIsEdit] = useState(false)
  const [switchTransfer, setSwitchTransfer] = useState(false)
  const method = {
    card: 'Tarjeta',
    cash: 'Efectivo'
  }

  const handleSwitch = () => {
    setSwitchTransfer(!switchTransfer)
  }
  const handleEdit = () => {
    if (!isEdit) {
      const WIDGET = 'balance'
      setIsEdit(true)
      useStore.setState({ focusWidget: WIDGET })
      return
    }
    setIsEdit(false)
    useStore.setState({ focusWidget: '' })
  }
  function controllerWidgets () {
    if (focusWidget === 'personalBalance') {
      setIsEdit(false)
    }
  }

  useEffect(() => {
    controllerWidgets()
  }, [focusWidget])

  return (
    <Article
      className={
        !isEdit && focusWidget === 'personalBalance'
          ? 'h-[150px] opacity-70'
          : isEdit
          ? 'h-[200px] '
          : 'h-[200px]'
      }
      width='100%'
    >
      <button
        style={{
          display: focusWidget === 'personalBalance' ? 'none' : 'inline'
        }}
        className='absolute bottom-4 right-4 text-neutral-800 border-1 bg-neutral-400 border-neutral-400 rounded-full p-0 px-1 text-[12px] tracking-wide font-medium'
        onClick={handleEdit}
      >
        {!isEdit ? 'Editar' : 'Cancelar'}
      </button>

      {isEdit && (
        <>
          <span className='text-lg'>Transferir de </span>
          <section
            className={
              !isEdit
                ? 'grid grid-cols-2 px-4 justify-items-center items-center'
                : 'grid grid-cols-[1fr_0.5fr_1fr] justify-items-center text-center w-[80%] items-center overflow-auto'
            }
          >
            <span>{switchTransfer ? method.card : method.cash}</span>

            <button onClick={handleSwitch}>
              <SwitchIcon className='size-6 text-[var(--brand-color)]' />
            </button>

            <span>{switchTransfer ? method.cash : method.card}</span>
          </section>

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
        </>
      )}
      {!isEdit && (
        <>
          <h2>Balance</h2>
          <h3 className=''>Tarjeta</h3>
          <IsBlurSpan
            className={Number(balance.card) < 0 ? 'text-red-600' : ''}
          >
            {balance.card && balance.card.toFixed(2)}
            {currency}
          </IsBlurSpan>
          <h3 className=''>Efectivo</h3>
          <IsBlurSpan
            className={Number(balance.cash) < 0 ? 'text-red-600' : ''}
          >
            {balance.cash && balance.cash.toFixed(2)}
            {currency}
          </IsBlurSpan>
        </>
      )}
    </Article>
  )
}

export default BalanceWidget
