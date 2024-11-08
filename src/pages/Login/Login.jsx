import React, { useState } from 'react'
import LoginForm from '../../components/LoginForm/LoginForm'
import { Link } from 'react-router-dom'
import LoginGoogle from '../../components/LoginGoogle/LoginGoogle'
import { googleLogout } from '@react-oauth/google'
// import { useEffect } from 'react'

// import LoginGoogle from '../../components/LoginGoogle/LoginGoogle'

const Login = () => {
  const [loading, setLoading] = useState(false)

  return (
    <div className='flex flex-col items-center py-6 gap-6 justify-center fade-in'>
      <div className='flex flex-col items-center'>
        <img src='/KeepCoin.png' alt='KeepCoin Logo' className='size-28' />
        <h1 className='font-semibold mt-1 text-center'>Keep Coin</h1>
        <span className='text-center tracking-[0.11rem] text-neutral-300'>
          Save your money
        </span>
      </div>
      <h2 className='text-2xl text-center text-neutral-300'>
        ¡Inicia sesión para empezar a <b>gestionar</b> tu dinero!
      </h2>
      <div className='flex flex-col gap-4'>
        <LoginForm loading={loading} setLoading={setLoading} />
        <LoginGoogle title='Inicia sesión con Google' />
      </div>
      <span className='text-neutral-300'>
        ¿Todavía no tienes una cuenta en KeepCoin?
        <Link className='text-blue-400 text-lg' to='/signup'>
          ¡Regístrate!
        </Link>
      </span>
      {/* {isVisible && (
        <div>
          La sesión ha caducado, vuelve a iniciar sesión
        </div>
      )} */}
    </div>
  )
}

export default Login
