import React from 'react'
import { useStore } from '../../stores/useStore'

const ResolveDialog = ({ isResolve, handleResolve, setIsResolve }) => {
  const { resolveDetails, groupDetails } = useStore()
  const { fromUser, toUser, amount, currency, id } = resolveDetails

  async function resolveDebt () {
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
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <dialog
      open={isResolve}
      className='bg-neutral-800 rounded-xl border-neutral-600 border shadow-md shadow-neutral-900 w-[70%]'
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
          >
            Aceptar
          </button>
        </div>
      </div>
    </dialog>
  )
}

export default ResolveDialog
