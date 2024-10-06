/* eslint-disable react/prop-types */
import React from 'react'
import './Container.css'

const Container = ({ children, className }) => {
  return <div className={`container ${className}`}>{children}</div>
}

export default Container
