/* eslint-disable react/prop-types */
import React from 'react'
import './Edit.css'
import EditIcon from '../../icons/EditIcon'

const Edit = ({ editSwitch, setEditSwitch }) => {
  return (
    <button
      className='absolute top-1 right-1'
      onClick={() => setEditSwitch(!editSwitch)}
    >
      <EditIcon className={!editSwitch && 'stroke-red-400 size-5'} />
    </button>
  )
}

export default Edit
