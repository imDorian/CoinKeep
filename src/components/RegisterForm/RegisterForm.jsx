import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import LoginTextInput from '../LoginTextInput/LoginTextInput'
import LoginGoogle from '../LoginGoogle/LoginGoogle'

const URL = import.meta.env.VITE_URL + '/users/register'

const RegisterForm = () => {
  const [loading, setLoading] = useState(false)
  const [dataForm, setDataForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPass: ''
  })
  const navigate = useNavigate()

  const handleChangeInput = e => {
    const { name, value } = e.target
    setDataForm({ ...dataForm, [name]: value })
    console.log(e.target.value)
  }

  const handleRegister = async e => {
    e.preventDefault()
    setLoading(true)
    if (dataForm.password === dataForm.confirmPass) {
      const response = await window.fetch(URL, {
        method: 'POST',
        body: JSON.stringify(dataForm),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if (response.status !== 201) {
        return
      }
      navigate('/')
    } else {
      console.log('La contraseña tiene que coincidir')
    }
    setLoading(false)
  }
  return (
    <form
      className='flex flex-col items-center justify-center gap-4'
      onSubmit={handleRegister}
    >
      <LoginTextInput
        title='Nombre'
        type='text'
        name='name'
        onChange={handleChangeInput}
        value={dataForm.name}
        placeholder='ej: Dorian'
      />
      <LoginTextInput
        title='Email'
        type='email'
        name='email'
        onChange={handleChangeInput}
        value={dataForm.email}
        placeholder='ej: dorian@email.com'
      />
      <LoginTextInput
        title='Contraseña'
        type='password'
        name='password'
        onChange={handleChangeInput}
        value={dataForm.password}
        placeholder='Pas*****'
      />
      <LoginTextInput
        title='Confirmar contraseña'
        type='password'
        name='password'
        onChange={handleChangeInput}
        value={dataForm.confirmPass}
        placeholder='Pas*****'
      />

      <button
        className=' border-2 border-[var(--brand-color)] text-[var(--brand-color)] mt-4 rounded-lg w-full'
        type='submit'
        disabled={loading}
      >
        {loading ? 'Cargando...' : 'Registrarse'}
      </button>
      <LoginGoogle
        className='w-full text-center'
        title='Registrate con Google'
      />
    </form>
  )
}

export default RegisterForm
