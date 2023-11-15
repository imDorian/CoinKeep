/* eslint-disable react/prop-types */
import Subtitle from '../Subtitle/Subtitle'
import Container from '../Container/Container'
import List from '../List/List'
import { EXPENSES_TYPES, TIPOS_GASTOS } from '../../categories/EXPENSES_TYPES'
import ModalDelete from '../ModalDelete/ModalDelete'
import { useStore } from '../../stores/useStore'

const Expenses = ({ currency, editSwitch }) => {
  const expense = useStore(state => state.expense)
  return (
    <Container>
      <ModalDelete prop='expense' />
      <Subtitle currency={currency} data={expense} subtitle='Gastos' />
      {/* <Input categories={CATEGORIAS_GASTOS} types={TIPOS_GASTOS} currency={currency} setUserData={setUserData} userData={userData} /> */}
      <List editSwitch={editSwitch} currency={currency} data={expense} types={TIPOS_GASTOS[0] || EXPENSES_TYPES[0]} title='Gastos Fijos' />
      <List editSwitch={editSwitch} currency={currency} data={expense} types={TIPOS_GASTOS[1] || EXPENSES_TYPES[1]} title='Gastos Variables' />
      <List editSwitch={editSwitch} currency={currency} data={expense} types={TIPOS_GASTOS[2] || EXPENSES_TYPES[2]} title='Gastos Impredecibles' />
      <List editSwitch={editSwitch} currency={currency} data={expense} types={TIPOS_GASTOS[3] || EXPENSES_TYPES[3]} title='Gastos Diarios' />
    </Container>
  )
}

export default Expenses
