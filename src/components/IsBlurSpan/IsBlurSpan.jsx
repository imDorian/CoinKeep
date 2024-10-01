/* eslint-disable react/prop-types */
import React from 'react'
import { useStore } from '../../stores/useStore'

const IsBlurSpan = ({ children, className, ...rest }) => {
  const { isBlur } = useStore()
  return (
    <span
      className={`${
        isBlur ? 'blur-sm' : ''
      } transition-all duration-300 ${className}`}
      {...rest}
    >
      {children}
    </span>
  )
}

export default IsBlurSpan
