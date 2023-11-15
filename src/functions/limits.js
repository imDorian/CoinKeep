export const diaryLimit = (card, cash, monthDays) => {
  return ((card + cash) / monthDays).toFixed(2)
}
export const weekLimit = (card, cash) => {
  return ((card + cash / 4)).toFixed(2)
}
export const monthLimit = (card, cash) => {
  return ((card + cash)).toFixed(2)
}
