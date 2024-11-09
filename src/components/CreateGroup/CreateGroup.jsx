import React, { useEffect, useState } from 'react'
import QuitIcon from '../../icons/QuitIcon'
import HeadingIcon from '../../icons/HeadingIcon'
import { useNavigate } from 'react-router-dom'
import { CURRENCIES } from '../../categories/CURRENCIES'
import { useStore } from '../../stores/useStore'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import SearchIcon from '../../icons/SearchIcon'
import { Suspense } from 'react'

const CreateGroup = () => {
  const { share } = useStore()
  const [currentPage, setCurrentPage] = useState(0)
  const cookies = JSON.parse(window.localStorage.getItem('userdata'))
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    boss: cookies.user._id,
    currency: CURRENCIES[0],
    members: [
      {
        name: cookies.user.name,
        username: cookies.user.username,
        id: cookies.user._id,
        image: cookies.user.image
      }
    ]
  })
  const [search, setSearch] = useState('')
  const [members, setMembers] = useState([])
  const navigate = useNavigate()

  function handleForm (e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }
  function handleSearch (e) {
    setSearch(e.target.value)
  }

  useEffect(() => {
    console.log(formData)
  }, [formData])

  async function getSearchUsers () {
    if (search) {
      const url =
        import.meta.env.VITE_URL +
        `/data/getsearchusers/${search}/${cookies.user._id}`
      const res = await window.fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if (res.status === 200) {
        const data = await res.json()
        setMembers(data)
      } else {
        console.log('error al encontrar el usuario')
      }
    }
  }

  function handleChecked (e, name, username, image, id) {
    if (e.target.checked) {
      const newMember = {
        name,
        username,
        id,
        image
      }

      setFormData({
        ...formData,
        members: [...formData.members, newMember]
      })
    } else {
      setFormData({
        ...formData,
        members: formData.members.filter(member => member.id !== id)
      })
    }
  }

  function nextPage (e) {
    e.preventDefault()
    if (currentPage === 0) {
      if (formData.title) {
        setCurrentPage(currentPage + 1)
      }
    }
    if (currentPage === 1) {
      if (formData.currency) {
        setCurrentPage(currentPage + 1)
      }
    }
    if (currentPage === 2) {
      if (formData.members.length > 1) {
        setCurrentPage(currentPage + 1)
      }
    }
  }
  function quitCreateGroup () {
    navigate(-1)
  }
  function back () {
    setCurrentPage(currentPage - 1)
  }
  async function createGroup (e) {
    e.preventDefault()
    try {
      setLoading(true)
      const url = import.meta.env.VITE_URL + '/data/creategroup'
      const res = await window.fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      if (res.status === 200) {
        const json = await res.json()
        console.log(json)
        useStore.setState({
          share: {
            ...share,
            groups: [...share.groups, json]
          }
        })
        navigate(`/group/${json._id}`)
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className='p-14 fade-in'>
      {currentPage === 0 && (
        <div className='w-full flex flex-col items-center mt-5'>
          <h2 className='text-xl'>
            Primero, dale un <b>nombre</b> a tu grupo.
          </h2>
          <DotLottieReact
            className='size-52'
            loop
            autoplay='true'
            renderConfig={{ autoResize: 'true' }}
            src='/LottieAnimation/ShareFriends.lottie'
          />
        </div>
      )}
      {currentPage === 1 && (
        <div className='w-full flex flex-col items-center mt-5'>
          <h2 className='text-xl'>
            Segundo, elige la <b>moneda</b> principal.
          </h2>
          <DotLottieReact
            src='/LottieAnimation/Currencies.lottie'
            loop
            autoplay='true'
            renderConfig={{ autoResize: 'true' }}
            className='size-52'
          />
        </div>
      )}
      {currentPage === 2 && (
        <h2 className='text-xl mt-5'>
          Tercero, <b>invita</b> a tus amigos.
        </h2>
      )}
      {currentPage === 3 && (
        <h2 className='text-xl mt-5'>Asegurate de que estén todos</h2>
      )}
      <button onClick={quitCreateGroup} className='absolute top-5 right-5'>
        <QuitIcon className='size-7' />
      </button>
      {currentPage !== 0 && (
        <button onClick={back} className='absolute top-5 left-5'>
          <HeadingIcon className='size-9' />
        </button>
      )}
      <form
        onSubmit={nextPage}
        className='w-full flex flex-col items-center justify-start'
      >
        {currentPage === 0 && (
          <input
            required
            type='text'
            id='title-group'
            name='title'
            placeholder='Nombre del grupo'
            className='rounded-lg px-3 py-2 w-full h-10 bg-neutral-900'
            value={formData.title}
            onChange={handleForm}
          />
        )}
        {currentPage === 1 && (
          <div className='w-full flex flex-col justify-center items-center'>
            <select
              name='currency'
              id='currency-group'
              className='py-2 px-3 rounded-lg w-full h-10 bg-neutral-900'
              value={formData.currency}
              onChange={handleForm}
            >
              {CURRENCIES?.map(e => (
                <option key={crypto.randomUUID()} value={e}>
                  {e}
                </option>
              ))}
            </select>
          </div>
        )}
        {currentPage === 2 && (
          <div className='flex flex-col gap-3 w-full items-center mt-5'>
            <div className='flex flex-row w-full'>
              <input
                type='search'
                name='searchMembers'
                id='search-users'
                placeholder='Por ej. Dorian#1234'
                className='py-2 px-3 rounded-lg w-full h-10 bg-neutral-900'
                value={search}
                onChange={handleSearch}
              />
              <button type='button' onClick={getSearchUsers}>
                <SearchIcon className='size-5' />
              </button>
            </div>
            <ul className='w-full flex flex-col divide-y divide-neutral-700'>
              {members?.map(member => {
                const { name, username, _id: id, image } = member
                return (
                  <li
                    key={id}
                    className='grid grid-cols-[0.5fr_2fr_0.5fr] items-center py-1'
                  >
                    {image ? (
                      <img
                        loading='lazy'
                        src={image}
                        alt={`Foto de ${name}`}
                        className='rounded-full'
                      />
                    ) : (
                      <span className='size-10 rounded-full text-xl bg-slate-400 flex items-center justify-center'>
                        {name.slice(0, 1).toUpperCase()}
                      </span>
                    )}
                    <div className='flex flex-col ms-2'>
                      <span className='text-start font-medium'>{name}</span>
                      <span className='text-start text-neutral-400'>
                        {username}
                      </span>
                    </div>
                    <div>
                      <input
                        type='checkbox'
                        name=''
                        id={id}
                        className='size-4'
                        value={id}
                        checked={formData.members.some(m => m.id === id)}
                        onChange={e =>
                          handleChecked(e, name, username, image, id)
                        }
                      />
                      <label htmlFor={id} className='' />
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        )}
        {currentPage === 3 && (
          <div className='w-full mt-5'>
            <ul className='w-full flex flex-col divide-y divide-neutral-700'>
              {formData.members?.map(member => {
                const { name, username, id, image } = member
                return (
                  <li
                    key={id}
                    className='grid grid-cols-[0.5fr_2fr_0.5fr] items-center py-1'
                  >
                    {image ? (
                      <img
                        className='rounded-full'
                        src={image}
                        alt={`Foto de ${name}`}
                      />
                    ) : (
                      <span className='size-10 rounded-full text-xl bg-slate-400 flex items-center justify-center'>
                        {name.slice(0, 1).toUpperCase()}
                      </span>
                    )}
                    <div className='flex flex-col ms-2'>
                      <span className='text-start font-medium'>{name}</span>
                      <span className='text-start text-neutral-400'>
                        {username}
                      </span>
                    </div>
                    <div>
                      <input
                        disabled={id === cookies.user._id}
                        type='checkbox'
                        name=''
                        id={id}
                        className='size-4'
                        value={id}
                        checked={formData.members.some(m => m.id === id)}
                        onChange={e => handleChecked(e, name, username, id)}
                      />
                      <label htmlFor={id} className='' />
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        )}
        {currentPage !== 3 && (
          <button
            type='submit'
            className='bg-emerald-800 mt-5 w-full py-2 px-0'
            onClick={nextPage}
          >
            Siguiente
          </button>
        )}
        {currentPage === 3 && (
          <button
            type='button'
            onClick={createGroup}
            className='bg-[var(--red-wine-color)] mt-5 w-full py-2 px-0'
          >
            Crear grupo
          </button>
        )}
      </form>
    </div>
  )
}

export default CreateGroup
