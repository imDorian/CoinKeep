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
    <div className='flex flex-col w-[90%]'>
      <h2 className='text-2xl'>Configuración</h2>
      <form
        action='submit'
        onSubmit={handleOnSubmit}
        className='flex flex-col justify-center items-center my-4 py-3 px-10 bg-[var(--gray-color)] rounded-3xl'
      >
        <label
          className='flex flex-row text-xl gap-5 p-2 w-full py-4 justify-between'
          htmlFor=''
        >
          Moneda
          <select
            className='rounded-md'
            name='currency'
            id='currency'
            value={curren}
            onChange={handleCurrency}
          >
            {CURRENCIES?.map(c => {
              return (
                <option className='text-sm' key={crypto.randomUUID()} value={c}>
                  {c}
                </option>
              )
            })}
          </select>
        </label>
        <label className='flex flex-row text-xl gap-5 p-2 py-4 w-full justify-between'>
          <span className='text-xl text-neutral-200'>Tema claro</span>
          <input type='checkbox' value='' className='sr-only peer' />
          <div className="ms-3 relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600" />
        </label>

        {/* <h3 className='text-lg font-medium'>Notificaciones</h3>
        <label htmlFor=''></label> */}
        <button className='mt-52 border-2 border-green-600 text-green-600'>
          Guardar
        </button>
      </form>
    </div>
  )
}

export default Settings
