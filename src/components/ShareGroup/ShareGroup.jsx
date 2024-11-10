import React, { useEffect, useState } from 'react'
import Container from '../Container/Container'
import HeadingIcon from '../../icons/HeadingIcon'
import { useNavigate, useParams } from 'react-router-dom'
import QuitIcon from '../../icons/QuitIcon'
import DotsIcon from '../../icons/DotsIcon'
import { useStore } from '../../stores/useStore'
import { SORT } from '../List/List'
import AddShare from '../AddShare/AddShare'
import ResolveDialog from '../ResolveDialog/ResolveDialog'

const diasSemana = [
  'domingo',
  'lunes',
  'martes',
  'miércoles',
  'jueves',
  'viernes',
  'sábado'
]

const ShareGroup = () => {
  const [navGroup, setNavGroup] = useState('transactions')
  const [isResolve, setIsResolve] = useState(false)
  const { groupDetails } = useStore()
  const cookies = JSON.parse(window.localStorage.getItem('userdata'))
  const [allTypes, setAllTypes] = useState()
  const [filter, setFilter] = useState('')
  const [filterDate, setFilterDate] = useState(SORT.dateUp)
  const [search, setSearch] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const {
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
  const debtsEmpty = debts?.find(debt => debt.status === 'pending')

  useEffect(() => {
    if (filter === 'incomes') {
      if (filterDate === SORT.dateUp) {
        const newIncomes = [...incomes]
        newIncomes.reverse()
        setAllTypes(newIncomes)
      } else if (filterDate === SORT.dateDown) {
        setAllTypes(
          incomes?.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
        )
      }
    } else if (filter === 'expenses') {
      if (filterDate === SORT.dateUp) {
        const newExpenses = [...expenses]
        newExpenses.reverse()
        setAllTypes(newExpenses)
      } else if (filterDate === SORT.dateDown) {
        setAllTypes(expenses)
      }
    } else if (filter === 'transfers') {
      if (filterDate === SORT.dateUp) {
        const newTransfers = [...transfers]
        newTransfers.reverse()
        setAllTypes(newTransfers)
      } else if (filterDate === SORT.dateDown) {
        setAllTypes(transfers)
      }
    } else if (filter === '') {
      if (filterDate === SORT.dateUp) {
        setAllTypes(
          incomes
            ?.concat(expenses)
            ?.concat(transfers)
            ?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        )
      } else if (filterDate === SORT.dateDown) {
        setAllTypes(
          incomes
            ?.concat(expenses)
            ?.concat(transfers)
            .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
        )
      }
    }
  }, [filter, filterDate, incomes, expenses, transfers])

  const filteredData = allTypes?.filter(
    item =>
      item.title?.toLowerCase().includes(search.toLowerCase()) ||
      item.category?.toLowerCase().includes(search.toLowerCase()) ||
      item.fromUser?.username?.toLowerCase().includes(search.toLowerCase()) ||
      item.toUser?.username?.toLowerCase().includes(search.toLowerCase())
  )

  async function getGroup () {
    setIsLoading(true)
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
        setIsLoading(false)
      }
    } catch (error) {
      console.error(error)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getGroup()
  }, [])

  function back () {
    navigate('/share')
  }

  function handleNavGroup (e) {
    setNavGroup(e.target.name)
  }

  function handleGroupSett () {
    navigate(`/groupoptions/${groupDetails._id}`)
  }

  function handleResolve (id, fromUser, toUser, amount, currency) {
    useStore.setState({
      resolveDetails: { id, fromUser, toUser, amount, currency }
    })
    setIsResolve(!isResolve)
  }

  function handleFilter (e) {
    setFilter(e.target.value)
  }

  function handleFilterDate (e) {
    setFilterDate(e.target.value)
  }

  function Loading ({ width, height }) {
    return (
      <div
        className={`transition-opacity duration-300 opacity-100 animate-pulse ${width} rounded-xl bg-neutral-700 ${height} -z-[10]`}
      />
    )
  }

  return (
    <>
      <AddShare isLoading={isLoading} />
      <ResolveDialog
        isResolve={isResolve}
        handleResolve={handleResolve}
        setIsResolve={setIsResolve}
      />
      <Container className='flex-col py-10 gap-2 fade-in'>
        <button onClick={back} className='absolute top-3 left-3'>
          <HeadingIcon className='size-9' />
        </button>
        <button onClick={handleGroupSett} className='absolute top-4 right-3'>
          <DotsIcon className='size-6' />
        </button>
        <span className='flex flex-col h-full w-full items-center fade-in'>
          {isLoading ? (
            <Loading height='h-[7vh]' width='w-36' />
          ) : (
            <>
              <h1 className=''>{title}</h1>
              <span>{currency}</span>
            </>
          )}
        </span>
        <div className='flex flex-col w-full px-5 box-border'>
          <h2 className='text-lg font-medium text-start'>Deudas activas</h2>
          <ul className='flex flex-col items-center justify-center divide-y divide-neutral-700 max-h-[30vh] min-h-[10vh] overflow-auto mt-1 fade-in'>
            {!isLoading && !debtsEmpty ? (
              <span className='mt-3'>Todas las deudas están pagadas</span>
            ) : (
              ''
            )}
            {isLoading ? (
              <Loading height='h-[10vh]' width='w-full' />
            ) : (
              debts?.map(debt => {
                const { fromUser, toUser, amount, status, _id: id } = debt
                const {
                  name: fromUserName,
                  _id: fromUserId,
                  username: fromUserUsername
                } = fromUser
                const {
                  name: toUserName,
                  _id: toUserId,
                  username: toUserUsername
                } = toUser
                // if (debt.status === 'pending') {
                return (
                  status === 'pending' && (
                    <li
                      key={id}
                      className='grid grid-cols-[0.5fr_2.5fr_1fr] py-2 w-full justify-items-center items-center'
                    >
                      <div className='w-full flex justify-start'>
                        <span className='bg-blue-500 size-10 flex items-center justify-center rounded-full text-xl font-medium'>
                          {fromUserName?.slice(0, 1).toUpperCase()}
                        </span>
                      </div>
                      <div className='flex flex-col items-start text-nowrap w-full truncate ps-2'>
                        <span>
                          {fromUserName}
                          <span className='text-xs text-neutral-400'>
                            {fromUserUsername?.slice(-5)}
                          </span>
                        </span>
                        <span className='text-neutral-400 truncate w-full text-start text-sm'>
                          Debe{' '}
                          <span className='font-medium'>
                            {amount}
                            {currency?.slice(0, 2)}
                          </span>{' '}
                          a{' '}
                          <span className='font-medium'>
                            {toUserName}
                            <span className='text-xs'>
                              {toUserUsername?.slice(-5)}
                            </span>
                          </span>
                        </span>
                      </div>
                      <span className='w-full text-center'>
                        <button
                          type='button'
                          onClick={() =>
                            handleResolve(
                              id,
                              fromUser,
                              toUser,
                              amount,
                              currency
                            )
                          }
                          className='bg-slate-600'
                        >
                          Resolver
                        </button>
                      </span>
                    </li>
                  )
                )
              })
            )}
          </ul>
        </div>
        <div className='w-full p-2 flex box-border'>
          <ul className='flex flex-row justify-around w-full divide-x divide-neutral-400'>
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
              <div className='grid grid-cols-[1.5fr_1fr_1fr] w-full gap-2'>
                <input
                  type='search'
                  name=''
                  id=''
                  placeholder='Buscar'
                  className='w-full rounded-lg border-neutral-600 border bg-neutral-800 py-1 p-0 m-0 px-2'
                  onChange={e => setSearch(e.target.value)}
                  value={search}
                />
                <select
                  className=' bg-neutral-800 rounded-lg border border-neutral-600 truncate p-0 py-1 px-1 w-full'
                  name='sort-group'
                  id='sort-group'
                  onChange={handleFilter}
                  value={filter}
                >
                  <option value='' className=''>
                    Tipo
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
                <select
                  className=' bg-neutral-800 rounded-lg border border-neutral-600 truncate p-0 py-1 w-full'
                  name='sort-group'
                  id='sort-group'
                  onChange={handleFilterDate}
                  value={filterDate}
                >
                  <option value={SORT.dateUp}>
                    ↑ Fecha creación, la más reciente primero
                  </option>
                  <option value={SORT.dateDown}>
                    ↓ Fecha creación, la más antigua primero
                  </option>
                </select>
              </div>
            </span>
            <ul className='flex flex-col items-center divide-y divide-neutral-700 mt-3 fade-in'>
              {isLoading ? (
                <Loading width='w-full' height='h-[40vh]' />
              ) : (
                filteredData?.map(transaction => {
                  const {
                    category = null,
                    fromUser = null,
                    toUser = null,
                    type = '',
                    amount,
                    date,
                    divide = [],
                    members = [],
                    title = '',
                    _id: id
                  } = transaction
                  const fecha =
                    diasSemana[new Date(date).getDay()].slice(0, 3) +
                    ' ' +
                    new Date(date).toLocaleDateString('es-Es', {
                      day: 'numeric',
                      month: 'short',
                      year: '2-digit'
                    })
                  return (
                    <li
                      key={id}
                      className='w-full py-3 grid grid-cols-[0.5fr_4fr_2fr] items-center'
                    >
                      <span className='text-xl bg-neutral-700 size-10 flex items-center justify-center rounded-full'>
                        {!category ? '↘️' : category.slice(0, 2)}
                      </span>
                      <div className='w-full flex flex-col text-start items-start justify-between truncate ps-2'>
                        <span className='w-full truncate text-base'>
                          {title || 'Transferencia'}
                        </span>
                        <span className='text-neutral-400 truncate w-full text-sm'>
                          {type === 'income' ? (
                            <>
                              Recibido por{' '}
                              <span className='font-medium'>
                                {fromUser.name}
                                <span className='text-xs'>
                                  {fromUser.username.slice(-5)}
                                </span>
                              </span>
                            </>
                          ) : type === 'expense' ? (
                            <>
                              Pagado por{' '}
                              <span className='font-medium'>
                                {fromUser.name}
                                <span className='text-xs'>
                                  {fromUser.username?.slice(-5)}
                                </span>
                              </span>
                            </>
                          ) : (
                            !type && (
                              <>
                                De{' '}
                                <span className='font-medium'>
                                  {fromUser.name}
                                  <span className='text-xs'>
                                    {fromUser.username.slice(-5)}
                                  </span>
                                </span>{' '}
                                a{' '}
                                <span className='font-medium'>
                                  {toUser.name}
                                  <span className='text-xs'>
                                    {toUser.username.slice(-5)}
                                  </span>
                                </span>
                              </>
                            )
                          )}
                        </span>
                      </div>
                      <div className='w-full flex flex-col text-end justify-between truncate'>
                        <span className='font-medium'>
                          {amount?.toFixed(2)}
                          {currency?.slice(0, 2)}
                        </span>
                        <span className='text-end text-neutral-400 truncate text-sm'>
                          {fecha}
                        </span>
                      </div>
                    </li>
                  )
                })
              )}
            </ul>
          </div>
        )}
        {navGroup === 'balances' && (
          <div className='flex flex-col w-full px-5 box-border'>
            <h2 className='text-lg text-start'>Balances</h2>
            <ul className='flex flex-col divide-y divide-neutral-700'>
              {balances?.map(balance => {
                const { user, card, cash, _id: id } = balance
                const { name, _id: userId } = user
                const total = card + cash
                return (
                  <li
                    key={id}
                    className='w-full py-2 grid grid-cols-[0.5fr_2fr_2fr] items-center pe-10 box-border'
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
    </>
  )
}

export default ShareGroup
