import { useEffect, useState } from 'react'
import Article from '../Article/Article'
import { useStore } from '../../stores/useStore'
import CreditCardIcon from '../../icons/CreditCardIcon'
import CashIcon from '../../icons/CashIcon'
import EditIcon from '../../icons/EditIcon'
import { putMethodSchema } from '../../functions/putMethodSchema'
import IsBlurSpan from '../IsBlurSpan/IsBlurSpan'
import QuitIcon from '../../icons/QuitIcon'

export const updateData = async (id, data, cat) => {
  const { res, json } = await putMethodSchema(id, data, cat)

  if (res && res.ok) {
    console.log('Datos actualizados correctamente:', json)
    return json
  } else {
    console.error('Error al actualizar los datos. Respuesta no válida:', res)
  }
}

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
    console.log(e.target.value)
    setInputBalance(e.target.value)
  }
  useEffect(() => {
    if (personalBalance._id) {
      updateData(personalBalance._id, personalBalance, 'personal_balance')
    } else {
      console.error(
        'No se pudo encontrar un ID válido para actualizar el balance.'
      )
    }
  }, [personalBalance])

  return (
    <Article
      className={
        !isEdit && focusWidget === 'balance'
          ? 'h-[150px] opacity-70'
          : isEdit
          ? 'h-[200px]'
          : 'h-[150px]'
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

      <h2 className={!isEdit ? 'text-start' : 'text-center'}>
        Balance Personal
      </h2>
      <div
        className={
          !isEdit
            ? 'flex flex-col'
            : 'grid grid-cols-2 items-center justify-items-center w-full'
        }
      >
        <div
          onClick={() => handleMethod('card')}
          className={`${
            !isEdit
              ? 'items-start'
              : method === 'card'
              ? 'items-center scale-105 rounded-xl w-full shadow-sm shadow-black mb-1 transition-all duration-300 cursor-pointer'
              : 'items-center scale-1 rounded-xl w-full mb-1 transition-all duration-300 cursor-pointer'
          }
          }`}
        >
          <h3 className=''>Tarjeta</h3>
          <IsBlurSpan className=''>
            {personalBalance.card && personalBalance.card.toFixed(2)}
            {currency}
          </IsBlurSpan>
        </div>
        <div
          onClick={() => handleMethod('cash')}
          className={`${
            !isEdit
              ? 'items-start'
              : method === 'cash'
              ? 'items-center scale-105 rounded-xl cursor-pointer w-full shadow-sm shadow-black mb-1 transition-all duration-300'
              : 'items-center  rounded-xl w-full mb-1 transition-all duration-300 cursor-pointer'
          }
          }`}
        >
          <h3 className=''>Efectivo</h3>
          <IsBlurSpan>
            {personalBalance.cash && personalBalance.cash.toFixed(2)}
            {currency}
          </IsBlurSpan>
        </div>
      </div>

      {isEdit && (
        <div className='flex flex-col w-full'>
          <input
            className='w-full text-center rounded-xl h-7'
            placeholder='ej: 420€'
            value={inputBalance}
            onChange={handleInput}
            type='number'
            id='inputPersonalBalance'
            name='inputPersonalBalance'
          />
          <span className='flex w-full justify-around gap-1 m-0 p-0'>
            <button
              className='tracking-wide text-red-700'
              onClick={() => hanldePersonalBalance('rest')}
            >
              Restar
            </button>
            <button
              className='tracking-wide text-[var(--brand-color)]'
              onClick={() => hanldePersonalBalance('sum')}
            >
              Sumar
            </button>
          </span>
        </div>
      )}
    </Article>
  )
}

export default PersonalBalanceWidget
