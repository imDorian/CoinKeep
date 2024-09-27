/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import './ModalDelete.css'
import { useStore } from '../../stores/useStore'
import { deleteFinancial, deletePersonalSpend } from '../../functions/deletes'

const ModalDelete = () => {
  const { isModalDelete, selectedData, balance_personal_spend: personalBalance, selectedPage, balance, income, expense, saving, investment } = useStore()
  const [loading, setLoading] = useState(false)
  const PAGES = {
    home: 'home',
    financial: 'financial'
  }

  const deleteSpend = async (id) => {
    setLoading(true)
    if (selectedPage === PAGES.home) {
      try {
        const filtered = [selectedData.category].filter(i => i._id !== id)
        const { response, json } = await deletePersonalSpend(id)
        const newPersonalSpend = { ...personalBalance, [selectedData.method]: personalBalance[selectedData.method] + selectedData.quantity }
        console.log(newPersonalSpend)
        if (response.status === 200) {
          useStore.setState({
            [selectedData.category]: filtered,
            balance_personal_spend: newPersonalSpend
          })
        }
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
        useStore.setState({ isModalDelete: false })
      }
    }
    if (selectedPage === PAGES.financial) {
      try {
        if (selectedData.model === 'income') {
          const { response, json } = await deleteFinancial(id, 'income')
          console.log(json)
          const filtered = income.filter(f => f._id !== id)
          console.log(filtered)
          const newBalance = {
            ...balance,
            [selectedData.method]: balance[selectedData.method] - selectedData.quantity
          }
          if (response.status === 200) {
            useStore.setState({
              balance: newBalance,
              [selectedData.model]: filtered
            })
          }
        }
        if (selectedData.model !== 'income') {
          const { response, json } = await deleteFinancial(id, selectedData.model)
          console.log(json)
          const returnModel = () => {
            if (selectedData.model === 'expense') {
              return expense
            }
            if (selectedData.model === 'saving') {
              return saving
            }
            if (selectedData.mode === 'investment') {
              return investment
            }
          }
          const modelReturn = returnModel()
          const filtered = modelReturn.filter(f => f._id !== id)
          console.log(filtered)
          const newBalance = {
            ...balance,
            [selectedData.method]: balance[selectedData.method] + selectedData.quantity
          }
          if (response.status === 200) {
            useStore.setState({
              balance: newBalance,
              [selectedData.model]: filtered
            })
          }
        }
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
        useStore.setState({ isModalDelete: false })
      }
    }
  }
  const closeModal = () => {
    useStore.setState({ isModalDelete: false })
  }

  return (
    isModalDelete &&
      <dialog open id='isModalDeleteOpen'>
        <span className='delete--question'>¿Estás seguro que quieres borrar este gasto?</span>
        <div className='delete--grid'>
          <span className='grid-1'>{selectedData.category}</span>
          <span className='grid-2'>{selectedData.type}</span>
          <span className='grid-3'>{selectedData.quantity}{selectedData.currency}</span>
          <span className='grid-4'>{selectedData.method}</span>
          <span className='grid-5'>{new Date(selectedData.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
        </div>
        <div>
          <button id='cancel' onClick={() => closeModal()}>Cancelar</button>
          <button id='accept' onClick={() => deleteSpend(selectedData._id)}>{loading ? 'Cargando...' : 'Sí, estoy seguro.'}</button>
        </div>
      </dialog>
  )
}

export default ModalDelete
