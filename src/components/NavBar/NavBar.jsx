import React from 'react'
import './NavBar.css'
import HomeIcon from '../../icons/HomeIcon'
import ProfileIcon from '../../icons/ProfileIcon'
import { NavLink } from 'react-router-dom'
import WalletIcon from '../../icons/WalletIcon'
import FriendsIcon from '../../icons/FriendsIcon'

const NavBar = () => {
  const ACTIVE_COLOR_AQUAMARINE = 'text-[var(--brand-color)]'
  const isActive = selected => {
    if (selected.isActive) {
      return ACTIVE_COLOR_AQUAMARINE
    } else {
      return 'text-neutral-400'
    }
  }
  return (
    <div className='fixed bottom-0 left-0 z-50 w-full h-16  dark:bg-[var(--grey-color)]'>
      <div className='grid h-full max-w-lg grid-cols-4 mx-auto font-medium items-center'>
        <NavLink to='/inicio' className={isActive}>
          <button
            type='button'
            className='inline-flex flex-col items-center justify-center px-5  hover:bg-gray-50 dark:hover:bg-gray-800 group'
          >
            <HomeIcon className='size-6 ' />
            <span className='text-xs group-hover:text-blue-600 dark:group-hover:text-blue-500'>
              Home
            </span>
          </button>
        </NavLink>
        <NavLink to='/wallet' className={isActive}>
          <button
            type='button'
            className='inline-flex flex-col items-center justify-center px-5  hover:bg-gray-50 dark:hover:bg-gray-800 group'
          >
            <WalletIcon className='size-6' />
            <span className='text-xs group-hover:text-blue-600 dark:group-hover:text-blue-500'>
              Wallet
            </span>
          </button>
        </NavLink>
        <NavLink to='/compartir' className={isActive}>
          <button
            type='button'
            className='inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group'
          >
            <FriendsIcon className='size-6' />
            <span className='text-xs group-hover:text-blue-600 dark:group-hover:text-blue-500'>
              Compartir
            </span>
          </button>
        </NavLink>
        <NavLink to='/perfil' className={isActive}>
          <button
            type='button'
            className='inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group'
          >
            <ProfileIcon className='size-6' />
            <span className='text-xs group-hover:text-blue-600 dark:group-hover:text-blue-500'>
              Profile
            </span>
          </button>
        </NavLink>
      </div>
    </div>
  )
}

export default NavBar
