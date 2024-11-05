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

// const expenses = [
//   {
//     title: 'Cena en grupo',
//     amount: 100,
//     method: 'card',
//     category: '💰 Food',
//     type: 'expense',
//     group: 'group_id_123',
//     fromUser: 'user_id_1',
//     members: ['user_id_2', 'user_id_3'],
//     divide: [
//       { user: 'user_id_1', amount: 40, settled: true },
//       { user: 'user_id_2', amount: 30, settled: false },
//       { user: 'user_id_3', amount: 30, settled: false }
//     ],
//     date: '2024-10-29T14:00:00Z',
//     createdAt: '2024-10-29T14:00:00Z',
//     updatedAt: '2024-10-29T14:00:00Z',
//     _id: 'uiahsbiucdhcuihdbscixassaxrcdzx'
//   },
//   {
//     title: 'Pago de alquiler',
//     amount: 1200,
//     method: 'cash',
//     category: '💰 Housing',
//     type: 'expense',
//     group: 'group_id_789',
//     fromUser: 'user_id_2',
//     members: ['user_id_3', 'user_id_4'],
//     divide: [
//       { user: 'user_id_2', amount: 400, settled: true },
//       { user: 'user_id_3', amount: 400, settled: false },
//       { user: 'user_id_4', amount: 400, settled: false }
//     ],
//     date: '2024-10-25T10:30:00Z',
//     createdAt: '2024-10-25T10:30:00Z',
//     updatedAt: '2024-10-25T10:30:00Z',
//     _id: 'uiahsbiucdeify74fb9y384xnmkx'
//   },
//   {
//     title: 'Cena en restaurante',
//     amount: 300,
//     method: 'card',
//     category: '💰 Entertainment',
//     type: 'expense',
//     group: 'group_id_456',
//     fromUser: 'user_id_5',
//     members: ['user_id_6', 'user_id_7'],
//     divide: [
//       { user: 'user_id_5', amount: 100, settled: true },
//       { user: 'user_id_6', amount: 100, settled: false },
//       { user: 'user_id_7', amount: 100, settled: false }
//     ],
//     date: '2024-10-27T20:00:00Z',
//     createdAt: '2024-10-27T20:00:00Z',
//     updatedAt: '2024-10-27T20:00:00Z',
//     _id: 'uiah7293784827423823nx9aswedckx'
//   }
// ]
// const incomes = [
//   {
//     title: 'Ingreso por proyecto compartido',
//     amount: 1000,
//     method: 'bank_transfer',
//     category: '💰 Freelance',
//     type: 'income',
//     group: 'group_id_321',
//     fromUser: 'user_id_1',
//     members: ['user_id_2', 'user_id_3'],
//     divide: [
//       { user: 'user_id_1', amount: 400, settled: true },
//       { user: 'user_id_2', amount: 300, settled: false },
//       { user: 'user_id_3', amount: 300, settled: false }
//     ],
//     date: '2024-10-22T15:00:00Z',
//     createdAt: '2024-10-22T15:00:00Z',
//     updatedAt: '2024-10-22T15:00:00Z',
//     _id: 'ui35465743675gdhjchyicbhdiejudkx'
//   },
//   {
//     title: 'Pago de alquiler de inquilino',
//     amount: 800,
//     method: 'bank_transfer',
//     category: '💰 Rental Income',
//     type: 'income',
//     group: 'group_id_321',
//     fromUser: 'user_id_14',
//     members: ['user_id_15'],
//     divide: [{ user: 'user_id_14', amount: 800, settled: true }],
//     date: '2024-10-05T12:00:00Z',
//     createdAt: '2024-10-05T12:00:00Z',
//     updatedAt: '2024-10-05T12:00:00Z',
//     _id: 'ui35486854958489585kskdjcbshhdejudkx'
//   },
//   {
//     title: 'Regalo de cumpleaños de familiares',
//     amount: 200,
//     method: 'cash',
//     category: '💰 Gift',
//     type: 'income',
//     group: 'group_id_456',
//     fromUser: 'user_id_4',
//     members: ['user_id_5', 'user_id_6'],
//     divide: [
//       { user: 'user_id_4', amount: 100, settled: true },
//       { user: 'user_id_5', amount: 50, settled: false },
//       { user: 'user_id_6', amount: 50, settled: false }
//     ],
//     date: '2024-10-20T19:00:00Z',
//     createdAt: '2024-10-20T19:00:00Z',
//     updatedAt: '2024-10-20T19:00:00Z',
//     _id: 'ui354869987788877765554c334gcgx'
//   }
// ]
// const transfers = [
//   {
//     group: 'group_id_123',
//     fromUser: 'user_id_1',
//     toUser: 'user_id_2',
//     amount: 50,
//     date: '2024-10-29T14:00:00Z',
//     note: 'Devolución de gastos compartidos',
//     createdAt: '2024-10-29T14:00:00Z',
//     updatedAt: '2024-10-29T14:00:00Z',
//     _id: 'uiudchbischdihcishcishcuihb74y7peijwpix'
//   },
//   {
//     group: 'group_id_123',
//     fromUser: 'user_id_1',
//     toUser: 'user_id_2',
//     amount: 100,
//     date: '2024-10-29T14:00:00Z',
//     note: 'Reembolso de compra de comestibles',
//     createdAt: '2024-10-29T14:00:00Z',
//     updatedAt: '2024-10-29T14:00:00Z',
//     _id: 'ui663542434368594yxnhfyrndhhsljhs'
//   },
//   {
//     group: 'group_id_456',
//     fromUser: 'user_id_3',
//     toUser: 'user_id_4',
//     amount: 250,
//     date: '2024-10-28T12:00:00Z',
//     note: 'Parte del alquiler del mes',
//     createdAt: '2024-10-28T12:00:00Z',
//     updatedAt: '2024-10-28T12:00:00Z',
//     _id: '834r347bx4ryb0843y0ubx80ry9yr9byx'
//   },
//   {
//     group: 'group_id_789',
//     fromUser: 'user_id_5',
//     toUser: 'user_id_6',
//     amount: 75,
//     date: '2024-10-29T08:30:00Z',
//     note: 'Gastos de transporte durante el viaje',
//     createdAt: '2024-10-29T08:30:00Z',
//     updatedAt: '2024-10-29T08:30:00Z',
//     _id: '8765456787654jhdgyhhdgtdyhsjidkisji'
//   }
// ]
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
  const [groupSett, setGroupSett] = useState(false)
  const [isResolve, setIsResolve] = useState(false)
  const { groupDetails, share } = useStore()
  const { groups } = share
  const cookies = JSON.parse(window.localStorage.getItem('userdata'))
  const [allTypes, setAllTypes] = useState()
  const [filter, setFilter] = useState('')
  const [filterDate, setFilterDate] = useState(SORT.dateUp)
  const [search, setSearch] = useState('')
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
        setAllTypes(
          incomes?.sort((a, b) => new Date(b.date) - new Date(a.date))
        )
      }
      if (filterDate === SORT.dateDown) {
        setAllTypes(
          incomes?.sort((a, b) => new Date(a.date) - new Date(b.date))
        )
      }
    }
    if (filter === 'expenses') {
      if (filterDate === SORT.dateUp) {
        setAllTypes(
          expenses?.sort((a, b) => new Date(b.date) - new Date(a.date))
        )
      }
      if (filterDate === SORT.dateDown) {
        setAllTypes(
          expenses?.sort((a, b) => new Date(a.date) - new Date(b.date))
        )
      }
    }
    if (filter === 'transfers') {
      if (filterDate === SORT.dateUp) {
        setAllTypes(
          transfers?.sort((a, b) => new Date(b.date) - new Date(a.date))
        )
      }
      if (filterDate === SORT.dateDown) {
        setAllTypes(
          transfers?.sort((a, b) => new Date(a.date) - new Date(b.date))
        )
      }
    }
    if (filter === '') {
      if (filterDate === SORT.dateUp) {
        setAllTypes(
          incomes
            ?.concat(expenses)
            ?.concat(transfers)
            ?.sort((a, b) => new Date(b.date) - new Date(a.date))
        )
      }
      if (filterDate === SORT.dateDown) {
        setAllTypes(
          incomes
            ?.concat(expenses)
            ?.concat(transfers)
            .sort((a, b) => new Date(a.date) - new Date(b.date))
        )
      }
    }
  }, [filter, filterDate, incomes, expenses, transfers])

  const filteredData = allTypes
  allTypes?.filter(
    item =>
      item.category?.toLowerCase().includes(search.toLowerCase()) ||
      item.fromUser?.username?.toLowerCase().includes(search.toLowerCase()) ||
      item.toUser?.username?.toLowerCase().includes(search.toLowerCase()) ||
      item.title?.toLowerCase().includes(search.toLowerCase())
  )

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
        console.log(json)
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getGroup()
  }, [])

  function back () {
    navigate(-1)
  }

  function handleNavGroup (e) {
    setNavGroup(e.target.name)
  }

  function handleGroupSett () {
    setGroupSett(!groupSett)
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
        navigate('/compartir')
      } else {
        console.error('no se ha podido borrar el grupo')
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Container className='flex-col py-10 gap-4'>
      <AddShare members={members} currency={currency} />
      <ResolveDialog
        isResolve={isResolve}
        handleResolve={handleResolve}
        setIsResolve={setIsResolve}
      />
      <dialog
        open={groupSett}
        className='w-[100vw] h-[100vh] z-50 top-0 left-0 right-0 bottom-0 fixed bg-neutral-900'
      >
        <button onClick={handleGroupSett} className='absolute top-5 right-3'>
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
      </dialog>
      <button onClick={back} className='absolute top-3 left-3'>
        <HeadingIcon className='size-9' />
      </button>
      <button onClick={handleGroupSett} className='absolute top-4 right-3'>
        <DotsIcon className='size-6' />
      </button>
      <span className='flex flex-col h-full w-full'>
        <h1 className=''>{title}</h1>
        <span>{currency}</span>
      </span>
      <div className='flex flex-col w-full px-5 box-border'>
        <h2 className='text-lg text-start'>Deudas activas</h2>
        <ul className='flex flex-col items-center divide-y divide-neutral-700 max-h-[30vh] min-h-[5vh] overflow-auto'>
          {!debtsEmpty && (
            <span className='mt-3'>Todas las deudas están pagadas</span>
          )}
          {debts?.map(debt => {
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
                    <span className='text-neutral-400 truncate w-full text-start'>
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
                        handleResolve(id, fromUser, toUser, amount, currency)
                      }
                      className='bg-slate-600'
                    >
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
                  ↑ Fecha, la más reciente primero
                </option>
                <option value={SORT.dateDown}>
                  ↓ Fecha, la más antigua primero
                </option>
              </select>
            </div>
          </span>
          <ul className='flex flex-col items-center divide-y divide-neutral-700'>
            {filteredData?.map(transaction => {
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
                    <span className='w-full truncate'>
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
                              {toUser.username.slice(-5)}
                            </span>
                          </>
                        )
                      )}
                    </span>
                  </div>
                  <div className='w-full flex flex-col text-end justify-between truncate'>
                    <span className='font-medium'>
                      {amount}
                      {currency?.slice(0, 2)}
                    </span>
                    <span className='text-end text-neutral-400 truncate'>
                      {fecha}
                    </span>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      )}
      {navGroup === 'balances' && (
        <div className='flex flex-col w-full px-5 box-border'>
          <h2 className='text-lg text-start'>Balances</h2>
          <ul className='flex flex-col divide-y divide-neutral-700'>
            {balances?.map(balance => {
              const { user, card, cash } = balance
              const { name, _id: userId } = user
              const total = card + cash
              return (
                <li
                  key={crypto.randomUUID()}
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
  )
}

export default ShareGroup
