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
    <div className='navbar fixed bottom-0 left-0 z-50 w-full '>
      <div className='grid h-full max-w-lg grid-cols-4 mx-auto font-medium items-start'>
        <NavLink to='/home' className={isActive}>
          <button
            type='button'
            className='inline-flex flex-col items-center justify-center px-5'
          >
            <HomeIcon className='size-6 ' />
            <span className='text-xs'>Home</span>
          </button>
        </NavLink>
        <NavLink to='/list' className={isActive}>
          <button
            type='button'
            className='inline-flex flex-col items-center justify-center px-5'
          >
            <WalletIcon className='size-6' />
            <span className='text-xs'>Wallet</span>
          </button>
        </NavLink>
        <NavLink to='/share' className={isActive}>
          <button
            type='button'
            className='inline-flex flex-col items-center justify-center px-'
          >
            <FriendsIcon className='size-6' />
            <span className='text-xs'>Compartir</span>
          </button>
        </NavLink>
        <NavLink to='/profile' className={isActive}>
          <button
            type='button'
            className='inline-flex flex-col items-center justify-center px-'
          >
            <ProfileIcon className='size-6' />
            <span className='text-xs'>Profile</span>
          </button>
        </NavLink>
      </div>
    </div>
  )
}

export default NavBar
