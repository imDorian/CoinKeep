import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const URL = import.meta.env.VITE_URL + '/users/register'

const RegisterForm = () => {
  const [dataForm, setDataForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPass: ''
  })
  const navigate = useNavigate()

  const handleChangeInput = (e) => {
    const { name, value } = e.target
    setDataForm({ ...dataForm, [name]: value })
    console.log(name, value)
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    if (dataForm.password === dataForm.confirmPass) {
      const response = await window.fetch(URL, {
        method: 'POST',
        body: JSON.stringify(dataForm),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      await response.json()
      console.log(response)
      navigate('/')
    } else {
      console.log('La contraseña tiene que coincidir')
    }
    // confirmar que la contrseña tenga lo requerido
    // confirmar que las contraseñas sean iguales
    // registrar usuario
  }
  return (
    <form className='login-form' onSubmit={handleRegister}>
      <label htmlFor='name'>
        Nombre
        <input type='text' name='name' onChange={handleChangeInput} value={dataForm.name} placeholder='Dorian' required />
      </label>
      <label htmlFor='signup'>
        Email
        <input type='email' name='email' onChange={handleChangeInput} value={dataForm.email} placeholder='user@coinkeeper.com' required />
      </label>
      <label htmlFor='signup-pass'>
        Contraseña
        <input type='password' name='password' onChange={handleChangeInput} value={dataForm.password} placeholder='Contr@seña123' required />
      </label>
      <label htmlFor='signup-pass'>
        Confirmar contraseña
        <input type='password' name='confirmPass' onChange={handleChangeInput} value={dataForm.confirmPass} placeholder='Contr@seña123' required />
      </label>
      <button>Registrarse</button>
    </form>
  )
}

export default RegisterForm
