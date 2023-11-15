/* eslint-disable react/prop-types */
import React from 'react'
import './Subtitle.css'

const Subtitle = ({ data, currency, subtitle }) => {
  // console.log(data)
  const subtotal = data && data.reduce((total, d) => total + parseFloat(d.quantity), 0)
  return (
    <div className='subtitle'>
      <h2>{subtitle}<span> + XXX€ que el mes pasado</span></h2>
      <span>Total {subtotal.toFixed(2)}{currency}</span>
    </div>
  )
}

export default Subtitle
