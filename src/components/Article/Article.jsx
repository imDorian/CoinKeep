/* eslint-disable react/prop-types */
import React from 'react'
import './Article.css'
import { useStore } from '../../stores/useStore'

const Article = ({ children }) => {
  const { isBlur } = useStore()
  return (
    <article style={{ filter: isBlur ? 'blur(4px)' : '', transitionDuration: '300ms' }} className='article'>
      {children}
    </article>
  )
}

export default Article
