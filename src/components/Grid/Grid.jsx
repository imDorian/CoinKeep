/* eslint-disable react/prop-types */
import React from 'react'
import './Grid.css'
import { MagicMotion } from 'react-magic-motion'

const Grid = ({ children, width }) => {
  return (
    // <MagicMotion>
    <article className='grid' style={{ width }}>
      {children}
    </article>
    // </MagicMotion>
  )
}

export default Grid
