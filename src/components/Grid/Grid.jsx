/* eslint-disable react/prop-types */
import React from 'react'
import './Grid.css'

const Grid = ({ children }) => {
  return (
    <article className='grid'>
      {children}
    </article>
  )
}

export default Grid
