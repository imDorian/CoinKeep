/* eslint-disable react/prop-types */
import { MagicMotion } from 'react-magic-motion'
import { deletePersonalSpend } from '../../functions/deletes'
import CashIcon from '../../icons/CashIcon'
import CreditCardIcon from '../../icons/CreditCardIcon'
import HeadingIcon from '../../icons/HeadingIcon'
import TrashIcon from '../../icons/TrashIcon'
import { useStore } from '../../stores/useStore'
import './ListDiary.css'
import React, { useState } from 'react'
import IsBlurSpan from '../IsBlurSpan/IsBlurSpan'

const ListDiary = ({ title, types, currency, editSwitch }) => {
  const { personal_spend: personalSpend, isBlur } = useStore()
  const [dateSelected, setDateSelected] = useState(new Date().toDateString())
  // const filteredData = userData.personal_spend.filter(d => isToday(d.date) && d)
  const filteredData = personalSpend && personalSpend.filter(d => {
    const dateString = new Date(d.createdAt).toDateString()
    return dateString === dateSelected
  })

  const changeDateSelected = (e) => {
    const today = new Date().toDateString()
    const newDate = new Date(dateSelected)
    if (e === 'previous') {
      newDate.setDate(newDate.getDate() - 1)
    } else if (e === 'next' && dateSelected !== today) {
      newDate.setDate(newDate.getDate() + 1)
    }
    setDateSelected(newDate.toDateString())
  }

  const subtotal = filteredData && filteredData.reduce((total, da) => total + parseFloat(da.quantity), 0)
  // const { setIsModalDelete } = useContext(userDataContext)
  const type = types.includes('Gasto') ? 'expense' : types.includes('Ahorro') ? 'saving' : 'investment'

  // const openModal = (e) => {
  //   setIsModalDelete(true)
  //   setSelectedData(e)
  // }

  const deleteSpend = async (id) => {
    const filteredPersonalSpend = personalSpend.filter(i => i._id !== id)
    console.log(filteredPersonalSpend)
    useStore.setState({
      personal_spend: filteredPersonalSpend
    })
    setIsModalDelete(false)
    const { response, json } = await deletePersonalSpend(id)
    console.log(response, json)
  }

  const [selectedData, setSelectedData] = useState({})
  const [isModalDelete, setIsModalDelete] = useState(false)

  const openModalDelete = (data) => {
    setSelectedData(data)
    setIsModalDelete(true)
  }
  const ModalDelete = () => {
    return (
      <dialog open id='isModalDeleteOpen'>
        ¿Quiéres borrar seguro?
        <div>
          <button onClick={() => deleteSpend(selectedData._id)}>yes</button>
        </div>
      </dialog>
    )
  }

  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }
  return (
    <div>
      <article id={type} className={editSwitch ? 'list__container-spend editing' : 'list__container-spend'}>
        <h3>{title}</h3>
        <MagicMotion>
          <section>
            <div className='list__container__date'>
              <button onClick={() => changeDateSelected('previous')}><HeadingIcon size='20px' color='white' /></button>
              <span id='date'>{new Date(dateSelected).toLocaleDateString('es-ES', options)}</span>
              <button style={{ rotate: '180deg' }} onClick={() => changeDateSelected('next')}><HeadingIcon size='20px' color='white' /></button>
            </div>
            <span id='spend-today'> <IsBlurSpan>{subtotal.toFixed(2)}{currency}</IsBlurSpan></span>
            <ul style={{ filter: isBlur ? 'blur(4px)' : '', transitionDuration: '300ms' }} id='list__container--ul'>
              {filteredData.length === 0 && <span style={{ textAlign: 'center' }}>Aquí puedes ver tus gastos</span>}
              {filteredData && filteredData.map(d => {
                return (
                  <li key={d._id} className='list__container__list'>
                    <span>{d.establishment}</span>
                    <span>{d.product}</span>
                    <span>{d.quantity.toFixed(2)}{d.currency}</span>
                    <span>{d.method === 'card' ? <CreditCardIcon size='24px' color='white' /> : <CashIcon size='24px' color='white' />}</span>
                    {editSwitch ? <button onClick={() => openModalDelete(d)}><TrashIcon size='20px' color='rgb(255, 60, 60)' /></button> : ''}
                  </li>

                )
              })}
            </ul>
            {isModalDelete && <ModalDelete />}
          </section>
        </MagicMotion>
      </article>
    </div>
  )
}

export default ListDiary
