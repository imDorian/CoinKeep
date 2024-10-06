/* eslint-disable react/prop-types */
import React from 'react'

const CashIcon = ({ className, ...rest }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 14 14'
      className={className}
    >
      <g
        fill='none'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
      >
        <path d='M7 4.5V3M5.5 8.5c0 .75.67 1 1.5 1s1.5 0 1.5-1c0-1.5-3-1.5-3-3c0-1 .67-1 1.5-1s1.5.38 1.5 1M7 9.5V11' />
        <circle cx='7' cy='7' r='6.5' />
      </g>
    </svg>
  )
}

export default CashIcon
