import React, { useState } from 'react'

const DropDown = ({ deleteValut }) => {
  // Estado para controlar si el menú está abierto o cerrado
  const [isOpen, setIsOpen] = useState(false)

  // Función para alternar el estado abierto/cerrado
  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  return (
    <button
      id='dropdownMenuIconButton'
      onClick={toggleDropdown}
      className='relative inline-flex items-center p-2 text-sm font-medium text-center text-neutral-400 bg-transparent rounded-lg focus:text-neutral-100 '
      type='button'
    >
      <svg
        className='w-5 h-5'
        aria-hidden='true'
        xmlns='http://www.w3.org/2000/svg'
        fill='currentColor'
        viewBox='0 0 4 15'
      >
        <path d='M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z' />
      </svg>
      {isOpen && (
        <div
          id='dropdownDots'
          className='z-10 absolute bottom-8 right-8 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-neutral-700 dark:divide-gray-600'
        >
          <ul
            className='py-2 text-sm text-gray-700 dark:text-gray-200'
            aria-labelledby='dropdownMenuIconButton'
          >
            <li>
              <a
                disabled
                href='#'
                className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
              >
                Editar
              </a>
            </li>
          </ul>
          <div className='py-2'>
            <a
              onClick={deleteValut}
              className='block px-4 py-2 text-sm text-red-500  hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-red-500 dark:hover:text-white'
            >
              Borrar Valut
            </a>
          </div>
        </div>
      )}
    </button>
  )
}

export default DropDown
