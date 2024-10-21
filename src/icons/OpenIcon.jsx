import React from 'react'

const OpenIcon = ({ className }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='128'
      height='128'
      viewBox='0 0 24 24'
      className={className}
    >
      <path
        fill='none'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='1.5'
        d='M10.75 4.25h-3.5a4 4 0 0 0-4 4v8.5a4 4 0 0 0 4 4h8.5a4 4 0 0 0 4-4v-3.5m-5.5-10h5.5c.276 0 .526.112.707.293m.293 6.207v-5.5a1 1 0 0 0-.293-.707M13.25 10.75l6.5-6.5l.707-.707'
      />
    </svg>
  )
}

export default OpenIcon
