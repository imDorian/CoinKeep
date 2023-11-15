/* eslint-disable react/jsx-handler-names */
/* eslint-disable react/prop-types */
import React, { useEffect } from 'react'
import GoogleIcon from '../../icons/GoogleIcon'
import GoogleLogin from 'react-google-login'
import { gapi } from 'gapi-script'
import './LoginGoogle.css'

const LoginGoogle = () => {
  const clientID = '882636311043-1dfaagufid5k7s11gavt1df185lhqt4g.apps.googleusercontent.com'

  useEffect(() => {
    const start = () => {
      gapi.auth2.init({
        clientId: clientID
      })
    }
    gapi.load('client:auth2', start)
  }, [])

  const onSuccess = (res) => {
    console.log(res)
    // Logear al usuario con Google
    // Sacar los datos de google
    const { email, givenName, imageUrl, googleId } = res.profileObj
    // Buscar en la lista de users y ver si existe el email
    const user = {
      email,
      name: givenName,
      imageUrl,
      googleId
    }
    console.log(user)
    // Si existe incimos sesión
    // Si no existe creamos una cuenta con los datos de Google
  }

  const onFailure = (res) => {
    console.log('Algo ha salido mal', res)
  }

  return (
    <GoogleLogin
      render={renderProps => (
        <button onClick={renderProps.onClick} disabled={renderProps.disabled}><GoogleIcon size='24px' color='white' /></button>
      )}
      theme='dark'
      clientId={clientID}
      onSuccess={onSuccess}
      onFailure={onFailure}
      cookiePolicy='single_host_policy'
    />
  )
}

export default LoginGoogle
