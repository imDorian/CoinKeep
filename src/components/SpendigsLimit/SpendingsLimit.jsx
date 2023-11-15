/* eslint-disable react/prop-types */
import './SpendingsLimit.css'
import Article from '../Article/Article'
import { diaryLimit, monthLimit, weekLimit } from '../../functions/limits'
import { useStore } from '../../stores/useStore'

const SpendingsLimit = ({ currency }) => {
  const { available_personal_spend: availablePersonalSpend } = useStore()

  const diaryLimitA = diaryLimit(availablePersonalSpend.card, availablePersonalSpend.cash, 30)
  const weekLimitA = weekLimit(availablePersonalSpend.card, availablePersonalSpend.cash)
  const monthLimitA = monthLimit(availablePersonalSpend.card, availablePersonalSpend.cash)
  return (
    <Article>
      <h2>Límite de gastos</h2>
      <section>
        <h3>Gasto diario {diaryLimitA}{currency}</h3>
        {/* <span>Gastado {spendToday}{currency} </span> */}
      </section>
      <section>
        <h3>Gasto semanal {weekLimitA}{currency}</h3>
      </section>
      <section>
        <h3>Gasto mensual {monthLimitA}{currency}</h3>
      </section>
    </Article>
  )
}

export default SpendingsLimit
