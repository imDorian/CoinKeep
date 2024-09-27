/* eslint-disable react/prop-types */
import './Spendings.css'
import Article from '../Article/Article'
import RangeSpending from '../RangeSpending/RangeSpending'
import { useStore } from '../../stores/useStore'
import { diarySpend, monthSpend } from '../../functions/spends'
import IsBlurSpan from '../IsBlurSpan/IsBlurSpan'

const Spendings = ({ currency }) => {
  const { personal_spend: personalSpend, monthGoal } = useStore()
  const startDate = new Date(monthGoal.startDate)
  const endDate = new Date(monthGoal.endDate)

  const daysOfCicle = (endDate - startDate) / 1000 / 60 / 60 / 24
  const diaryLimitA = monthGoal.monthGoal / daysOfCicle
  // const weekLimitA = diaryLimitA * (semanas * 7)
  const monthLimitA = monthGoal.monthGoal

  const diarySpendA = diarySpend(personalSpend)
  // const weekSpendA = weekSpend(personalSpend)
  const monthSpendA = monthSpend(personalSpend)
  const cicleSpends = (data, start, end) => {
    const filtered = data.filter(f => new Date(f.date) >= new Date(start) && new Date(f.date) <= new Date(end).setDate(endDate.getDate() + 1))
    console.log(filtered)
    return filtered.reduce((total, data) => total + parseFloat(data.quantity), 0).toFixed(2)
  }
  const cicleSpendA = cicleSpends(personalSpend, monthGoal.startDate, monthGoal.endDate)

  const diaryLeftSpend = (diaryLimitA - diarySpendA).toFixed(2)
  // const weekLeftSpend = (weekLimitA - weekSpendA).toFixed(2)
  const monthLeftSpend = (monthGoal.monthGoal - cicleSpendA).toFixed(2)

  return (
    <Article width='100%'>
      {/* <h2>Objetivo</h2> */}
      <section>
        <h3>Has gastado <IsBlurSpan>{diarySpendA}{currency}</IsBlurSpan> hoy</h3>
        <RangeSpending currency='€' completed={diarySpendA} maxCompleted={diaryLimitA} customLabel={diarySpendA} />
        <h3>Te quedan <IsBlurSpan>{diaryLeftSpend}{currency}</IsBlurSpan></h3>
      </section>
      {/* <section>
        <h3>Esta semana has gastado <IsBlurSpan>{weekSpendA}{currency}</IsBlurSpan></h3>
        <RangeSpending currency='€' completed={weekSpendA} maxCompleted={weekLimitA} customLabel={weekSpendA} />
        <h3>Te quedan <IsBlurSpan>{weekLeftSpend}{currency}</IsBlurSpan> para gastar esta semana</h3>
      </section> */}
      -----------------------
      <section>
        <h3>Has gastado <IsBlurSpan>{cicleSpendA}{currency}</IsBlurSpan> en este ciclo</h3>
        <RangeSpending currency='€' completed={cicleSpendA} maxCompleted={monthGoal.monthGoal} customLabel={monthSpendA} />
        <h3>Te quedan <IsBlurSpan>{monthLeftSpend}{currency}</IsBlurSpan></h3>
      </section>
    </Article>
  )
}

export default Spendings
