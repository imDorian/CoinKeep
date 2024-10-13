/* eslint-disable react/jsx-handler-names */
/* eslint-disable react/prop-types */
import React, { useEffect } from 'react'
import {
  GoogleLogin,
  useGoogleLogin,
  useGoogleOAuth,
  useGoogleOneTapLogin
} from '@react-oauth/google'

import { jwtDecode } from 'jwt-decode'
import { useStore } from '../../stores/useStore'
import { googleLogin } from '../../functions/googleLogin'
import { verifyToken } from '../../functions/verifyToken'
import { useNavigate } from 'react-router-dom'
import GoogleIcon from '../../icons/GoogleIcon'

const LoginGoogle = ({ className, title }) => {
  const navigate = useNavigate()
  async function fetchData (res) {
    const response = await googleLogin(res.credential)
    console.log(response)
    if (response.res.status === 200) {
      const json = response.json
      // console.log(json)
      window.localStorage.setItem('userdata', JSON.stringify(json))
      navigate('/inicio')
    } else {
      console.log('Error')
    }
  }

  const handleLogin = useGoogleLogin({
    onSuccess: async res => {
      console.log(res)
      const response = await googleLogin(res.access_token)
      console.log(response)
      if (response.res.status === 200) {
        const json = response.json
        console.log(json)
        window.localStorage.setItem('userdata', JSON.stringify(json))
        navigate('/inicio')
      } else {
        console.log('Error')
      }
    },
    onError: error => console.log(error),
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
      {title}
    </button>
  )
}

export default LoginGoogle
