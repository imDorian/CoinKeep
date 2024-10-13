/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { verifyToken } from '../../functions/verifyToken'
import { useStore } from '../../stores/useStore'
import { googleLogout } from '@react-oauth/google'

const LoginForm = ({ loading, setLoading }) => {
  const navigate = useNavigate()
  const fetchLogin = useStore(state => state.fetchLogin)

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const [errorMessage, setErrorMessage] = useState('')

  // Función para verificar si el token ya existe en localStorage
  const fetchTokenVerify = async () => {
    try {
      const data = await verifyToken()
      if (data.status === 200) {
        navigate('/inicio') // Si el token es válido, redirigir a inicio
      } else {
        googleLogout()
        window.localStorage.setItem('userdata', { token: '', user: {} })
        console.log('Token no válido')
      }
    } catch (error) {
      console.error('Error verificando el token:', error)
    }
  }

  useEffect(() => {
    if (window.localStorage.getItem('userdata')) {
      fetchTokenVerify() // Verificar token cuando se carga la página
    }
  }, [])

  // Función para manejar cambios en los campos del formulario
  const handleInputChange = e => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  // Función para manejar el envío del formulario de inicio de sesión
  const handleLogin = async e => {
    e.preventDefault()
    setLoading(true)
    setErrorMessage('') // Limpiar cualquier mensaje de error previo

    // Validaciones adicionales
    if (!formData.email.includes('@') || formData.password.length < 6) {
      setErrorMessage('Email o contraseña no válidos.')
      setLoading(false)
      return
    }

    try {
      const { response, json } = await fetchLogin(formData)
      if (response.status === 200) {
        // Guardar datos del usuario en localStorage
        window.localStorage.setItem('userdata', JSON.stringify(json))
        console.log(json)
        setLoading(false)
        navigate('/inicio') // Redirigir a la página de inicio si el login es exitoso
      } else {
        setErrorMessage('Credenciales incorrectas. Inténtalo de nuevo.')
        setLoading(false)
      }
    } catch (error) {
      console.error('Error en el inicio de sesión:', error)
      setErrorMessage('Error en la conexión. Inténtalo de nuevo.')
      setLoading(false)
    }
  }

  return (
    <form className='flex flex-col gap-2' onSubmit={handleLogin}>
      <label className='flex flex-col items-center'>
        <span>Email</span>
        <input
          className='rounded-none px-2 h-9 bg-transparent border-b-2 border-neutral-400 outline-none focus:border-white transition-colors'
          type='email'
          name='email'
          placeholder='ej: dorian@email.com'
          onChange={handleInputChange}
          value={formData.email}
          required
        />
      </label>

      <label className='flex flex-col items-center gap-1'>
        <span>Contraseña</span>
        <input
          className='rounded-none px-2 h-9 bg-transparent border-b-2 border-neutral-400 outline-none focus:border-white transition-colors'
          type='password'
          name='password'
          placeholder='*******************'
          onChange={handleInputChange}
          value={formData.password}
          required
        />
      </label>

      <button
        className=' border-2 border-[var(--brand-color)] text-[var(--brand-color)] mt-4 rounded-lg'
        type='submit'
        disabled={loading}
      >
        {loading ? 'Cargando...' : 'Iniciar sesión'}
      </button>

      {errorMessage && <p className='error-message'>{errorMessage}</p>}
    </form>
  )
}

export default LoginForm
