import React from 'react'
import Container from '../../components/Container/Container'
import Welcome from '../../components/Welcome/Welcome'
import NavBar from '../../components/NavBar/NavBar'
import { useNavigate } from 'react-router-dom'
import { useStore } from '../../stores/useStore'

const ShareExpenses = () => {
  const navigate = useNavigate()
  const { share } = useStore()
  const cookies = JSON.parse(window.localStorage.getItem('userdata'))

  function openShareGroup (group) {
    const { _id: id, title, balances, members, currency } = group
    useStore.setState({
      groupDetails: {
        _id: id,
        title,
        balances,
        members,
        currency
      }
    })
    navigate(`/sharegroup/${id}`)
  }

  function openCreateGroup () {
    navigate('/creategroup')
  }

  return (
    <Container className='flex-col'>
      <Welcome />
      {/* <h1>Compartir Gastos</h1> */}
      <div className='flex flex-col w-full px-5 box-border'>
        <h2 className='text-lg text-start'>Invitaciones a grupos</h2>
        <ul className='flex flex-col items-center divide-y divide-neutral-700 max-h-[30vh] overflow-auto'>
          <li className='grid grid-cols-[0.5fr_2fr_2.5fr] py-2 w-full justify-items-center items-center'>
            <div className='w-full flex justify-start'>
              <span className='bg-blue-500 size-10 flex items-center justify-center rounded-full text-xl font-medium'>
                G
              </span>
            </div>
            <div className='flex flex-col items-start text-nowrap w-full ps-2'>
              <span>Nombre</span>
              <span className='text-neutral-400'>Creador: Dorian</span>
            </div>
            <div>
              <span className='flex flex-row flex-nowrap text-sm gap-5'>
                <button className='text-red-400'>Rechazar</button>
                <button className='rounded-lg outline-green-300 border-green-300 text-green-300'>
                  Aceptar
                </button>
              </span>
            </div>
          </li>
          <li className='grid grid-cols-[0.5fr_2fr_2.5fr] py-2 w-full justify-items-center items-center'>
            <div className='w-full flex justify-start'>
              <span className='bg-blue-500 size-10 flex items-center justify-center rounded-full text-xl font-medium'>
                G
              </span>
            </div>
            <div className='flex flex-col items-start w-full ps-2'>
              <span>Nombre</span>
              <span className='text-neutral-400'>Creador: Dorian</span>
            </div>
            <div>
              <span className='flex flex-row flex-nowrap text-sm gap-5'>
                <button className='text-red-400'>Rechazar</button>
                <button className='rounded-lg outline-green-300 border-green-300 text-green-300'>
                  Aceptar
                </button>
              </span>
            </div>
          </li>
        </ul>
      </div>

      <div className='flex flex-col w-full px-5 box-border'>
        <h2 className='text-lg text-start'>Grupos</h2>
        <ul className='flex flex-col items-center divide-y divide-neutral-700'>
          {share.groups?.map(group => {
            const { members, title, balances, currency } = group
            const balance = balances?.find(bal => bal.user === cookies.user._id)

            return (
              <li
                key={crypto.randomUUID()}
                onClick={() => openShareGroup(group)}
                className='grid grid-cols-[0.5fr_2fr_1fr] py-2 w-full justify-items-center items-center'
              >
                <div className='w-full flex justify-center'>
                  <span className='bg-blue-500 size-10 flex items-center justify-center rounded-full text-xl font-medium'>
                    {title?.slice(0, 1)}
                  </span>
                </div>
                <div className='flex flex-col items-start text-nowrap w-full truncate'>
                  <span>{title}</span>
                  <span className='text-neutral-400 truncate w-full text-start'>
                    {members?.map(member => member.name).join(', ')}
                  </span>
                </div>
                <div className='flex flex-col items-center w-full'>
                  Te deben
                  <span className='text-green-200 font-medium'>
                    {balance.card + balance.cash}
                    {currency.slice(0, 2)}
                  </span>
                </div>
              </li>
            )
          })}
        </ul>
        <div className='mt-5'>
          <button
            onClick={openCreateGroup}
            className='bg-emerald-600 w-full text-center py-2 px-3 box-border rounded-lg'
          >
            Crear nuevo grupo
          </button>
        </div>
      </div>

      <NavBar />
    </Container>
  )
}

export default ShareExpenses
