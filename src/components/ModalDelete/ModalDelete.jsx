/* eslint-disable react/prop-types */
import React, { useContext, useEffect } from 'react'
import './ModalDelete.css'
import { userDataContext } from '../../contexts/ContextProvider'

const ModalDelete = () => {
  const { userData, setUserData, selectedData, isModalDelete, setIsModalDelete } = useContext(userDataContext)
  // selectedData, isModalDelete, setIsModalDelete SE PODRIA DEJAR EN UN CONTEXTO <-----

  const updateData = () => {
    const typeSelectedData = selectedData.type.includes('Ingresos') ? 'income' : selectedData.type.includes('Gasto') ? 'expense' : selectedData.type.includes('Ahorro') ? 'saving' : selectedData.type.includes('Inversion') ? 'investment' : 'personal_spend'
    const filteredData = userData[typeSelectedData].filter(f => f.id !== selectedData.id)
    setUserData({ ...userData, [typeSelectedData]: filteredData })
    setIsModalDelete(false)
  }

  // useEffect(() => {
  //   console.log(selectedData)
  // }, [])

  return (
    isModalDelete &&
      <div className='modal-delete'>
        <span>¿Estás seguro que quieres borrar este registro de {selectedData.type}?</span>
        <article>
          <span>{selectedData.category}</span>
          <span>{selectedData.quantity.toFixed(2)}{selectedData.currency}</span>
          <span>{selectedData.date.toLocaleDateString()}</span>
        </article>
        <div>
          <button className='btn__accept' onClick={() => updateData()}>Aceptar</button>
          <button className='btn__cancel' onClick={() => setIsModalDelete(!isModalDelete)}>Cancelar</button>
        </div>
      </div>
  )
}

export default ModalDelete
