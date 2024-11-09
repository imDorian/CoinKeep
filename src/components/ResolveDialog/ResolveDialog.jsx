import React, { useState } from 'react'
import { useStore } from '../../stores/useStore'

const ResolveDialog = ({ isResolve, setIsResolve }) => {
  const { resolveDetails, groupDetails } = useStore()
  const { fromUser, toUser, amount, currency, id } = resolveDetails
  const [loading, setLoading] = useState(false)

  async function resolveDebt () {
    setLoading(true)
    try {
      const url =
        import.meta.env.VITE_URL + `/data/resolve/${groupDetails._id}/${id}`
      const response = await window.fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if (response.status === 200) {
        const json = await response.json()
        console.log(json)
        useStore.setState({
          groupDetails: {
            ...groupDetails,
            debts: json.debts,
            transfers: [...groupDetails.transfers, json.transfer]
          }
        })
        setIsResolve(false)
        setLoading(false)
      }
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }
  return (
    <dialog
      open={isResolve}
      className='fixed right-0 left-0 top-0 bottom-0 bg-neutral-800 rounded-xl border-neutral-600 border shadow-md shadow-neutral-900 w-[70%] z-50'
    >
      <div className='flex flex-col p-5 gap-1'>
        <div>
          <span className='font-medium'>{fromUser?.name}</span>
          <span className='text-xs text-neutral-300'>
            {fromUser?.username.slice(-5)}
          </span>{' '}
          le va a transferir{' '}
          <span className='font-medium'>
            {Number(amount)?.toFixed(2)}
            {currency?.slice(0, 2)}{' '}
          </span>
          <br />a <span className='font-medium'>{toUser?.name}</span>
          <span className='text-xs text-neutral-300'>
            {toUser?.username.slice(-5)}
          </span>
        </div>
        <span className=''>¿Estás de acuerdo?</span>
        <div className='mt-3 flex flex-row justify-evenly'>
          <button onClick={() => setIsResolve(false)} className='text-red-400'>
            Cancelar
          </button>
          <button
            onClick={resolveDebt}
            className='bg-emerald-600 text-neutral-200'
            disabled={loading}
          >
            {loading ? 'Cargando...' : 'Aceptar'}
          </button>
        </div>
      </div>
    </dialog>
  )
}

export default ResolveDialog
