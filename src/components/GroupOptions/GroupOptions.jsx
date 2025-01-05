import React, { useState } from 'react'
import QuitIcon from '../../icons/QuitIcon'
import { useStore } from '../../stores/useStore'
import { useNavigate } from 'react-router-dom'

const GroupOptions = ({ handleGroupSett }) => {
  const { groupDetails, share } = useStore()
  const cookies = JSON.parse(window.localStorage.getItem('userdata'))
  const [loading, setLoading] = useState(false)
  const [newData, setNewData] = useState({
    title: groupDetails.title,
    description: groupDetails.description
  })
  const { groups } = share
  const [isModalDelete, setIsModalDelete] = useState(false)
  const navigate = useNavigate()
  async function deleteGroup () {
    try {
      const url =
        import.meta.env.VITE_URL + `/data/deletegroup/${groupDetails._id}`
      const res = await window.fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if (res.status === 200) {
        useStore.setState({
          share: {
            ...share,
            groups: groups?.filter(g => g._id !== groupDetails._id)
          }
        })
        navigate('/share')
      } else {
        console.error('no se ha podido borrar el grupo')
      }
    } catch (error) {
      console.error(error)
    }
  }

  function handleDeleteGroup () {
    setIsModalDelete(!isModalDelete)
  }

  function handleDataGroup (e) {
    setNewData({
      ...newData,
      [e.target.name]: e.target.value
    })
  }

  async function saveChanges (e) {
    e.preventDefault()
    setLoading(true)
    const url =
      import.meta.env.VITE_URL + `/data/changetitledesc/${groupDetails._id}`
    const res = await window.fetch(url, {
      method: 'PUT',
      body: JSON.stringify(newData),
      headers: {
        'Content-Type': 'application/json'
        // 'Authorization': `Bearer ${cookies.token}`
      }
    })
    console.log(res)
    if (res.status === 200) {
      const json = await res.json()

      useStore.setState({
        groupDetails: {
          ...groupDetails,
          title: json.title,
          description: json.description
        }
      })
    }
    setLoading(false)
  }

  const ModalDelete = () => {
    return (
      <dialog
        open={isModalDelete}
        className='bg-neutral-800 rounded-lg top-[40%] right-0 left-0 z-50 shadow-lg border border-neutral-700'
      >
        <div className='m-2 p-1 flex flex-col gap-4 py-3'>
          <h2>¿Estás seguro de que deseas eliminar este grupo?</h2>
          <div className='flex gap-10 justify-center'>
            <button className='bg-neutral-700' onClick={handleDeleteGroup}>
              Cancelar
            </button>
            <button onClick={deleteGroup} className='text-red-500'>
              Sí, estoy seguro.
            </button>
          </div>
        </div>
      </dialog>
    )
  }

  return (
    <div className='w-[100vw] h-[100vh] bg-neutral-900 fade-in overflow-y-auto py-5'>
      <ModalDelete />
      <button onClick={() => navigate(-1)} className='absolute top-5 right-5'>
        <QuitIcon className='size-6' />
      </button>
      <div className='p-5 py-10 w-full box-border'>
        <h1>Ajustes del grupo</h1>
        <form className='w-full mt-5 flex flex-col gap-3' action=''>
          <label
            htmlFor='group-name'
            className='flex flex-col text-lg text-start gap-1'
          >
            Nombre
            <input
              type='text'
              name='title'
              className='h-9 rounded-lg bg-neutral-800 px-2'
              value={newData.title}
              onChange={handleDataGroup}
              id='group-name'
            />
          </label>
          <label
            htmlFor='group-description'
            className='flex flex-col text-lg text-start gap-1'
          >
            Descripción
            <textarea
              name='description'
              onChange={handleDataGroup}
              type='text'
              className='rounded-lg bg-neutral-800 px-2 h-24 resize-none'
              value={newData.description}
              id='group-description'
              maxLength={150}
              placeholder='Añade una descripción del grupo.'
            />
          </label>
          {/* <h2 className='text-xl font-medium mb-1'>
            Permisos para participantes
          </h2>
          <label
            className='flex flex-row w-full justify-between items-center text-lg'
            htmlFor='check-resolve'
          >
            Los participantes pueden resolver
            <input id='check-resolve' type='checkbox' className='size-5' />
          </label>
          <label
            className='flex flex-row w-full justify-between items-center text-lg'
            htmlFor='check-resolve'
          >
            Cambiar título del grupo
            <input id='check-resolve' type='checkbox' className='size-5' />
          </label> */}
          <button
            className='mt-5 bg-green-700 rounded-lg w-full py-2 box-border disabled:opacity-50'
            type='submit'
            onClick={e => saveChanges(e)}
            disabled={
              (newData.title === groupDetails.title &&
                newData.description === groupDetails.description) ||
              loading
            }
          >
            {loading ? 'Guardando...' : 'Guardar'}
          </button>
        </form>
        <div className='w-full mt-10'>
          <h2 className='text-xl font-medium'>Mas opciones</h2>
          <button
            disabled={cookies.user._id !== groupDetails.boss}
            onClick={handleDeleteGroup}
            className={
              cookies.user._id === groupDetails.boss
                ? 'bg-red-400 w-full box-border mt-2 text-start'
                : 'bg-red-400 w-full box-border mt-2 text-start opacity-50'
            }
          >
            <span className=''>¡Borrar grupo!</span>
            <p className='text-red-100'>
              Se eliminarán todos los datos del grupo de forma permanente.
            </p>
            <span className='text-sm font-normal'>
              (Sólo el jefe puede eliminar el grupo)
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default GroupOptions
