/* eslint-disable react/prop-types */
import { useStore } from '../stores/useStore'

const IsNanLoading = ({ d }) => {
  const { currency } = useStore()
  if (isNaN(d)) {
    return (
      <span>Cargando...</span>
    )
  } else {
    return (
      <span>{d + currency}</span>
    )
  }
}

export default IsNanLoading
