import React, { useState } from 'react'
import { useStore } from '../../stores/useStore'

const CURRENCIES = ['€', '$']

const Settings = () => {
  const { currency } = useStore()
  const [curren, setCurren] = useState(currency)
  function handleCurrency (e) {
    const newCurrency = e.target.value
    setCurren(newCurrency)
  }
  function handleOnSubmit (e) {
    e.preventDefault()
    useStore.setState({
      currency: curren
    })
  }
  return (
    <div className='flex flex-col w-full opacity-30'>
      <h2 className='text-2xl font-semibold'>Configuración</h2>
      <form
        action='submit'
        onSubmit={handleOnSubmit}
        className='flex flex-col justify-center text-lg items-center my-4 py-3 px-10 rounded-3xl'
      >
        <div className='divide-y divide-neutral-700 w-full'>
          <label
            className='flex flex-row py-3 w-full justify-between'
            htmlFor=''
          >
            Moneda
            <select
              className='rounded-md'
              name='currency'
              id='currency'
              value={curren}
              onChange={handleCurrency}
              disabled
            >
              {CURRENCIES?.map(c => {
                return (
                  <option className='' key={crypto.randomUUID()} value={c}>
                    {c}
                  </option>
                )
              })}
            </select>
          </label>
          <label className='flex flex-row py-3 w-full justify-between'>
            <span className=''>Tema claro</span>
            <input disabled type='checkbox' value='' className='sr-only peer' />
            <div className="ms-3 relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600" />
          </label>
        </div>

        {/* <h3 className='text-lg font-medium'>Notificaciones</h3>
        <label htmlFor=''></label> */}
        <button
          disabled
          className='mt-24 border-2 border-green-300 rounded-xl text-green-300 font-normal'
        >
          Guardar
        </button>
      </form>
    </div>
  )
}

export default Settings
