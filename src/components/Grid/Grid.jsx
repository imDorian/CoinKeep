/* eslint-disable react/prop-types */
import React from 'react'
// import './Grid.css'

const Grid = ({ className, children, ...rest }) => {
  return (
    <article className={className} {...rest}>
      {children}
    </article>
  )
}

export default Grid
