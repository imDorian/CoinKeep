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

  console.log(currentDay, 'currentDay')
  console.log(today.getDate(), 'todayGetDate')

  // Ajustar el día actual al primer día de la semana (Lunes)
  const firstDayOfWeek = new Date(today)
  firstDayOfWeek.setDate(today.getDate() - currentDay + (currentDay === 0 ? -6 : 0))
  console.log(firstDayOfWeek, 'firstDayWeek')

  // Ajustar el día actual al último día de la semana (Domingo)
  const lastDayOfWeek = new Date(firstDayOfWeek)
  lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 6)
  console.log(lastDayOfWeek, 'lastDayWeek')

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
