export const isToday = (d) => {
  const dataDate = new Date(d)
  const fechaActual = new Date()
  return (
    dataDate.getDate() === fechaActual.getDate() &&
    dataDate.getMonth() === fechaActual.getMonth() &&
    dataDate.getFullYear() === fechaActual.getFullYear()
  )
}

export const isThisWeek = (d) => {
  const dataDate = new Date(d)
  const today = new Date()
  const currentDay = today.getDay() // 0 es Domingo, 1 es Lunes, ..., 6 es Sábado

  // Ajustar el día actual al primer día de la semana (Lunes)
  const firstDayOfWeek = new Date(today)
  firstDayOfWeek.setDate(today.getDate() - currentDay + (currentDay === 0 ? -6 : 0))

  // Ajustar el día actual al último día de la semana (Domingo)
  const lastDayOfWeek = new Date(firstDayOfWeek)
  lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 6)

  return dataDate >= firstDayOfWeek && dataDate <= lastDayOfWeek
}
export const isThisMonth = (d) => {
  const fechaActual = new Date()
  const date = new Date(d)
  return (
    date.getMonth() === fechaActual.getMonth() &&
    date.getFullYear() === fechaActual.getFullYear()
  )
}
export const isThisNoMonth = (d) => {
  const fechaActual = new Date()
  const date = new Date(d)
  return (
    date.getMonth() !== fechaActual.getMonth()
  )
}
export const getCurrentMonthDays = () => {
  const currentDate = new Date()
  const year = currentDate.getFullYear()
  const month = currentDate.getMonth() + 1 // Los meses en JavaScript van de 0 a 11

  // Obtiene el último día del mes restando 1 milisegundo al primer día del siguiente mes
  const lastDayOfMonth = new Date(year, month, 0)

  return lastDayOfMonth.getDate()
}
