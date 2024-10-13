/* eslint-disable react/prop-types */
import React from 'react'

const LoginTextInput = ({ title, classname, ...rest }) => {
  return (
    <label className='flex flex-col items-center gap-1'>
      <span>{title}</span>
      <input
        className='rounded-none px-2 h-9 bg-transparent border-b-2 border-neutral-400 outline-none focus:border-white transition-colors'
        {...rest}
      />
    </label>
  )
}

export default LoginTextInput
