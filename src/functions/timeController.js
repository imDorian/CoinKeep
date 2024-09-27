// Función que devuelve los días restantes del mes actual
export const getCurrentMonthDays = () => {
  const now = new Date()
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0) // Último día del mes
  return endOfMonth.getDate() - now.getDate() // Días restantes
}

// Verifica si el parámetro es un objeto Date válido
const isValidDate = d => d instanceof Date && !isNaN(d)

// Función que verifica si la fecha es hoy
export const isToday = d => {
  if (!isValidDate(d)) return false // Validar si d es un Date válido

  const fechaActual = new Date()
  return (
    d.getDate() === fechaActual.getDate() &&
    d.getMonth() === fechaActual.getMonth() &&
    d.getFullYear() === fechaActual.getFullYear()
  )
}

// Función que verifica si la fecha está dentro de esta semana
export const isThisWeek = d => {
  if (!isValidDate(d)) return false // Validar si d es un Date válido

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
  if (!isValidDate(d)) return false // Validar si d es un Date válido

  const fechaActual = new Date()
  return (
    d.getMonth() === fechaActual.getMonth() &&
    d.getFullYear() === fechaActual.getFullYear()
  )
}
