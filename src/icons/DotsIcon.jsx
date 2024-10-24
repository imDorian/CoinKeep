import React from 'react'

const DotsIcon = ({ className }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='128'
      height='128'
      viewBox='0 0 24 24'
      className={className}
    >
      <path
        fill='currentColor'
        d='M10.5 3h3v3h-3zm0 7.5h3v3h-3zm0 7.5h3v3h-3z'
      />
    </svg>
  )
}

export default DotsIcon
