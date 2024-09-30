/* eslint-disable react/prop-types */
import React from 'react'
import './Edit.css'
import EditIcon from '../../icons/EditIcon'

const Edit = ({ editSwitch, setEditSwitch }) => {
  return (
    <div className='edit'>
      <button onClick={() => setEditSwitch(!editSwitch)}>
        <EditIcon
          className={
            !editSwitch
              ? 'size-5 absolute top-0 right-0'
              : 'size-5 absolute top-0 right-0 stroke-red-400'
          }
        />
      </button>
    </div>
  )
}

export default Edit
