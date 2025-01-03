import React from 'react'
import Container from '../Container/Container'

const DetailsTransaction = ({
  category,
  model,
  type,
  quantity,
  amount,
  group,
  fromUser,
  toUser,
  divide,
  date,
  description,
  title
}) => {
  return (
    <Container>
      <h1>{title || description || 'Detalles'}</h1>
    </Container>
  )
}

export default DetailsTransaction
