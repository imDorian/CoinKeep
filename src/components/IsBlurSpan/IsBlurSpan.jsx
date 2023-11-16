/* eslint-disable react/prop-types */
import React from 'react'
import { useStore } from '../../stores/useStore'

const IsBlurSpan = ({ children }) => {
  const { isBlur } = useStore()
  return (
    <span style={{ filter: isBlur ? 'blur(4px)' : '', transitionDuration: '300ms' }}>{children}</span>
  )
}

export default IsBlurSpan
