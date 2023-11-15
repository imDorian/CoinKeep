import React from 'react'
import './NavBar.css'
import HomeIcon from '../../icons/HomeIcon'
import CurrencyIcon from '../../icons/CurrencyIcon'
import ProfileIcon from '../../icons/ProfileIcon'
import { NavLink, useLocation } from 'react-router-dom'

const NavBar = () => {
  const ACTIVE_COLOR_AQUAMARINE = 'aquamarine'
  const { pathname } = useLocation()

  const isActive = (selected) => {
    if (pathname === selected) {
      return ACTIVE_COLOR_AQUAMARINE
    } else {
      return 'white'
    }
  }
  return (
    <nav className='nav-bar__container'>
      <ul>
        <NavLink to='/inicio' className={({ isActive }) => isActive ? 'active' : ''}><li><HomeIcon size='30px' color={isActive('/inicio')} />Inicio</li></NavLink>
        <NavLink to='/misfinanzas'><li><CurrencyIcon size='30px' color={isActive('/misfinanzas')} />Mis Finanzas</li></NavLink>
        <NavLink to='/perfil'><li><ProfileIcon size='30px' color={isActive('/perfil')} />Perfil</li></NavLink>
      </ul>
    </nav>
  )
}

export default NavBar
