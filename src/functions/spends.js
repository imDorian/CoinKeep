import { isThisMonth, isThisWeek, isToday } from './timeController'

export const diarySpend = (data) => {
  return data.filter(ex => isToday(ex.createdAt) && ex).reduce((total, da) => total + parseFloat(da.quantity), 0).toFixed(2)
}
export const weekSpend = (data) => {
  return data.filter(ex => isThisWeek(ex.createdAt) && ex).reduce((total, da) => total + parseFloat(da.quantity), 0).toFixed(2)
}
export const monthSpend = (data) => {
  return data.filter(ex => isThisMonth(ex.createdAt) && ex).reduce((total, da) => total + parseFloat(da.quantity), 0).toFixed(2)
}
