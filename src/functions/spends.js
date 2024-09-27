// Función que valida si una fecha es válida
const isValidDate = d => d instanceof Date && !isNaN(d)

// Función que verifica si la fecha es hoy
export const isToday = d => {
  if (!isValidDate(d)) return false
  const fechaActual = new Date()
  return (
    d.getDate() === fechaActual.getDate() &&
    d.getMonth() === fechaActual.getMonth() &&
    d.getFullYear() === fechaActual.getFullYear()
  )
}

// Función que verifica si la fecha está dentro de esta semana
export const isThisWeek = d => {
  if (!isValidDate(d)) return false
  const today = new Date()
  const currentDay = today.getDay() // 0 es Domingo, 1 es Lunes, ..., 6 es Sábado

  // Ajustar el día actual al primer día de la semana (Lunes)
  const firstDayOfWeek = new Date(today)
  firstDayOfWeek.setDate(
    today.getDate() - (currentDay === 0 ? 6 : currentDay - 1)
  ) // Ajustar a lunes

  // Ajustar el día actual al último día de la semana (Domingo)
  const lastDayOfWeek = new Date(firstDayOfWeek)
  lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 6) // Último día (domingo)

  return d >= firstDayOfWeek && d <= lastDayOfWeek
}

// Función que verifica si la fecha está en el mes actual
export const isThisMonth = d => {
  if (!isValidDate(d)) return false
  const fechaActual = new Date()
  return (
    d.getMonth() === fechaActual.getMonth() &&
    d.getFullYear() === fechaActual.getFullYear()
  )
}

// Cálculo del gasto diario
export const diarySpend = data => {
  return data
    .filter(ex => isToday(new Date(ex.date))) // Convertir a Date y validar
    .reduce((total, da) => total + parseFloat(da.quantity), 0)
    .toFixed(2)
}

// Cálculo del gasto semanal
export const weekSpend = data => {
  return data
    .filter(ex => isThisWeek(new Date(ex.date))) // Convertir a Date y validar
    .reduce((total, da) => total + parseFloat(da.quantity), 0)
    .toFixed(2)
}

// Cálculo del gasto mensual
export const monthSpend = data => {
  return data
    .filter(ex => isThisMonth(new Date(ex.date))) // Convertir a Date y validar
    .reduce((total, da) => total + parseFloat(da.quantity), 0)
    .toFixed(2)
}

// Cálculo del gasto en un ciclo específico de fechas
export const cicleSpend = (data, startDate, endDate) => {
  const start = new Date(startDate).toLocaleDateString()
  const end = new Date(endDate).toLocaleDateString()

  const filteredData = data.filter(f => {
    const date = new Date(f.date).toLocaleDateString()
    return date >= start && date <= end
  })

  const totalSpend = filteredData
    .reduce((total, da) => total + parseFloat(da.quantity), 0)
    .toFixed(2)
  return totalSpend
}
