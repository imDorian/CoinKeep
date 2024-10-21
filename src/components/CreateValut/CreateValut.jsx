import React, { useState, useEffect } from 'react'
import QuitIcon from '../../icons/QuitIcon'
import { useStore } from '../../stores/useStore'
import { CATEGORIAS_AHORROS } from '../../categories/SAVING_CATEGORIES'
import { CATEGORIAS_INVERSION } from '../../categories/INVESTMENT_CATEGORIES'
import HeadingIcon from '../../icons/HeadingIcon'
import { CURRENCIES } from '../../categories/CURRENCIES'
import { addNewValut } from '../../functions/addNewValut'

const CreateValut = () => {
  const cookies = JSON.parse(window.localStorage.getItem('userdata'))
  const { isCreateValut, valut } = useStore()
  const [currentPage, setCurrentPage] = useState(0)
  const [newValut, setNewValut] = useState({
    title: '',
    description: '',
    category: '',
    goal: '',
    currency: '',
    model: 'saving',
    accumulatedData: 0,
    data: []
  })

  function handleTypeValut (e) {
    e.preventDefault()
    setNewValut({
      ...newValut,
      model: e.target.value
    })
  }

  function handleInput (e) {
    if (e.target.type === 'number') {
      if (isNaN(e.target.value)) return
      const num = Number(e.target.value) || ''
      setNewValut({
        ...newValut,
        [e.target.name]: num
      })
    } else {
      setNewValut({
        ...newValut,
        [e.target.name]: e.target.value
      })
    }
  }

  function quitCreateValut () {
    useStore.setState({
      isCreateValut: false
    })
    setCurrentPage(0)
  }

  function handleBackPage () {
    setCurrentPage(currentPage - 1)
  }

  function handleNextPage (e) {
    e.preventDefault()
    setCurrentPage(currentPage + 1)
  }

  async function createValut (e) {
    e.preventDefault()
    try {
      const json = await addNewValut(cookies.user.data, newValut)
      console.log(json)
      useStore.setState({
        valut: [...valut, newValut],
        isCreateValut: false
      })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <dialog
      // ref={refDialog}
      open={isCreateValut}
      className='absolute top-0 w-full h-full bg-neutral-800 z-[99]'
    >
      {(currentPage === 1 || currentPage === 2) && (
        <button onClick={handleBackPage}>
          <HeadingIcon className='absolute top-5 left-10 size-9' />
        </button>
      )}
      <button onClick={quitCreateValut}>
        <QuitIcon className='absolute top-7 right-10 size-5' />
      </button>
      <div className='p-16 flex flex-col items-center justify-center'>
        <h3 className='text-xl text-neutral-300'>
          {currentPage === 0 && 'Primero, elige qué tipo de Valut necesitas'}
          {currentPage === 1 && 'Segundo, dale un nombre y una descripción'}
          {currentPage === 2 &&
            'Tercero, ten un objetivo y elige la moneda principal'}
        </h3>
        <div className='flex flex-row justify-evenly w-[80%] mt-7 text-sm'>
          {currentPage === 0 && (
            <form
              action='submit'
              className='flex flex-col gap-3 items-center w-full'
              onSubmit={handleNextPage}
            >
              <input
                className='hidden'
                name='model'
                id='saving'
                type='radio'
                value='saving'
                checked={newValut.model === 'saving'}
                onChange={handleTypeValut}
                required
              />
              <label
                className={`py-2 w-full rounded-lg bg-neutral-700 border-2 border-transparent text-base ${
                  newValut.model === 'saving' && 'border-neutral-300'
                } `}
                htmlFor='saving'
              >
                💰 Ahorros
              </label>
              <input
                required
                className='hidden'
                name='model'
                id='investment'
                type='radio'
                value='investment'
                checked={newValut.model === 'investment'}
                onChange={handleTypeValut}
              />
              <label
                className={`py-2 w-full rounded-lg bg-neutral-700 border-2 border-transparent text-base ${
                  newValut.model === 'investment' && 'border-neutral-300'
                } `}
                htmlFor='investment'
              >
                📈 Inversión
              </label>

              <button
                className='w-full bg-emerald-800  p-0 py-2 mt-1'
                type='submit'
              >
                Siguiente
              </button>
            </form>
          )}
          {currentPage === 1 && (
            <form
              action='submit'
              onSubmit={handleNextPage}
              className='flex flex-col gap-3 w-full'
            >
              <input
                type='text'
                placeholder='por ejemplo, Universidad'
                className='rounded-lg px-3 py-2 w-full'
                value={newValut.title}
                onChange={handleInput}
                name='title'
                minLength={2}
                required
              />
              <select
                className='rounded-lg py-2 w-full text-center'
                name='category'
                id='category-valut'
                value={newValut.category}
                onChange={handleInput}
                required
              >
                <option value=''>Elige una categoría</option>
                {newValut.model === 'saving' &&
                  CATEGORIAS_AHORROS?.map(item => (
                    <option key={crypto.randomUUID()} value={item}>
                      {item}
                    </option>
                  ))}
                {newValut.model === 'investment' &&
                  CATEGORIAS_INVERSION?.map(item => (
                    <option key={crypto.randomUUID()} value={item}>
                      {item}
                    </option>
                  ))}
              </select>
              <textarea
                className='w-auto h-20 rounded-lg px-3 py-1 resize-none p-0 m-0'
                maxLength={150}
                placeholder='(Opcional) Haz una descripción breve de lo que quieres conseguir con esta valut'
                value={newValut.description}
                onChange={handleInput}
                name='description'
              />
              <button
                type='submit'
                className='w-full text-center p-0 m-0 bg-emerald-800 py-2'
              >
                Siguiente
              </button>
            </form>
          )}
          {currentPage === 2 && (
            <form onSubmit={createValut} className='flex flex-col gap-3 w-full'>
              <select
                name='currency'
                id='currency-valut'
                className='rounded-lg w-full py-2 text-center'
                placeholder='por ejemplo, 4000€'
                value={newValut.currency}
                onChange={handleInput}
                required
              >
                <option value=''>Elige tu moneda</option>
                {CURRENCIES?.map(item => (
                  <option key={crypto.randomUUID()} value={item}>
                    {item}
                  </option>
                ))}
              </select>
              <input
                step='0.01'
                type='number'
                name='goal'
                pattern='[0-9,]*'
                className='w-full rounded-lg py-2 px-3 text-center'
                placeholder='por ejemplo, 4000€'
                value={newValut.goal}
                onChange={handleInput}
                required
              />
              <button className='py-2 px-3 bg-[#5f061f]' type='submit'>
                Crear Valut
              </button>
            </form>
          )}
        </div>
      </div>
    </dialog>
  )
}

export default CreateValut