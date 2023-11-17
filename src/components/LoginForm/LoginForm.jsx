/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import './LoginForm.css'
import { useNavigate } from 'react-router-dom'
import { verifyToken } from '../../functions/verifyToken'
import { useStore } from '../../stores/useStore'

const LoginForm = ({ loading, setLoading }) => {
  const fetchLogin = useStore(state => state.fetchLogin)
  const fetchTokenVerify = async () => {
    const data = await verifyToken()
    if (data.status === 200) {
      // hacer fetch de datos actualizados del user
      // navegar hasta home
      navigate('/inicio')
    }
  }
  useEffect(() => {
    if (window.localStorage.getItem('userdata')) {
      fetchTokenVerify()
    }
  }, [])
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }
  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    console.log('execute submit')
    try {
      if (formData.email.length > 5 && formData.password.length > 5) {
        // Hacemos fetch de los datos del user
        const { response, json } = await fetchLogin(formData)
        if (response.status === 200) {
          // Guardamos las cookies
          window.localStorage.removeItem('userdata')
          window.localStorage.setItem('userdata', JSON.stringify(json))
          // Seteamos el loading a false
          setLoading(false)
          // redirigir a la página de incio
          navigate('/inicio')
        }
      } else {
        // Seteamos el loading a false
        setLoading(false)
        console.log('Falta email o contraseña')
      }
    } catch (error) {
      console.error(error)
      setLoading(false)
    }
  }
  return (
    <form className='login-form' onSubmit={handleLogin}>
      <label>
        Email
        <input type='email' name='email' placeholder='user@coinkeeper.com' onChange={handleInputChange} value={formData.email} required />
      </label>
      <label>
        Contraseña
        <input type='password' name='password' placeholder='Contr@seña123' onChange={handleInputChange} value={formData.password} required />
      </label>
      <button type='submit'>{loading ? 'Cargando...' : 'Iniciar sesión'}</button>
    </form>
  )
}

export default LoginForm
