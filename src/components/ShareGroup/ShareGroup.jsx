import React from 'react'
import Container from '../Container/Container'
import HeadingIcon from '../../icons/HeadingIcon'
import { useNavigate } from 'react-router-dom'
import CreditCardIcon from '../../icons/CreditCardIcon'

const ShareGroup = () => {
  const navigate = useNavigate()
  function back () {
    navigate(-1)
  }
  return (
    <Container className='flex-col py-10'>
      <button onClick={back} className='absolute top-3 left-3'>
        <HeadingIcon className='size-8' />
      </button>
      <span className='flex flex-col'>
        <h1 className=''>Nombre grupo</h1>
        <span>📈Categoría</span>
      </span>
      <div className='flex flex-col w-full px-5 box-border'>
        <h2 className='text-lg text-start'>Deudas activas</h2>
        <ul className='flex flex-col items-center divide-y divide-neutral-700 max-h-[30vh] overflow-auto'>
          <li className='grid grid-cols-[0.5fr_2.5fr_1fr] py-2 w-full justify-items-center items-center'>
            <div className='w-full flex justify-start'>
              <span className='bg-blue-500 size-10 flex items-center justify-center rounded-full text-xl font-medium'>
                M
              </span>
            </div>
            <div className='flex flex-col items-start text-nowrap w-full truncate ps-2'>
              <span>Marcos</span>
              <span className='text-neutral-400 truncate w-full text-start'>
                Debe <span className='font-medium'>35,40€</span> a{' '}
                <span className='font-medium'>Lucian</span>
              </span>
            </div>
            <span className='w-full text-center'>
              <button className='bg-slate-600'>Resolver</button>
            </span>
          </li>
          <li className='grid grid-cols-[0.5fr_2.5fr_1fr] py-2 w-full justify-items-center items-center'>
            <div className='w-full flex justify-start'>
              <span className='bg-blue-500 size-10 flex items-center justify-center rounded-full text-xl font-medium'>
                M
              </span>
            </div>
            <div className='flex flex-col items-start text-nowrap w-full truncate ps-2'>
              <span>Marcos</span>
              <span className='text-neutral-400 truncate w-full text-start'>
                Debe <span className='font-medium'>35,40€</span> a{' '}
                <span className='font-medium'>Lucian</span>
              </span>
            </div>
            <span className='w-full text-center'>
              <button className='bg-slate-600'>Resolver</button>
            </span>
          </li>
        </ul>
      </div>
      <div className='flex flex-col w-full px-5 box-border'>
        <h2 className='text-lg text-start'>Gastos del grupo</h2>
        <ul className='flex flex-col items-center divide-y divide-neutral-700 max-h-[30vh] overflow-auto'>
          <li className='w-full py-3 grid grid-cols-[0.5fr_2fr_2fr] items-center'>
            <span className='text-xl bg-neutral-700 size-10 flex items-center justify-center rounded-full'>
              📚
            </span>
            <div className='w-[90%] flex flex-col text-start items-start justify-between truncate ps-2'>
              <span className='w-full truncate'>Título</span>
              <span className='text-neutral-400  truncate'>
                Pagado por <span className='font-medium'>Lucian</span>
              </span>
            </div>
            <div className='w-full flex flex-col text-end justify-between truncate'>
              <span className='font-medium'>30€</span>
              <span className='text-end text-neutral-400 truncate'>
                Mier, 2 ene 2025
              </span>
            </div>
          </li>
          <li className='w-full py-3 grid grid-cols-[0.5fr_2fr_2fr] items-center'>
            <span className='text-xl bg-neutral-700 size-10 flex items-center justify-center rounded-full'>
              📚
            </span>
            <div className='w-[90%] flex flex-col text-start items-start justify-between truncate ps-2'>
              <span className='w-full truncate'>Título</span>
              <span className='text-neutral-400  truncate'>
                Pagado por <span className='font-medium'>Lucian</span>
              </span>
            </div>
            <div className='w-full flex flex-col text-end justify-between truncate'>
              <span className='font-medium'>30€</span>
              <span className='text-end text-neutral-400 truncate'>
                Mier, 2 ene 2025
              </span>
            </div>
          </li>
          <li className='w-full py-3 grid grid-cols-[0.5fr_2fr_2fr] items-center'>
            <span className='text-xl bg-neutral-700 size-10 flex items-center justify-center rounded-full'>
              📚
            </span>
            <div className='w-[90%] flex flex-col text-start items-start justify-between truncate ps-2'>
              <span className='w-full truncate'>Título</span>
              <span className='text-neutral-400  truncate'>
                Pagado por <span className='font-medium'>Lucian</span>
              </span>
            </div>
            <div className='w-full flex flex-col text-end justify-between truncate'>
              <span className='font-medium'>30€</span>
              <span className='text-end text-neutral-400 truncate'>
                Mier, 2 ene 2025
              </span>
            </div>
          </li>
        </ul>
      </div>
    </Container>
  )
}

export default ShareGroup
