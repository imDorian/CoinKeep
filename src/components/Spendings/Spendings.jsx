/* eslint-disable react/prop-types */
import './Spendings.css'
import Article from '../Article/Article'
import RangeSpending from '../RangeSpending/RangeSpending'
import { useStore } from '../../stores/useStore'
import { diarySpend, monthSpend } from '../../functions/spends'
import IsBlurSpan from '../IsBlurSpan/IsBlurSpan'

const Spendings = ({ currency }) => {
  const { personal_spend: personalSpend, monthGoal } = useStore()

  // Si los datos de la meta mensual no están disponibles, evitar errores
  if (!monthGoal || !monthGoal.startDate || !monthGoal.endDate) {
    return <p>Error: Falta información de la meta mensual.</p>
  }

  const startDate = new Date(monthGoal.startDate)
  const endDate = new Date(monthGoal.endDate)

  // Cálculo del ciclo en días
  const daysOfCicle = (endDate - startDate) / 1000 / 60 / 60 / 24
  const diaryLimitA = monthGoal.monthGoal / daysOfCicle
  const monthLimitA = monthGoal.monthGoal

  // Gastos acumulados (diarios y mensuales)
  const diarySpendA = diarySpend(personalSpend)
  const monthSpendA = monthSpend(personalSpend)

  // Filtrar y calcular los gastos del ciclo
  const cicleSpends = (data, start, end) => {
    const filtered = data.filter(f => {
      const spendDate = new Date(f.date)
      return (
        spendDate >= new Date(start) &&
        spendDate <= new Date(end).setDate(endDate.getDate() + 1)
      )
    })
    return filtered
      .reduce((total, item) => total + parseFloat(item.quantity), 0)
      .toFixed(2)
  }
  const cicleSpendA = cicleSpends(
    personalSpend,
    monthGoal.startDate,
    monthGoal.endDate
  )

  // Cálculo de lo que queda por gastar
  const diaryLeftSpend = (diaryLimitA - diarySpendA).toFixed(2)
  const monthLeftSpend = (monthLimitA - cicleSpendA).toFixed(2)

  return (
    <Article width='100%'>
      <section>
        <h3>
          Has gastado{' '}
          <IsBlurSpan>
            {diarySpendA}
            {currency}
          </IsBlurSpan>{' '}
          hoy
        </h3>
        <RangeSpending
          currency={currency}
          completed={parseFloat(diarySpendA)}
          maxCompleted={parseFloat(diaryLimitA)}
          customLabel={diarySpendA}
        />
        <h3>
          Te quedan{' '}
          <IsBlurSpan>
            {diaryLeftSpend}
            {currency}
          </IsBlurSpan>{' '}
          para hoy
        </h3>
      </section>

      <section>
        <h3>
          Has gastado{' '}
          <IsBlurSpan>
            {cicleSpendA}
            {currency}
          </IsBlurSpan>{' '}
          en este ciclo
        </h3>
        <RangeSpending
          currency={currency}
          completed={parseFloat(cicleSpendA)}
          maxCompleted={parseFloat(monthGoal.monthGoal)}
          customLabel={monthSpendA}
        />
        <h3>
          Te quedan{' '}
          <IsBlurSpan>
            {monthLeftSpend}
            {currency}
          </IsBlurSpan>{' '}
          en este ciclo
        </h3>
      </section>
    </Article>
  )
}

export default Spendings
