import { useEffect, useState } from 'react'
import Article from '../Article/Article'
import { useStore } from '../../stores/useStore'
import CreditCardIcon from '../../icons/CreditCardIcon'
import CashIcon from '../../icons/CashIcon'
import EditIcon from '../../icons/EditIcon'
import { putMethodSchema } from '../../functions/putMethodSchema'
import IsBlurSpan from '../IsBlurSpan/IsBlurSpan'
import QuitIcon from '../../icons/QuitIcon'

const PersonalBalanceWidget = () => {
  const [isEdit, setIsEdit] = useState(false)
  const [inputBalance, setInputBalance] = useState('')
  const [method, setMethod] = useState('card')
  const {
    balance,
    balance_personal_spend: personalBalance,
    currency,
    available_personal_spend: availablePersonalSpend,
    focusWidget
  } = useStore()
  const handleIsEdit = () => {
    const WIDGET = 'personalBalance'
    if (!isEdit) {
      setIsEdit(true)
      useStore.setState({ focusWidget: WIDGET })
      console.log(focusWidget)
      return
    }
    if (focusWidget === 'balance') {
      setIsEdit(false)
    }
    setIsEdit(false)
    useStore.setState({ focusWidget: '' })
    console.log(focusWidget)
  }

  function controllerWidgets () {
    if (focusWidget === 'balance') {
      setIsEdit(false)
    }
  }

  useEffect(() => {
    controllerWidgets()
  }, [focusWidget])

  const handleMethod = e => {
    setMethod(e)
  }
  const updateData = async (id, data, cat) => {
    const { res, json } = await putMethodSchema(id, data, cat)
    console.log(res, json)
  }
  const hanldePersonalBalance = async e => {
    try {
      if (
        e === 'rest' &&
        inputBalance <= personalBalance[method] &&
        inputBalance > 0 &&
        inputBalance !== ''
      ) {
        useStore.setState({
          balance_personal_spend: {
            ...personalBalance,
            [method]: personalBalance[method] - parseFloat(inputBalance)
          },
          balance: {
            ...balance,
            [method]: balance[method] + parseFloat(inputBalance)
          },
          available_personal_spend: {
            ...availablePersonalSpend,
            [method]: availablePersonalSpend[method] - parseFloat(inputBalance)
          }
        })
        setInputBalance('')
      }
      if (
        e === 'sum' &&
        inputBalance <= balance[method] &&
        inputBalance > 0 &&
        inputBalance !== ''
      ) {
        useStore.setState({
          balance_personal_spend: {
            ...personalBalance,
            [method]: personalBalance[method] + parseFloat(inputBalance)
          },
          balance: {
            ...balance,
            [method]: balance[method] - parseFloat(inputBalance)
          },
          available_personal_spend: {
            ...availablePersonalSpend,
            [method]: availablePersonalSpend[method] + parseFloat(inputBalance)
          }
        })
        setInputBalance('')
      }
    } catch (error) {
      console.error(error)
    }
  }
  const handleInput = e => {
    const newValue = e.target.value
    if (newValue !== inputBalance) {
      setInputBalance(isNaN(newValue) ? '' : newValue)
    }
  }
  const EditPersonalBalance = () => {
    return (
      <>
        <input
          className='w-[80%] text-center rounded-md h-7'
          placeholder='ej: 420€'
          value={inputBalance}
          onChange={handleInput}
          type='number'
          id='inputPersonalBalance'
          name='inputPersonalBalance'
        />
        <span className='flex w-[80%] justify-between mt-1'>
          <button
            className='tracking-wide bg-red-600 text-basic text-center p-[2px] w-[40%]'
            onClick={() => hanldePersonalBalance('rest')}
          >
            Restar
          </button>
          <button
            className='tracking-wide bg-emerald-600 text-basic text-center p-[2px] w-[40%]'
            onClick={() => hanldePersonalBalance('sum')}
          >
            Sumar
          </button>
        </span>
      </>
    )
  }
  useEffect(() => {
    updateData(personalBalance._id, personalBalance, 'personal_balance')
  }, [personalBalance])
  return (
    <Article
      className={
        !isEdit && focusWidget === 'balance'
          ? 'h-[150px] opacity-70'
          : isEdit
          ? 'h-[200px]'
          : 'h-[200px]'
      }
      position='relative'
      width='100%'
    >
      <button
        style={{ display: focusWidget === 'balance' ? 'none' : 'inline' }}
        className='absolute bottom-4 right-4 opacity-85 text-neutral-800 border-1 bg-neutral-400 border-neutral-400 rounded-full p-0 px-1 text-[12px] tracking-wide font-medium'
        onClick={handleIsEdit}
      >
        {!isEdit ? 'Editar' : 'Cancelar'}
      </button>
      {isEdit && (
        <div className='relative group w-[100%] flex items-center justify-center'>
          <span className='truncate w-[80%] text-lg'>
            Añade o quita del balance personal
          </span>
          <span className='absolute left-0 bottom-0 mt-1 w-auto p-2 bg-gray-800 text-white text-xs rounded shadow-lg hidden group-hover:inline'>
            Añade o quita del balance personal
          </span>
        </div>
      )}
      {isEdit && (
        <section className='grid grid-cols-2 justify-items-center w-[90%]'>
          <label className='flex gap-1 items-center'>
            <button className='px-0' onClick={() => handleMethod('card')}>
              <CreditCardIcon
                className={
                  method === 'card'
                    ? 'text-[var(--brand-color)] w-6 transition-all duration-300'
                    : 'text-neutral-300 w-5 transition-all duration-300'
                }
              />
            </button>
            <IsBlurSpan
              className={
                method === 'card'
                  ? 'text-[var(--brand-color)] transition-all duration-300'
                  : 'text-neutral-300 text-sm transition-all duration-300'
              }
            >
              {personalBalance.cash && personalBalance.card.toFixed(2)}
              {currency}
            </IsBlurSpan>
          </label>
          <label className='flex gap-1 items-center'>
            {isEdit && (
              <button className='p-0' onClick={() => handleMethod('cash')}>
                <CashIcon
                  className={
                    method === 'cash'
                      ? 'text-[var(--brand-color)] w-6 transition-all duration-300'
                      : 'text-neutral-300 w-5 transition-all duration-300'
                  }
                  width='24px'
                />
              </button>
            )}
            <IsBlurSpan
              className={
                method === 'cash'
                  ? 'text-[var(--brand-color)]'
                  : 'text-white text-sm'
              }
            >
              {personalBalance.cash && personalBalance.cash.toFixed(2)}
              {currency}
            </IsBlurSpan>
          </label>
        </section>
      )}

      {!isEdit && (
        <>
          <h2>Balance Personal</h2>
          <h3 className=''>Tarjeta</h3>
          <IsBlurSpan className=''>
            {personalBalance.card && personalBalance.card.toFixed(2)}
            {currency}
          </IsBlurSpan>
          <h3 className=''>Efectivo</h3>
          <IsBlurSpan>
            {personalBalance.cash && personalBalance.cash.toFixed(2)}
            {currency}
          </IsBlurSpan>
        </>
      )}

      {isEdit && <EditPersonalBalance />}
    </Article>
  )
}

export default PersonalBalanceWidget
