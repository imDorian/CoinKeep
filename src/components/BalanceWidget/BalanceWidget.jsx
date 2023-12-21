import Article from '../Article/Article'
import { useStore } from '../../stores/useStore'

const BalanceWidget = () => {
  const { balance, currency } = useStore()
  //   // INCOME
  //   const incomeCard = income.filter(i => i.method === 'card')
  //   const sumIncomeCard = incomeCard.reduce((total, i) => total + i.quantity, 0).toFixed(2)
  //   const incomeCash = income.filter(i => i.method === 'cash')
  //   const sumIncomeCash = incomeCash.reduce((total, i) => total + i.quantity, 0).toFixed(2)

  //   // EXPENSE
  //   const expenseCard = expense.filter(i => i.method === 'card')
  //   const sumExpenseCard = expenseCard.reduce((total, i) => total + i.quantity, 0).toFixed(2)
  //   const expenseCash = expense.filter(i => i.method === 'cash')
  //   const sumExpenseCash = expenseCash.reduce((total, i) => total + i.quantity, 0).toFixed(2)
  //   // SAVING
  //   const savingCard = saving.filter(i => i.method === 'card')
  //   const sumSavingCard = savingCard.reduce((total, i) => total + i.quantity, 0).toFixed(2)
  //   const savingCash = saving.filter(i => i.method === 'cash')
  //   const sumSavingCash = savingCash.reduce((total, i) => total + i.quantity, 0).toFixed(2)

  //   // INVESTMENT
  //   const investmentCard = investment.filter(i => i.method === 'card')
  //   const sumInvestmentCard = investmentCard.reduce((total, i) => total + i.quantity, 0).toFixed(2)
  //   const investmentCash = investment.filter(i => i.method === 'cash')
  //   const sumInvestmentCash = investmentCash.reduce((total, i) => total + i.quantity, 0).toFixed(2)

  //   // AVAILABLE PERSONAL SPEND
  //   const { card, cash } = personalBalance

  //   // BALANCE
  //   const refreshBalanceCard = (sumIncomeCard - sumExpenseCard - sumSavingCard - sumInvestmentCard).toFixed(2)
  //   const refreshBalanceCash = (sumIncomeCash - sumExpenseCash - sumSavingCash - sumInvestmentCash).toFixed(2)

  //   // ALL BALANCE

  //   useEffect(() => {
  //     useStore.setState({
  //       balance: {
  //         card: parseFloat(refreshBalanceCard),
  //         cash: parseFloat(refreshBalanceCash)
  //       }
  //     })
  //   }, [income, expense, saving, investment])
  return (
    <Article width='100%'>
      <h2>Balance</h2>
      <section>
        <h3>Tarjeta {balance.card}{currency}</h3>
      </section>
      <section>
        <h3>Efectivo {balance.cash}{currency}</h3>
      </section>
    </Article>
  )
}

export default BalanceWidget
