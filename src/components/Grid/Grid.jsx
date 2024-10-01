/* eslint-disable react/prop-types */
import React from 'react'
// import './Grid.css'
import { MagicMotion } from 'react-magic-motion'

const Grid = ({ props, children }) => {
  return (
    // <MagicMotion>
    <article
      className='grid grid-cols-2 gap-x-3 w-[100%] transition-all items-start'
      {...props}
    >
      {children}
    </article>
    // </MagicMotion>
  )
}

export default Grid
