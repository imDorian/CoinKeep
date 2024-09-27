// Función que devuelve los días restantes del mes actual
export const getCurrentMonthDays = () => {
  const now = new Date()
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0) // Último día del mes
  return endOfMonth.getDate() - now.getDate() // Días restantes
}

export const isToday = d => {
  const fechaActual = new Date()
  return (
    d.getDate() === fechaActual.getDate() &&
    d.getMonth() === fechaActual.getMonth() &&
    d.getFullYear() === fechaActual.getFullYear()
  )
}

export const isThisWeek = d => {
  const today = new Date()
  const currentDay = today.getDay() // 0 es Domingo, 1 es Lunes, ..., 6 es Sábado

  // Ajustar el día actual al primer día de la semana (Lunes)
  const firstDayOfWeek = new Date(today)
  firstDayOfWeek.setDate(
    today.getDate() - currentDay + (currentDay === 0 ? 1 : 0)
  )

  // Ajustar el día actual al último día de la semana (Domingo)
  const lastDayOfWeek = new Date(firstDayOfWeek)
  lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 7)

  return d >= firstDayOfWeek && d <= lastDayOfWeek
}
export const isThisMonth = d => {
  const fechaActual = new Date()
  return (
    d.getMonth() === fechaActual.getMonth() &&
    d.getFullYear() === fechaActual.getFullYear()
  )
}
