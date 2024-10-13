import React from 'react'
import RegisterForm from '../../components/RegisterForm/RegisterForm'
import { Link } from 'react-router-dom'
import LoginGoogle from '../../components/LoginGoogle/LoginGoogle'
// import LoginGoogle from '../components/LoginGoogle/LoginGoogle'

const Register = () => {
  return (
    <div className='flex flex-col items-center py-6 gap-6 justify-center'>
      <h1>
        ¡Regístrate en <b>KeepCoin</b>!
      </h1>
      <RegisterForm />
      <div>
        <span>
          ¡<Link to='/'>Inicia sesión</Link> si ya tienes una cuenta!
        </span>
      </div>
    </div>
  )
}

export default Register
