/* eslint-disable react/prop-types */
import React from 'react'
import './Edit.css'
import EditIcon from '../../icons/EditIcon'

const Edit = ({ editSwitch, setEditSwitch }) => {
  return (
    <button
      className='absolute top-1 right-1 z-50'
      onClick={() => setEditSwitch(!editSwitch)}
    >
      <EditIcon
        className={
          editSwitch ? 'text-red-200 size-5' : 'size-5 stro text-neutral-400'
        }
      />
    </button>
  )
}

export default Edit
