import React from 'react'
import RegisterForm from '../../components/RegisterForm/RegisterForm'
import './Register.css'
import { Link } from 'react-router-dom'
// import LoginGoogle from '../components/LoginGoogle/LoginGoogle'

const Register = () => {
  return (
    <div className='signup-page'>
      <h1>¡Regístrate en CoinKeeper para empezar a ahorrar!</h1>
      <RegisterForm />
      <span>Registrate con </span>
      <div>
        {/* <LoginGoogle /> */}
      </div>
      <div>
        <span>¡<Link to='/'>Inicia sesión</Link> si ya tienes una cuenta!</span>
      </div>
    </div>
  )
}

export default Register
