/* eslint-disable react/prop-types */
import React from 'react'
import './RangeSpending.css'
import ProgressBar from '@ramonak/react-progress-bar'

const RangeSpending = ({ completed, maxCompleted, customLabel, currency }) => {
  return (
    <div>
      <ProgressBar
        className='wrapper'
        barContainerClassName='containerBar'
        labelClassName='label'
        completed={parseFloat(completed)}
        maxCompleted={parseFloat(maxCompleted)}
        customLabel={completed > 10 ? `${customLabel}${currency}` : ''}
        height='10px'
        bgColor={parseFloat(completed) >= parseFloat(maxCompleted) ? 'red' : 'aquamarine'}
      />
    </div>
  )
}

export default RangeSpending
