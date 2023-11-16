/* eslint-disable react/prop-types */
import React from 'react'
import './Article.css'

const Article = ({ children }) => {
  return (
    <article className='article'>
      {children}
    </article>
  )
}

export default Article
