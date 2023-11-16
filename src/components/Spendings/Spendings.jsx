/* eslint-disable react/prop-types */
import './Spendings.css'
import Article from '../Article/Article'
import RangeSpending from '../RangeSpending/RangeSpending'
import { useStore } from '../../stores/useStore'
import { diaryLimit, monthLimit, weekLimit } from '../../functions/limits'
import { diarySpend, weekSpend, monthSpend } from '../../functions/spends'
import IsBlurSpan from '../IsBlurSpan/IsBlurSpan'

const Spendings = ({ currency }) => {
  const { available_personal_spend: availablePersonalSpend, personal_spend: personalSpend } = useStore()

  const diaryLimitA = diaryLimit(availablePersonalSpend.card, availablePersonalSpend.cash, 30)
  const weekLimitA = weekLimit(availablePersonalSpend.card, availablePersonalSpend.cash)
  const monthLimitA = monthLimit(availablePersonalSpend.card, availablePersonalSpend.cash)

  const diarySpendA = diarySpend(personalSpend)
  const weekSpendA = weekSpend(personalSpend)
  const monthSpendA = monthSpend(personalSpend)

  const diaryLeftSpend = (diaryLimitA - diarySpendA).toFixed(2)
  const weekLeftSpend = (weekLimitA - weekSpendA).toFixed(2)
  const monthLeftSpend = (monthLimitA - monthSpendA).toFixed(2)

  return (
    <Article>
      <h2>Gasto Personal</h2>
      <section>
        <h3>Hoy has gastado <IsBlurSpan>{diarySpendA}{currency}</IsBlurSpan></h3>
        <RangeSpending currency='€' completed={diarySpendA} maxCompleted={diaryLimitA} customLabel={diarySpendA} />
        {diaryLeftSpend.includes('-') ? <h3>Debes <IsBlurSpan>{diaryLeftSpend.slice(1)}{currency}</IsBlurSpan> a la banca</h3> : <h3>Te quedan <IsBlurSpan>{diaryLeftSpend}{currency}</IsBlurSpan> para gastar hoy</h3>}
      </section>
      <section>
        <h3>Esta semana has gastado <IsBlurSpan>{weekSpendA}{currency}</IsBlurSpan></h3>
        <RangeSpending currency='€' completed={weekSpendA} maxCompleted={weekLimitA} customLabel={weekSpendA} />
        <h3>Te quedan <IsBlurSpan>{weekLeftSpend}{currency}</IsBlurSpan> para gastar esta semana</h3>
      </section>
      <section>
        <h3>Este mes has gastado <IsBlurSpan>{monthSpendA}{currency}</IsBlurSpan></h3>
        <RangeSpending currency='€' completed={monthSpendA} maxCompleted={monthLimitA} customLabel={monthSpendA} />
        <h3>Te quedan <IsBlurSpan>{monthLeftSpend}{currency}</IsBlurSpan> para gastar este mes</h3>
      </section>
    </Article>
  )
}

export default Spendings
