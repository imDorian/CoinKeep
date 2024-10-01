/* eslint-disable react/prop-types */
import React from 'react'
import './Article.css'

const Article = ({ children, width, position, className, ...rest }) => {
  return (
    <article
      className={`article ${className}`}
      style={{ width, position }}
      {...rest}
    >
      {children}
    </article>
  )
}

export default Article
