import React, { useEffect } from 'react'
import Container from '../../components/Container/Container'
import Welcome from '../../components/Welcome/Welcome'
import NavBar from '../../components/NavBar/NavBar'
import { useNavigate } from 'react-router-dom'
import { useStore } from '../../stores/useStore'
import GroupIcon from '../../icons/GroupIcon'

const ShareExpenses = () => {
  const navigate = useNavigate()
  const { share, fetchData, balance } = useStore()
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

  useEffect(() => {
    if (!balance._id) {
      try {
        console.log('fetch')
        fetchData(cookies.user.data)
      } catch (error) {
        console.error(error)
        navigate('/')
      }
    }
  }, [])

  return (
    <Container className='flex-col'>
      <Welcome />
      {/* <h1>Compartir Gastos</h1> */}

      <div className='flex flex-col w-full px-5 box-border'>
        <h2 className='text-xl text-start font-medium'>Grupos</h2>
        <ul className='flex flex-col items-center divide-y divide-neutral-700'>
          {share.groups?.length === 0 && (
            <span className='p-8 text-neutral-300'>
              Todavía no estás en ningún grupo, puedes unirte o crear uno.
            </span>
          )}
          {share.groups?.map(group => {
            const { members, title, balances } = group
            return (
              <li
                key={crypto.randomUUID()}
                onClick={() => openShareGroup(group)}
                className='grid grid-cols-[0.5fr_2fr_1fr] py-3 w-full justify-items-center items-center'
              >
                <div className='w-full flex justify-center'>
                  <span className='bg-blue-500 size-10 flex items-center justify-center rounded-full text-xl font-medium'>
                    {title?.slice(0, 1)}
                  </span>
                </div>
                <div className='flex flex-col items-start text-nowrap w-full truncate'>
                  <span>{title}</span>
                  <span className='text-neutral-400 truncate w-full text-start text-sm'>
                    {members?.map(member => member.name).join(', ')}
                  </span>
                </div>
                {/* <div className='flex flex-col items-center w-full'>
                  Te deben
                  <span className='text-green-200 font-medium'>
                    {balance.card + balance.cash}
                    {currency.slice(0, 2)}
                  </span>
                </div> */}
              </li>
            )
          })}
        </ul>
        <div className='mt-10 flex flex-col gap-3 w-full'>
          <span className='text-sm text-neutral-400 flex flex-row justify-center items-center'>
            <GroupIcon className='size-5 p-0 m-0 me-1' />
            Comparte gastos con tus amigos
          </span>
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
