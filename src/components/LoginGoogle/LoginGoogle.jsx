/* eslint-disable react/jsx-handler-names */
/* eslint-disable react/prop-types */
import { useGoogleLogin } from '@react-oauth/google'
import { googleLogin } from '../../functions/googleLogin'
import { useNavigate } from 'react-router-dom'
import GoogleIcon from '../../icons/GoogleIcon'
import { useState } from 'react'

const LoginGoogle = ({ className, title }) => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const handleLogin = useGoogleLogin({
    onSuccess: async res => {
      setLoading(true)
      const response = await googleLogin(res.access_token)
      if (response.res.status === 200) {
        const json = response.json
        console.log(json)
        window.localStorage.setItem('userdata', JSON.stringify(json))
        setLoading(false)
        navigate('/home')
      } else {
        console.error('Error')
        setLoading(false)
      }
    },
    onError: error => {
      setLoading(false)
      console.error(error)
    },
    flow: 'implicit',
    scope: 'email profile',
    ux_mode: 'popup'
  })
  return (
    <button
      onClick={handleLogin}
      type='button'
      className={`text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-3 h-7 text-center inline-flex items-center justify-center dark:focus:ring-[#4285F4]/55  mb-5 ${className}`}
    >
      <GoogleIcon />
      {!loading ? title : 'Iniciando sesión...'}
    </button>
  )
}

export default LoginGoogle
