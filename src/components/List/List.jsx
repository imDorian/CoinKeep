/* eslint-disable react/prop-types */
import TrashIcon from '../../icons/TrashIcon'
import { useStore } from '../../stores/useStore'
import { capitalizeFirstLetter } from '../SpendInput/SpendInput'
import './List.css'
import CreditCardIcon from '../../icons/CreditCardIcon'
import CashIcon from '../../icons/CashIcon'

export const thisMonth = new Date().toLocaleDateString('es-ES', {
  month: 'long'
})

const List = ({ data, title, types, currency, editSwitch }) => {
  const options = {
    // weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }
  const months = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre'
  ].reverse()
  const type =
    types && types.includes('Ingresos fijos')
      ? 'income'
      : types.includes('Gasto fijo')
      ? 'expense'
      : types.includes('Ahorro de emergencia')
      ? 'saving'
      : 'investment'
  const filteredData = data
    .filter(d => d.type === types)
    .sort((a, b) => new Date(b.date) - new Date(a.date))
  const subtotal =
    filteredData &&
    filteredData.reduce((total, da) => total + parseFloat(da.quantity), 0)

  const openModal = e => {
    useStore.setState({
      selectedData: e,
      isModalDelete: true
    })
  }

  return (
    filteredData.length !== 0 && (
      <article
        id={type}
        className={editSwitch ? 'list__container editing' : 'list__container'}
      >
        <div id='types-of'>
          <h3>{title}</h3>
          <span id='subtotal'>
            Total {subtotal.toFixed(2)}
            {currency}
          </span>
        </div>
        {months.map(month => {
          const datosFiltradosPorMes = filteredData.filter(d => {
            const nuevoMes = capitalizeFirstLetter(
              new Date(d.date).toLocaleDateString('es-Es', { month: 'long' })
            )
            return month === nuevoMes
          })

          if (datosFiltradosPorMes.length > 0) {
            const thisMonthSum = datosFiltradosPorMes
              .reduce((total, d) => total + d.quantity, 0)
              .toFixed(2)
            return (
              <details key={month} style={{ width: '100%' }}>
                <summary key={month} className='summary'>
                  {month} {thisMonthSum}
                  {currency}
                </summary>
                <section>
                  {datosFiltradosPorMes.map(d => {
                    return (
                      <div key={d._id}>
                        <span className='category'>{d.category}</span>
                        <span>
                          {d.quantity.toFixed(2)}
                          {d.currency}
                        </span>
                        <span className='method'>
                          {d.method === 'card' ? (
                            <CreditCardIcon color='aliceblue' size='26px' />
                          ) : (
                            <CashIcon color='aliceblue' size='26px' />
                          )}
                        </span>
                        <span>
                          {new Date(d.date).toLocaleDateString(
                            'es-Es',
                            options
                          )}
                        </span>
                        {editSwitch ? (
                          <button onClick={() => openModal(d)}>
                            <TrashIcon size='18px' color='red' />
                          </button>
                        ) : (
                          ''
                        )}
                      </div>
                    )
                  })}
                </section>
              </details>
            )
          } else {
            return null // Excluir meses sin datos
          }
        })}
      </article>
    )
  )
}

export default List
