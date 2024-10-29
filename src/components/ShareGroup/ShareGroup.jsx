import React, { useEffect, useState } from 'react'
import Container from '../Container/Container'
import HeadingIcon from '../../icons/HeadingIcon'
import { useNavigate, useParams } from 'react-router-dom'
import QuitIcon from '../../icons/QuitIcon'
import DotsIcon from '../../icons/DotsIcon'
import AddIcon from '../../icons/AddIcon'
import { CATEGORIAS_GASTOS } from '../../categories/EXPENSES_CATEGORIES'
import { CURRENCIES } from '../../categories/CURRENCIES'
import { useStore } from '../../stores/useStore'

const ShareGroup = () => {
  const [navGroup, setNavGroup] = useState('transactions')
  const [groupSett, setGroupSett] = useState(false)
  const [addTransaction, setAddTransaction] = useState(false)
  const [navAdd, setNavAdd] = useState('expense')
  const [isResolve, setIsResolve] = useState(false)
  const { groupDetails } = useStore()
  const cookies = JSON.parse(window.localStorage.getItem('userdata'))
  const {
    _id: id,
    title,
    balances,
    members,
    currency,
    debts,
    incomes,
    expenses,
    transfers
  } = groupDetails
  const { id: idParams } = useParams()
  const navigate = useNavigate()

  async function getGroup () {
    try {
      const url = import.meta.env.VITE_URL + `/data/getgroup/${idParams}`
      const res = await window.fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if (res.status === 200) {
        const json = await res.json()
        useStore.setState({
          groupDetails: json
        })
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getGroup()
  }, [])
  useEffect(() => {
    console.log(groupDetails)
  }, [groupDetails])
  console.log(groupDetails)
  function back () {
    navigate(-1)
  }

  function handleNavGroup (e) {
    setNavGroup(e.target.name)
  }

  function handleGroupSett () {
    setGroupSett(!groupSett)
  }

  function handleAddTransaction () {
    setAddTransaction(!addTransaction)
  }

  function handleNavAdd (e) {
    setNavAdd(e.target.name)
  }

  function handleResolve () {
    setIsResolve(!isResolve)
  }

  return (
    <Container className='flex-col py-10 gap-4'>
      <dialog
        open={isResolve}
        className='bg-neutral-800 rounded-xl border-neutral-600 border shadow-md shadow-neutral-900'
      >
        <div className='flex flex-col p-5 gap-1'>
          <span>Marcos le va a transferir 35,40€ a Lucian</span>
          <span>¿Estás de acuerdo?</span>
          <div className='mt-3 flex flex-row justify-evenly'>
            <button onClick={handleResolve} className='text-red-400'>
              Cancelar
            </button>
            <button className='bg-emerald-600 text-neutral-200'>Aceptar</button>
          </div>
        </div>
      </dialog>
      <div
        className={
          !addTransaction
            ? 'fixed bottom-10 right-5 transition-all duration-500 h-[3rem] w-[3rem] bg-transparent rounded-3xl z-50 overflow-hidden box-border'
            : 'fixed bottom-10 right-5  transition-all duration-300  h-[75vh] w-[90vw] bg-[#3a3a3a] rounded-3xl z-50 box-border overflow-y-auto overflow-x-hidden'
        }
      >
        <div
          className={
            !addTransaction
              ? 'opacity-0 transition-all duration-300'
              : 'opacity-100  transition-all duration-500 flex flex-col p-5 gap-5'
          }
        >
          <h1>Añadir</h1>
          <ul className='flex flex-row divide-x divide-neutral-400 font-medium text-base w-full justify-between items-center text-center'>
            <li className='w-full'>
              <button
                onClick={handleNavAdd}
                name='expense'
                className={
                  navAdd === 'expense'
                    ? 'p-0 text-emerald-400 w-full px-5 truncate box-border transition-colors duration-300'
                    : 'p-0 text-neutral-300 w-full px-5 truncate box-border transition-colors duration-300'
                }
              >
                Gasto
              </button>
            </li>
            <li className='w-full'>
              <button
                onClick={handleNavAdd}
                name='income'
                className={
                  navAdd === 'income'
                    ? 'p-0 text-emerald-400 w-full px-5 truncate box-border transition-colors duration-300'
                    : 'p-0 text-neutral-300 w-full px-5 truncate box-border transition-colors duration-300'
                }
              >
                Ingreso
              </button>
            </li>
            <li className='w-full truncate'>
              <button
                onClick={handleNavAdd}
                name='transfer'
                className={
                  navAdd === 'transfer'
                    ? 'p-0 text-emerald-400 w-full px-5 truncate box-border transition-colors duration-300'
                    : 'p-0 text-neutral-300 w-full px-5 truncate box-border transition-colors duration-300'
                }
              >
                Transferencia
              </button>
            </li>
          </ul>
          <form action='submit' className='flex flex-col gap-2 w-full'>
            <div className='flex flex-row items-end gap-3'>
              <label
                htmlFor='title-add'
                className='flex flex-col justify-center items-start text-lg'
              >
                Título
                <input
                  id='title-add'
                  type='text'
                  placeholder='Por ejemplo, Restaurante'
                  className='rounded-lg py-1 px-3 bg-neutral-900'
                />
              </label>
              <label
                htmlFor='category-add'
                className='h-full flex items-center justify-center w-10 text-lg text-center'
              >
                {/* Categoría */}
                <select
                  id='category-add'
                  type='text'
                  placeholder='Por ejemplo, Restaurante'
                  className='rounded-lg py-1 px-2 bg-neutral-900 w-full'
                >
                  <option value=''>😀</option>
                  {CATEGORIAS_GASTOS?.map(item => (
                    <option key={crypto.randomUUID()} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div className='flex flex-row gap-3 items-end'>
              <label
                htmlFor='quantity-add'
                className='flex flex-col justify-center items-start text-lg'
              >
                Cantidad
                <input
                  id='quantity-add'
                  type='number'
                  pattern='[0-9,]*'
                  inputMode='decimal'
                  placeholder='Por ejemplo, 33€'
                  className='rounded-lg py-1 px-3 bg-neutral-900'
                />
              </label>
              <label
                htmlFor='currency-add'
                className='h-full flex flex-col text-lg w-10 items-center'
              >
                <select
                  id='currency-add'
                  type='text'
                  placeholder='Por ejemplo, Restaurante'
                  className='rounded-lg py-1 px-3 bg-neutral-900 text-center'
                >
                  {CURRENCIES?.map(item => (
                    <option key={crypto.randomUUID()} value={item}>
                      {item.slice(0, 2)}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div className='w-full flex flex-col'>
              <span className='text-start w-full text-lg'>Modalidad</span>
              <div className='flex flex-row w-fit rounded-lg bg-neutral-900 text-lg'>
                <input
                  name='modality-add'
                  type='radio'
                  value='Card'
                  id='card-add'
                  className='peer/card hidden'
                  checked
                />
                <label
                  className='peer-checked/card:bg-blue-500 py-1 px-3 rounded-lg transition-colors duration-300'
                  htmlFor='card-add'
                >
                  Tarjeta
                </label>
                <input
                  name='modality-add'
                  type='radio'
                  value='Cash'
                  id='cash-add'
                  className='peer/cash hidden'
                />
                <label
                  htmlFor='cash-add'
                  className='peer-checked/cash:bg-blue-500 py-1 px-3 rounded-lg transition-colors duration-300'
                >
                  Efectivo
                </label>
              </div>
            </div>
            <div className='w-full flex fex-row gap-3 items-center'>
              <label
                htmlFor='paid-for-add'
                className='flex flex-col text-lg items-start w-[50%]'
              >
                {navAdd === 'expense' && 'Pagado por'}
                {navAdd === 'income' && 'Recibido por'}
                {navAdd === 'transfer' && 'Desde'}
                <select
                  id='paid-for-add'
                  type='text'
                  placeholder='Por ejemplo, Restaurante'
                  className='rounded-lg py-1 px-3 bg-neutral-900 text-start w-full'
                >
                  <option value=''>Dorian</option>
                  <option value=''>Lucian</option>
                  <option value=''>Marcos</option>
                </select>
              </label>
              <label
                htmlFor='date-add'
                className='flex flex-col text-lg items-start'
              >
                Cuando
                <input
                  id='date-add'
                  type='date'
                  placeholder='Por ejemplo, Restaurante'
                  className='rounded-lg  bg-neutral-900 py-1 h-9 px-3'
                />
              </label>
            </div>
            {navAdd !== 'transfer' && (
              <div className='flex flex-col gap-3'>
                <h2 className='text-start text-lg font-medium'>Dividir</h2>
                <ul className='divide-y divide-neutral-600 bg-neutral-800 rounded-xl px-2 py-1'>
                  <li className='w-full py-2'>
                    <label
                      htmlFor='Dorian'
                      className='grid grid-cols-[0.5fr_2fr_1fr] text-lg items-center justify-items-center'
                    >
                      <input
                        checked
                        id='Dorian'
                        type='checkbox'
                        className='size-5 text-end'
                      />
                      <span className='text-start w-full'>Dorian</span>
                      <span>0,00€</span>
                    </label>
                  </li>
                  <li className='w-full py-2'>
                    <label
                      htmlFor='Lucian'
                      className='grid grid-cols-[0.5fr_2fr_1fr] text-lg items-center justify-items-center'
                    >
                      <input
                        checked
                        id='Lucian'
                        type='checkbox'
                        className='size-5'
                      />
                      <span className='text-start w-full'>Lucian</span>
                      <span>0,00€</span>
                    </label>
                  </li>
                  <li className='w-full py-2'>
                    <label
                      htmlFor='Marcos'
                      className='grid grid-cols-[0.5fr_2fr_1fr] text-lg items-center justify-items-center'
                    >
                      <input
                        checked
                        id='Marcos'
                        type='checkbox'
                        className='size-5'
                      />
                      <span className='text-start w-full'>Marcos</span>
                      <span>0,00€</span>
                    </label>
                  </li>
                </ul>
              </div>
            )}
            {navAdd === 'transfer' && (
              <div className='w-full flex flex-col'>
                <label
                  htmlFor='transfer-to-add'
                  className='flex flex-col items-start justify-start text-lg'
                >
                  Transferir a
                  <select
                    name='transfer-to-add'
                    id='transfer-to-add'
                    className='px-3 py-1 bg-neutral-900 text-start w-full'
                  >
                    <option value='Lucian'>Lucian</option>
                    <option value='Marcos'>Marcos</option>
                  </select>
                </label>
              </div>
            )}
            <button
              type='submit'
              className='w-full py-2 bg-emerald-800 box-border mt-3'
            >
              {navAdd === 'expense' && 'Añadir Gasto'}
              {navAdd === 'income' && 'Añadir Ingreso'}
              {navAdd === 'transfer' && 'Transferir'}
            </button>
          </form>
        </div>

        <button
          className={
            !addTransaction
              ? 'fixed bottom-10 right-5 transition-all duration-300 rounded-full p-0 shadow-lg shadow-neutral-950'
              : 'fixed bottom-10 right-5  transition-all duration-300 rounded-full p-0 shadow-lg shadow-neutral-950'
          }
          onClick={handleAddTransaction}
        >
          <AddIcon
            className={
              !addTransaction
                ? 'size-12 text-[var(--brand-color)] transition-all duration-300 rounded-full'
                : 'size-9 text-red-500 transition-all duration-300 rounded-full rotate-45'
            }
          />
        </button>
      </div>
      <dialog
        open={groupSett}
        className='w-[100vw] h-[100vh] z-50 top-0 left-0 right-0 bottom-0 fixed bg-neutral-900'
      >
        <button onClick={handleGroupSett} className='absolute top-3 right-3'>
          <QuitIcon className='size-6' />
        </button>
        <div className='p-5 py-10 w-full box-border mt-5'>
          <h1>Ajustes del grupo</h1>
          <form className='w-full mt-5' action=''>
            <label
              className='flex flex-row w-full justify-around items-center text-lg'
              htmlFor='check-resolve'
            >
              Los participantes pueden resolver
              <input id='check-resolve' type='checkbox' className='size-5' />
            </label>
            <button
              className='mt-5 bg-green-700 rounded-lg w-full py-2 box-border'
              type='submit'
            >
              Guardar
            </button>
          </form>
          <div className='w-full mt-10'>
            <h2 className='text-xl text-center'>Mas opciones</h2>
            <button className='bg-red-400 w-full box-border mt-2 text-start'>
              <span className=''>¡Borrar grupo!</span>
              <p className='text-red-100'>
                Se eliminarán todos los datos del grupo de forma permanente.
              </p>
            </button>
          </div>
        </div>
      </dialog>
      <button onClick={back} className='absolute top-3 left-3'>
        <HeadingIcon className='size-9' />
      </button>
      <button onClick={handleGroupSett} className='absolute top-4 right-3'>
        <DotsIcon className='size-6' />
      </button>
      <span className='flex flex-col'>
        <h1 className=''>{title}</h1>
        <span>{currency}</span>
      </span>
      <div className='flex flex-col w-full px-5 box-border'>
        <h2 className='text-lg text-start'>Deudas activas</h2>
        <ul className='flex flex-col items-center divide-y divide-neutral-700 max-h-[30vh] overflow-auto'>
          {debts?.length === 0 && (
            <span className='mt-3 text-neutral-300'>
              Todas las deudas están saldadas
            </span>
          )}
          {debts?.map(debt => {
            const { fromUser, toUser, amount, status } = debt
            return (
              status === 'pending' && (
                <li
                  key={crypto.randomUUID()}
                  className='grid grid-cols-[0.5fr_2.5fr_1fr] py-2 w-full justify-items-center items-center'
                >
                  <div className='w-full flex justify-start'>
                    <span className='bg-blue-500 size-10 flex items-center justify-center rounded-full text-xl font-medium'>
                      {fromUser.slice(0, 1).toUpperCase()}
                    </span>
                  </div>
                  <div className='flex flex-col items-start text-nowrap w-full truncate ps-2'>
                    <span>{fromUser}</span>
                    <span className='text-neutral-400 truncate w-full text-start'>
                      Debe <span className='font-medium'>{amount}</span> a{' '}
                      <span className='font-medium'>{toUser}</span>
                    </span>
                  </div>
                  <span className='w-full text-center'>
                    <button onClick={handleResolve} className='bg-slate-600'>
                      Resolver
                    </button>
                  </span>
                </li>
              )
            )
          })}
        </ul>
      </div>
      <div className='w-full p-2 flex box-border'>
        <ul className='flex flex-row justify-around w-full divide-x divide-neutral-400 my-1'>
          <li className='w-full'>
            <button
              name='transactions'
              onClick={handleNavGroup}
              className={
                navGroup === 'transactions'
                  ? 'font-medium w-full p-0 text-emerald-400'
                  : 'w-full p-0'
              }
            >
              Transacciones
            </button>
          </li>
          <li className='w-full'>
            <button
              name='balances'
              onClick={handleNavGroup}
              className={
                navGroup === 'balances'
                  ? 'font-medium w-full p-0 text-emerald-400'
                  : 'w-full p-0'
              }
            >
              Saldos
            </button>
          </li>
        </ul>
      </div>
      {navGroup === 'transactions' && (
        <div className='flex flex-col w-full px-5 box-border'>
          <span className='flex flex-row justify-between items-center'>
            <h2 className='text-lg text-start'>Transacciones</h2>
            <select
              className='w-16 bg-neutral-700 rounded-lg border border-neutral-500 truncate text-center p-0'
              name='sort-group'
              id='sort-group'
            >
              <option value='' className=''>
                Filtrar
              </option>
              <option value='expenses' className=''>
                📉Gastos
              </option>
              <option value='incomes' className=''>
                📈Ingresos
              </option>
              <option value='transfers' className=''>
                🧾 Transferencias
              </option>
            </select>
          </span>
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
      )}
      {navGroup === 'balances' && (
        <div className='flex flex-col w-full px-5 box-border'>
          <h2 className='text-lg text-start'>Saldos</h2>
          <ul className='flex flex-col divide-y divide-neutral-700'>
            {balances?.map(balance => {
              const { user, card, cash } = balance
              const { name, _id: userId } = user
              const total = card + cash
              return (
                <li
                  key={crypto.randomUUID()}
                  className='w-full py-3 grid grid-cols-[0.5fr_2fr_2fr] items-center pe-10 box-border'
                >
                  <span className='text-xl bg-neutral-700 size-10 flex items-center justify-center rounded-full'>
                    {name.slice(0, 1)}
                  </span>
                  <div className='w-full flex flex-col text-start items-start justify-center truncate ps-2'>
                    <span className='w-full font-medium truncate'>
                      {name}
                      {userId === cookies.user._id && ' (tú)'}
                    </span>
                    <span className='text-neutral-400  truncate'>
                      {groupDetails.boss === userId ? 'Jefe' : 'Participante'}
                    </span>
                  </div>
                  <div className='w-full flex flex-col text-end justify-end h-full'>
                    <span className='font-medium text-lg text-neutral-400'>
                      {total}
                      {currency.slice(0, 2)}
                    </span>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </Container>
  )
}

export default ShareGroup
