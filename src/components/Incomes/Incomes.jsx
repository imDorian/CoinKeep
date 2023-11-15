/* eslint-disable react/prop-types */
import './Incomes.css'
import Container from '../Container/Container'
import { TIPOS_INGRESOS, INCOME_TYPES } from '../../categories/INCOME_TYPES.jsx'
import List from '../List/List'
import Subtitle from '../Subtitle/Subtitle'
import ModalDelete from '../ModalDelete/ModalDelete'
import { useStore } from '../../stores/useStore'

const Incomes = ({ currency, editSwitch }) => {
  const income = useStore(state => state.income)
  return (
    <Container>
      <ModalDelete prop='income' />
      <Subtitle currency={currency} data={income} subtitle='Ingresos' />
      <List editSwitch={editSwitch} currency={currency} data={income} types={TIPOS_INGRESOS[0] || INCOME_TYPES[0]} title='Ingresos Fijos' />
      <List editSwitch={editSwitch} currency={currency} data={income} types={TIPOS_INGRESOS[1] || INCOME_TYPES[1]} title='Ingresos Variables' />
      <List editSwitch={editSwitch} currency={currency} data={income} types={TIPOS_INGRESOS[2] || INCOME_TYPES[2]} title='Ingresos Pasivos' />
      <List editSwitch={editSwitch} currency={currency} data={income} types={TIPOS_INGRESOS[3] || INCOME_TYPES[3]} title='Ingresos Recurrentes' />
      <List editSwitch={editSwitch} currency={currency} data={income} types={TIPOS_INGRESOS[4] || INCOME_TYPES[4]} title='Ingresos Eventuales' />
    </Container>
  )
}

export default Incomes
