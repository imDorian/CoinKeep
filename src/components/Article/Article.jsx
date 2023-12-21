/* eslint-disable react/prop-types */
import React from 'react'
import './Article.css'

const Article = ({ children, width, position }) => {
  return (
    <article className='article' style={{ width, position }}>
      {children}
    </article>
  )
}

export default Article
