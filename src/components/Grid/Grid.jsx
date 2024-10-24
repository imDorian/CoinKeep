/* eslint-disable react/prop-types */
import React from 'react'
import { useStore } from '../../stores/useStore'
// import './Grid.css'
export function selectWidget (widget) {
  if (widget === 'personalBalance') {
    return 'grid-cols-[30%_60%]'
  }
  if (widget === 'balance') {
    return 'grid-cols-[60%_30%]'
  }
  if (widget === '') {
    return 'grid-cols-[45%_45%]'
  }
}

const Grid = ({ className, children, cols, ...rest }) => {
  return (
    <article
      className='grid gap-x-2 gap-y-2 w-[100%] transition-all duration-300 items-start justify-center px-4'
      style={{
        gridTemplateColumns: cols,
        transformOrigin: 'center'
        // overflow: 'hidden'
      }}
      {...rest}
    >
      {children}
    </article>
  )
}

export default Grid
