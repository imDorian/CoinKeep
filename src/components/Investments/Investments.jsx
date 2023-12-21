/* eslint-disable react/prop-types */
import React, { useContext } from 'react'
import Container from '../Container/Container'
import ModalDelete from '../ModalDelete/ModalDelete'
import Subtitle from '../Subtitle/Subtitle'
import { userDataContext } from '../../contexts/ContextProvider'
import List from '../List/List'
import { INVESTMENT_TYPES, TIPOS_INVERSION } from '../../categories/INVESTMENT_TYPES'
import { useStore } from '../../stores/useStore'

const Investments = ({ currency, editSwitch }) => {
  const { investment } = useStore()
  return (
    <Container>
      <ModalDelete prop='investment' />
      <Subtitle currency={currency} data={investment} subtitle='Inversión' />
      <List editSwitch={editSwitch} currency={currency} data={investment} types={TIPOS_INVERSION[0] || INVESTMENT_TYPES[0]} title='Acciones' />
      <List editSwitch={editSwitch} currency={currency} data={investment} types={TIPOS_INVERSION[1] || INVESTMENT_TYPES[1]} title='Bonos' />
      <List editSwitch={editSwitch} currency={currency} data={investment} types={TIPOS_INVERSION[2] || INVESTMENT_TYPES[2]} title='Fondos Mutuos' />
      <List editSwitch={editSwitch} currency={currency} data={investment} types={TIPOS_INVERSION[3] || INVESTMENT_TYPES[3]} title='Fondos de Inversión' />
      <List editSwitch={editSwitch} currency={currency} data={investment} types={TIPOS_INVERSION[4] || INVESTMENT_TYPES[4]} title='Bienes Raíces' />
      <List editSwitch={editSwitch} currency={currency} data={investment} types={TIPOS_INVERSION[5] || INVESTMENT_TYPES[5]} title='Mercado de Divisas' />
      <List editSwitch={editSwitch} currency={currency} data={investment} types={TIPOS_INVERSION[6] || INVESTMENT_TYPES[6]} title='Materias Primas' />
      <List editSwitch={editSwitch} currency={currency} data={investment} types={TIPOS_INVERSION[7] || INVESTMENT_TYPES[7]} title='Índices Bursátiles' />
      <List editSwitch={editSwitch} currency={currency} data={investment} types={TIPOS_INVERSION[8] || INVESTMENT_TYPES[8]} title='Criptomonedas' />
      <List editSwitch={editSwitch} currency={currency} data={investment} types={TIPOS_INVERSION[9] || INVESTMENT_TYPES[9]} title='Certificados de Depósitos' />
    </Container>
  )
}

export default Investments
