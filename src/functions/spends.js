import { isThisMonth, isThisWeek, isToday } from './timeController'

export const diarySpend = (data) => {
  return data.filter(ex => isToday(ex.date) && ex).reduce((total, da) => total + parseFloat(da.quantity), 0).toFixed(2)
}
export const weekSpend = (data) => {
  return data.filter(ex => isThisWeek(ex.date) && ex).reduce((total, da) => total + parseFloat(da.quantity), 0).toFixed(2)
}
export const monthSpend = (data) => {
  return data.filter(ex => isThisMonth(ex.date) && ex).reduce((total, da) => total + parseFloat(da.quantity), 0).toFixed(2)
}
