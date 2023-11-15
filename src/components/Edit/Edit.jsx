/* eslint-disable react/prop-types */
import React from 'react'
import './Edit.css'
import EditIcon from '../../icons/EditIcon'

const Edit = ({ editSwitch, setEditSwitch }) => {
  return (
    <div className='edit'>
      <button onClick={() => setEditSwitch(!editSwitch)}><EditIcon color='white' size='18px' /></button>
    </div>
  )
}

export default Edit
