import { useEffect, useState } from 'react'
import Article from '../Article/Article'
import { useStore } from '../../stores/useStore'
import CreditCardIcon from '../../icons/CreditCardIcon'
import CashIcon from '../../icons/CashIcon'
import EditIcon from '../../icons/EditIcon'
import { putMethodSchema } from '../../functions/putMethodSchema'
import IsBlurSpan from '../IsBlurSpan/IsBlurSpan'

const PersonalBalanceWidget = () => {
  const [isEdit, setIsEdit] = useState(false)
  const [inputBalance, setInputBalance] = useState('')
  const [method, setMethod] = useState('card')
  const { balance, balance_personal_spend: personalBalance, currency, available_personal_spend: availablePersonalSpend } = useStore()
  const handleIsEdit = () => {
    setIsEdit(!isEdit)
  }
  const handleMethod = (e) => {
    setMethod(e)
  }
  const updateData = async (id, data, cat) => {
    const { res, json } = await putMethodSchema(id, data, cat)
    console.log(res, json)
  }
  const hanldePersonalBalance = async (e) => {
    try {
      if (e === 'rest' && inputBalance <= personalBalance[method] && inputBalance > 0 && inputBalance !== '') {
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
      if (e === 'sum' && inputBalance <= balance[method] && inputBalance > 0 && inputBalance !== '') {
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
  const handleInput = (e) => {
    const newValue = e.target.value
    if (newValue !== inputBalance) {
      setInputBalance(isNaN(newValue) ? '' : newValue)
    }
  }
  const EditPersonalBalance = () => {
    return (
      <div id='personalBalance' style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <input
          style={{ width: '90%', height: '26px', textAlign: 'center', fontSize: '22px', border: 'none', borderRadius: '6px' }}
          placeholder='420'
          value={inputBalance}
          onChange={handleInput}
          type='number'
          id='inputPersonalBalance'
          name='inputPersonalBalance'
        />
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <button onClick={() => hanldePersonalBalance('rest')}>Restar</button>
          <button onClick={() => hanldePersonalBalance('sum')}>Sumar</button>
        </div>
      </div>
    )
  }
  useEffect(() => {
    updateData(personalBalance._id, personalBalance, 'personal_balance')
  }, [personalBalance])
  return (
    <Article position='relative' width='100%'>
      <button style={{ position: 'absolute', top: '0px', right: '0', background: 'transparent', padding: '6px' }} onClick={handleIsEdit}> <EditIcon size='12px' color='white' /></button>
      <h2>Balance Personal</h2>
      <section style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', gap: '5px' }}>
        <h3>Tarjeta <IsBlurSpan>{(personalBalance.card && personalBalance.card.toFixed(2))}{currency}</IsBlurSpan></h3>
        {isEdit ? <button onClick={() => handleMethod('card')}><CreditCardIcon color={method === 'card' ? 'aquamarine' : 'white'} size='23px' /></button> : ''}
      </section>
      <section style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', gap: '5px' }}>
        <h3>Efectivo <IsBlurSpan>{personalBalance.cash && personalBalance.cash.toFixed(2)}{currency}</IsBlurSpan></h3>
        {isEdit ? <button onClick={() => handleMethod('cash')}><CashIcon color={method === 'cash' ? 'aquamarine' : 'white'} size='23px' /></button> : ''}
      </section>
      {isEdit ? <EditPersonalBalance /> : ''}
    </Article>
  )
}

export default PersonalBalanceWidget
