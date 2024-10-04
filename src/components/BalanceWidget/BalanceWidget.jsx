import Article from '../Article/Article'
import { useStore } from '../../stores/useStore'
import IsBlurSpan from '../IsBlurSpan/IsBlurSpan'
import { useEffect, useState } from 'react'
import SwitchIcon from '../../icons/SwitchIcon'
import EditIcon from '../../icons/EditIcon'
import QuitIcon from '../../icons/QuitIcon'
import { updateData } from '../PersonalBalanceWidget/PersonalBalanceWidget'

const BalanceWidget = () => {
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
    setTransfer({ ...transfer, amount: e.target.value })
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
      if (transfer.from === method.card && amount <= balance.card) {
        useStore.setState({
          balance: {
            ...balance,
            card: balance.card - amount,
            cash: balance.cash + amount
          }
        })
      } else if (transfer.from === method.cash && amount <= balance.cash) {
        useStore.setState({
          balance: {
            ...balance,
            card: balance.card + amount,
            cash: balance.cash - amount
          }
        })
      } else {
        console.log('Saldo insuficiente')
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
      updateData(balance._id, balance, 'balance')
      console.log(balance)
    } else {
      console.log('error', balance)
    }
  }, [balance])

  return (
    <Article
      className={
        !isEdit && focusWidget === 'personalBalance'
          ? 'h-[150px] opacity-70'
          : isEdit
          ? 'h-[200px] '
          : 'h-[150px]'
      }
      width='100%'
    >
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
            ? ' flex flex-col'
            : 'grid grid-cols-3 items-center justify-items-center w-full'
        }
      >
        <div className={!isEdit ? 'items-start' : 'items-center'}>
          <h3 className=''>
            {transfer.from === method.card ? 'Tarjeta' : 'Efectivo'}
          </h3>
          <IsBlurSpan
            className={Number(balance.card) < 0 ? 'text-red-600' : ''}
          >
            {transfer.from === method.card && balance
              ? Number(balance.card).toFixed(2)
              : Number(balance.cash).toFixed(2)}
            {currency}
          </IsBlurSpan>
        </div>
        {isEdit && (
          <button onClick={handleTransfer}>
            <SwitchIcon className='size-6 text-[var(--brand-color)]' />
          </button>
        )}
        <div className={!isEdit ? 'items-start' : 'items-center'}>
          <h3 className=''>
            {transfer.to === method.card ? 'Tarjeta' : 'Efectivo'}
          </h3>
          <IsBlurSpan
            className={Number(balance.cash) < 0 ? 'text-red-600' : ''}
          >
            {transfer.to === 'card' && balance
              ? Number(balance.card).toFixed(2)
              : Number(balance.cash).toFixed(2)}
            {currency}
          </IsBlurSpan>
        </div>
      </div>
      {isEdit && (
        <div className='w-full flex flex-col items-center'>
          <input
            type='number'
            placeholder='ej. 420€'
            className='text-center rounded-xl h-7 w-full'
            onChange={handleAmount}
          />
          <button
            onClick={handleSubmitTransfer}
            className='tracking-wide text-[var(--brand-color)]'
          >
            Transferir
          </button>
        </div>
      )}
    </Article>
  )
}

export default BalanceWidget
