const isToday = (d) => {
  const fechaActual = new Date()
  return (
    d.getDate() === fechaActual.getDate() &&
    d.getMonth() === fechaActual.getMonth() &&
    d.getFullYear() === fechaActual.getFullYear()
  )
}

export const isThisWeek = (d) => {
  const today = new Date()
  const currentDay = today.getDay() // 0 es Domingo, 1 es Lunes, ..., 6 es Sábado

  // Ajustar el día actual al primer día de la semana (Lunes)
  const firstDayOfWeek = new Date(today)
  firstDayOfWeek.setDate(today.getDate() - currentDay + (currentDay === 0 ? 1 : 0))

  // Ajustar el día actual al último día de la semana (Domingo)
  const lastDayOfWeek = new Date(firstDayOfWeek)
  lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 7)

  return d >= firstDayOfWeek && d <= lastDayOfWeek
}
export const isThisMonth = (d) => {
  const fechaActual = new Date()
  return (
    d.getMonth() === fechaActual.getMonth() &&
    d.getFullYear() === fechaActual.getFullYear()
  )
}
export const diarySpend = (data) => {
  return data.filter(ex => isToday(ex.date) && ex).reduce((total, da) => total + parseFloat(da.quantity), 0).toFixed(2)
}
export const weekSpend = (data) => {
  return data.filter(ex => isThisWeek(ex.date) && ex).reduce((total, da) => total + parseFloat(da.quantity), 0).toFixed(2)
}
export const monthSpend = (data) => {
  return data.filter(ex => isThisMonth(ex.date) && ex).reduce((total, da) => total + parseFloat(da.quantity), 0).toFixed(2)
}
export const cicleSpend = (data, startDate, endDate) => {
  const filteredData = data.filter(f => new Date(f.date).toLocaleDateString() >= new Date(startDate).toLocaleDateString() && new Date(f.date).toLocaleDateString() <= new Date(endDate).toLocaleDateString())

  const totalSpend = filteredData.reduce((total, da) => total + parseFloat(da.quantity), 0).toFixed(2)
  return totalSpend
}
