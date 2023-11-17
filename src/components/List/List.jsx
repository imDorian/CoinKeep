/* eslint-disable react/prop-types */
import { userDataContext } from '../../contexts/ContextProvider'
import TrashIcon from '../../icons/TrashIcon'
import './List.css'
import React, { useContext } from 'react'

const List = ({ data, title, types, currency, editSwitch }) => {
  const type = types && types.includes('Ingreso') ? 'income' : types.includes('Gasto') ? 'expense' : types.includes('Ahorro') ? 'saving' : 'investment'
  const filteredData = data && types && data.filter(d => d.type.includes(types))

  const subtotal = filteredData && filteredData.reduce((total, da) => total + parseFloat(da.quantity), 0)
  const { setIsModalDelete, setSelectedData } = useContext(userDataContext)

  const openModal = (e) => {
    setIsModalDelete(true)
    setSelectedData(e)
  }

  return (data && filteredData.length > 0 &&
    <article id={type} className={editSwitch ? 'list__container editing' : 'list__container'}>
      <h3>{title}</h3>
      <section>
        <span id='subtotal'>Total {subtotal.toFixed(2)}{currency}</span>
        {filteredData && filteredData.map(d => {
          const date = new Date(d.date)
          return (
            <div key={d._id}>
              <span id='category'>{d.category}</span>
              <span>{d.quantity.toFixed(2)}{d.currency}</span>
              <span>{date.toLocaleDateString()}</span>
              {editSwitch ? <button onClick={() => openModal(d)}><TrashIcon size='18px' color='red' /></button> : ''}
            </div>
          )
        })}
      </section>
    </article>
  )
}

export default List
