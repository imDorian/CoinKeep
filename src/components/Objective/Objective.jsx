import React from 'react'
import './Objective.css'
import Article from '../Article/Article'
import { thisMonth } from '../List/List'
import { capitalizeFirstLetter } from '../SpendInput/SpendInput'

const Objective = () => {
  return (
    <Article width='100%'>
      <h3>Define tu objetivo para {capitalizeFirstLetter(thisMonth)}</h3>
    </Article>
  )
}

export default Objective
