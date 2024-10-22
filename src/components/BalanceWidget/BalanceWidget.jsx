import Article from '../Article/Article'
import { useStore } from '../../stores/useStore'
import IsBlurSpan from '../IsBlurSpan/IsBlurSpan'
import { useEffect, useState } from 'react'
import SwitchIcon from '../../icons/SwitchIcon'
import { putMethodSchema } from '../../functions/putMethodSchema'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'

const BalanceWidget = ({ className }) => {
  const { balance, currency, focusWidget } = useStore()
  const [isEdit, setIsEdit] = useState(false)
  const method = {
    card: 'card',
    cash: 'cash'
  }
  const [transfer, setTransfer] = useState({
    from: 'card',
    to: 'cash',
    amount: ''
  })

  function handleAmount (e) {
    const quant = e.target.value
    if (isNaN(quant)) return
    setTransfer({ ...transfer, amount: quant })
  }

  const handleTransfer = () => {
    if (transfer.from === method.card) {
      setTransfer({ ...transfer, from: method.cash, to: method.card })
    } else if (transfer.from === method.cash) {
      setTransfer({ ...transfer, from: method.card, to: method.cash })
    }
  }

  function handleSubmitTransfer () {
    const amount = Number(transfer.amount)
    if (amount > 0) {
      if (transfer.from === method.card) {
        useStore.setState({
          balance: {
            ...balance,
            card: Number(balance.card) - amount,
            cash: Number(balance.cash) + amount
          }
        })
      } else if (transfer.from === method.cash) {
        useStore.setState({
          balance: {
            ...balance,
            card: Number(balance.card) + amount,
            cash: Number(balance.cash) - amount
          }
        })
      }
    }
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

  useEffect(() => {
    if (balance._id) {
      putMethodSchema(balance._id, balance, 'balance')
    } else {
      console.error('error', balance)
    }
  }, [balance])

  return (
    <Article
      className={isEdit ? 'mx-4 h-[180px] items-center' : 'mx-4 h-[150px]'}
    >
      {!isEdit && (
        <DotLottieReact
          className='absolute top-0 right-[25%] size-[120px]'
          src='/LottieAnimation/Balance.lottie'
          autoplay='true'
          //   playOnHover='true'
          renderConfig={{ autoResize: 'true' }}
        />
      )}
      <button
        style={{
          display: focusWidget === 'personalBalance' ? 'none' : 'inline'
        }}
        className='absolute bottom-4 right-4 opacity-85 text-neutral-800 border-1 bg-neutral-400 border-neutral-400 rounded-full p-0 px-1 text-[12px] tracking-wide font-medium'
        onClick={handleEdit}
      >
        {!isEdit ? 'Editar' : 'Cancelar'}
      </button>

      <h2 className={!isEdit ? 'text-start' : 'text-center'}>Balance</h2>
      <div
        className={
          !isEdit
            ? 'flex flex-col'
            : 'grid grid-cols-3 items-center justify-items-center w-[70%]'
        }
      >
        <div className={!isEdit ? 'items-start' : 'items-center'}>
          <h3 className=''>
            {transfer.from === method.card ? 'Tarjeta' : 'Efectivo'}
          </h3>
          <IsBlurSpan
            className={
              transfer.from === method.card && Number(balance.card) < 0
                ? 'text-red-300'
                : transfer.from === method.cash && Number(balance.cash) < 0
                ? 'text-red-300'
                : ''
            }
          >
            {transfer.from === method.card && balance
              ? Number(balance.card).toFixed(2)
              : Number(balance.cash).toFixed(2)}
            {currency}
          </IsBlurSpan>
        </div>
        {isEdit && (
          <button onClick={handleTransfer}>
            <SwitchIcon className='size-6 text-neutral-300' />
          </button>
        )}
        <div className={!isEdit ? 'items-start' : 'items-center'}>
          <h3 className=''>
            {transfer.to === method.card ? 'Tarjeta' : 'Efectivo'}
          </h3>

          <IsBlurSpan
            className={
              transfer.to === method.cash && Number(balance.cash) < 0
                ? 'text-red-300'
                : transfer.to === method.card && Number(balance.card) < 0
                ? 'text-red-300'
                : ''
            }
          >
            {transfer.to === method.cash && balance
              ? Number(balance.cash).toFixed(2)
              : Number(balance.card).toFixed(2)}
            {currency}
          </IsBlurSpan>
        </div>
      </div>
      {isEdit && (
        <div className='flex flex-col items-center gap-1'>
          <input
            type='number'
            pattern='[0-9,]*'
            inputMode='decimal'
            placeholder='ej. 420€'
            className='text-center rounded-lg py-1'
            onChange={handleAmount}
            value={transfer.amount}
          />
          <button
            onClick={handleSubmitTransfer}
            className='tracking-wide text-blue-500'
          >
            Transferir
          </button>
        </div>
      )}
    </Article>
  )
}

export default BalanceWidget
