/* eslint-disable react/prop-types */
import List from '../List/List'
import Container from '../Container/Container'
import ModalDelete from '../ModalDelete/ModalDelete'
import Subtitle from '../Subtitle/Subtitle'
import { SAVINGS_TYPES, TIPOS_AHORROS } from '../../categories/SAVINGS_TYPES'
import { useStore } from '../../stores/useStore'

const Savings = ({ currency, editSwitch }) => {
  const saving = useStore(state => state.saving)
  return (
    <Container>
      <ModalDelete prop='saving' />
      <Subtitle currency={currency} data={saving} subtitle='Ahorros' />
      <List editSwitch={editSwitch} currency={currency} data={saving} types={TIPOS_AHORROS[0] || SAVINGS_TYPES[0]} title='Ahorro de emergencia' />
      <List editSwitch={editSwitch} currency={currency} data={saving} types={TIPOS_AHORROS[1] || SAVINGS_TYPES[1]} title='Ahorro para metas a corto plazo' />
      <List editSwitch={editSwitch} currency={currency} data={saving} types={TIPOS_AHORROS[2] || SAVINGS_TYPES[2]} title='Ahorro para metas a medio plazo ' />
      <List editSwitch={editSwitch} currency={currency} data={saving} types={TIPOS_AHORROS[3] || SAVINGS_TYPES[3]} title='Ahorro para la jubilación' />
      <List editSwitch={editSwitch} currency={currency} data={saving} types={TIPOS_AHORROS[4] || SAVINGS_TYPES[4]} title='Ahorro para la educación' />
      <List editSwitch={editSwitch} currency={currency} data={saving} types={TIPOS_AHORROS[5] || SAVINGS_TYPES[5]} title='Ahorro para inversiones' />
      <List editSwitch={editSwitch} currency={currency} data={saving} types={TIPOS_AHORROS[6] || SAVINGS_TYPES[6]} title='Ahorro para bienes raíces' />
      <List editSwitch={editSwitch} currency={currency} data={saving} types={TIPOS_AHORROS[7] || SAVINGS_TYPES[7]} title='Ahorro para la salud' />
      <List editSwitch={editSwitch} currency={currency} data={saving} types={TIPOS_AHORROS[8] || SAVINGS_TYPES[8]} title='Ahorro para ocio y entretenimiento' />
      <List editSwitch={editSwitch} currency={currency} data={saving} types={TIPOS_AHORROS[9] || SAVINGS_TYPES[9]} title='Ahorro para donaciones y obras benéficas' />
      <List editSwitch={editSwitch} currency={currency} data={saving} types={TIPOS_AHORROS[10] || SAVINGS_TYPES[10]} title='Ahorro diezmo (10%)' />
      <List editSwitch={editSwitch} currency={currency} data={saving} types={TIPOS_AHORROS[11] || SAVINGS_TYPES[11]} title='Ahorro para vacaciones' />
    </Container>
  )
}

export default Savings
