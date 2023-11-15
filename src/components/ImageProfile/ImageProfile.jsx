/* eslint-disable react/prop-types */
import React from 'react'
import './ImageProfile.css'

const ImageProfile = ({ src }) => {
  return (
    <div id='image-profile'>
      <img src={src} alt='' />
    </div>
  )
}

export default ImageProfile
