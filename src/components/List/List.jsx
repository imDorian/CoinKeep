/* eslint-disable react/prop-types */
import { isThisMonth, isThisNoMonth } from '../../functions/timeController'
import TrashIcon from '../../icons/TrashIcon'
import { useStore } from '../../stores/useStore'
import { capitalizeFirstLetter } from '../SpendInput/SpendInput'
import './List.css'

export const thisMonth = new Date().toLocaleDateString('es-ES', { month: 'long' })

const List = ({ data, title, types, currency, editSwitch }) => {
  const options = {
    // weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }
  const type = types && types.includes('Ingresos fijos') ? 'income' : types.includes('Gasto fijo') ? 'expense' : types.includes('Ahorro de emergencia') ? 'saving' : 'investment'
  const filteredData = data.filter(d => d.type === types)
  const thisMonthData = filteredData.filter(d => isThisMonth(new Date(d.date))).sort((a, b) => new Date(b.date) - new Date(a.date))
  const thisNoMonthData = filteredData.filter(d => isThisNoMonth(new Date(d.date))).sort((a, b) => new Date(b.date) - new Date(a.date))
  const thisMonthSum = thisMonthData.reduce((total, d) => total + d.quantity, 0).toFixed(2)
  const thisNoMonthSum = thisNoMonthData.reduce((total, d) => total + d.quantity, 0).toFixed(2)

  const subtotal = filteredData && filteredData.reduce((total, da) => total + parseFloat(da.quantity), 0)

  const openModal = (e) => {
    useStore.setState({
      selectedData: e,
      isModalDelete: true
    })
  }

  return (filteredData.length !== 0 &&
    <article id={type} className={editSwitch ? 'list__container editing' : 'list__container'}>
      <div id='types-of'>
        <h3>{title}</h3>
        <span id='subtotal'>Total {subtotal.toFixed(2)}{currency}</span>
      </div>
      {
        thisMonthData.length > 0 &&
          <details open>
            <summary className='summary'>{capitalizeFirstLetter(thisMonth)} <span>+{thisMonthSum}{currency}</span></summary>
            <section>
              {thisMonthData
                .map(d => {
                  const newD = new Date(d.date).toLocaleDateString('es-ES', options)
                  return (
                    <div key={d._id}>
                      <span id='category'>{d.category}</span>
                      <span>{d.quantity.toFixed(2)}{d.currency}</span>
                      <span>{newD}</span>
                      {editSwitch ? <button onClick={() => openModal(d)}><TrashIcon size='18px' color='red' /></button> : ''}
                    </div>
                  )
                })}
            </section>
          </details>
      }
      {
        thisNoMonthData.length > 0 &&
          <details>
            <summary className='summary'>Resto <span>+{thisNoMonthSum}{currency}</span></summary>
            <section>
              {thisNoMonthData
                .map(d => {
                  const newD = new Date(d.date).toLocaleDateString('es-ES', options)
                  return (
                    <div key={d._id}>
                      <span id='category'>{d.category}</span>
                      <span>{d.quantity.toFixed(2)}{d.currency}</span>
                      <span>{newD}</span>
                      {editSwitch ? <button onClick={() => openModal(d)}><TrashIcon size='18px' color='red' /></button> : ''}
                    </div>
                  )
                })}
            </section>
          </details>
      }

    </article>
  )
}

export default List
