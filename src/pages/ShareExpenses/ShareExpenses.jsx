import React from 'react'
import Container from '../../components/Container/Container'
import Welcome from '../../components/Welcome/Welcome'
import NavBar from '../../components/NavBar/NavBar'

const ShareExpenses = () => {
  return (
    <Container>
      <Welcome />
      <h1>Compartir Gastos</h1>
      <NavBar />
    </Container>
  )
}

export default ShareExpenses
