/* eslint-disable react/prop-types */
import { useEffect } from 'react'
import { useStore } from '../../stores/useStore'
import Article from '../Article/Article'

const Balance = ({ currency }) => {
  const { income, expense, saving, investment, available_personal_spend: availablePersonalSpend } = useStore()
  // INCOME
  const incomeCard = income.filter(i => i.method === 'card')
  const sumIncomeCard = incomeCard.reduce((total, i) => total + i.quantity, 0).toFixed(2)
  const incomeCash = income.filter(i => i.method === 'cash')
  const sumIncomeCash = incomeCash.reduce((total, i) => total + i.quantity, 0).toFixed(2)

  // EXPENSE
  const expenseCard = expense.filter(i => i.method === 'card')
  const sumExpenseCard = expenseCard.reduce((total, i) => total + i.quantity, 0).toFixed(2)
  const expenseCash = expense.filter(i => i.method === 'cash')
  const sumExpenseCash = expenseCash.reduce((total, i) => total + i.quantity, 0).toFixed(2)
  // SAVING
  const savingCard = saving.filter(i => i.method === 'card')
  const sumSavingCard = savingCard.reduce((total, i) => total + i.quantity, 0).toFixed(2)
  const savingCash = saving.filter(i => i.method === 'cash')
  const sumSavingCash = savingCash.reduce((total, i) => total + i.quantity, 0).toFixed(2)

  // INVESTMENT
  const investmentCard = investment.filter(i => i.method === 'card')
  const sumInvestmentCard = investmentCard.reduce((total, i) => total + i.quantity, 0).toFixed(2)
  const investmentCash = investment.filter(i => i.method === 'cash')
  const sumInvestmentCash = investmentCash.reduce((total, i) => total + i.quantity, 0).toFixed(2)

  // AVAILABLE PERSONAL SPEND
  const { card, cash } = availablePersonalSpend

  // BALANCE
  const refreshBalanceCard = (sumIncomeCard - sumExpenseCard - sumSavingCard - sumInvestmentCard - card).toFixed(2)
  const refreshBalanceCash = (sumIncomeCash - sumExpenseCash - sumSavingCash - sumInvestmentCash - cash).toFixed(2)

  // ALL BALANCE

  useEffect(() => {
    useStore.setState({
      balance: {
        card: parseFloat(refreshBalanceCard),
        cash: parseFloat(refreshBalanceCash)
      }
    })
  }, [income, expense, saving, investment, availablePersonalSpend])
  return (
    <Article>
      <h3>Balance</h3>
      <section>
        <span style={{ paddingInline: '5px' }}>Tarjeta: {refreshBalanceCard}{currency}</span>
      </section>
      <section>
        <span style={{ paddingInline: '5px' }}>Efectivo: {refreshBalanceCash}{currency}</span>
      </section>
    </Article>
  )
}

export default Balance
