import React, { useState } from 'react'
import LoginForm from '../../components/LoginForm/LoginForm'
import { Link } from 'react-router-dom'
import './Login.css'
// import { useEffect } from 'react'

// import LoginGoogle from '../../components/LoginGoogle/LoginGoogle'

const Login = () => {
  const [loading, setLoading] = useState(false)

  return (
    <div className='login-page'>
      <h1>¡Inicia sesión en CoinKeeper para gestionar tus coins!</h1>
      <LoginForm loading={loading} setLoading={setLoading} />
      <span>Inicia sesión con</span>
      <div className='login-another'>
        {/* <LoginGoogle loading={loading} setLoading={setLoading} /> */}
      </div>
      <span>¿Todavía no tienes una cuenta en CoinKeeper?<Link to='/signup'>¡Regístrate!</Link></span>
      {/* {isVisible && (
        <div>
          La sesión ha caducado, vuelve a iniciar sesión
        </div>
      )} */}
    </div>
  )
}

export default Login
