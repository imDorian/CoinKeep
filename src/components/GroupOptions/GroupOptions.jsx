import React from 'react'
import QuitIcon from '../../icons/QuitIcon'
import { useStore } from '../../stores/useStore'
import { useNavigate } from 'react-router-dom'

const GroupOptions = ({ handleGroupSett }) => {
  const { groupDetails, share } = useStore()
  const { groups } = share
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

  return (
    <div className='w-[100vw] h-[100vh] bg-neutral-900 fade-in overflow-y-auto py-5'>
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
              className='h-9 rounded-lg bg-neutral-800 px-2'
              value={groupDetails.title}
              id='group-name'
            />
          </label>
          <label
            htmlFor='group-description'
            className='flex flex-col text-lg text-start gap-1'
          >
            Descripción
            <textarea
              type='text'
              className='rounded-lg bg-neutral-800 px-2 h-24 resize-none'
              // value={groupDetails.description}
              id='group-description'
              maxLength={150}
              placeholder='Añade una descripción del grupo.'
            />
          </label>
          <h2 className='text-xl font-medium mb-1'>
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
          </label>
          <button
            className='mt-5 bg-green-700 rounded-lg w-full py-2 box-border disabled:opacity-50'
            type='submit'
            disabled
          >
            Guardar
          </button>
        </form>
        <div className='w-full mt-10'>
          <h2 className='text-xl font-medium'>Mas opciones</h2>
          <button
            onClick={deleteGroup}
            className='bg-red-400 w-full box-border mt-2 text-start'
          >
            <span className=''>¡Borrar grupo!</span>
            <p className='text-red-100'>
              Se eliminarán todos los datos del grupo de forma permanente.
            </p>
          </button>
        </div>
      </div>
    </div>
  )
}

export default GroupOptions
