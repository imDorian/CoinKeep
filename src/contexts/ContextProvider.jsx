// /* eslint-disable react-refresh/only-export-components */
// /* eslint-disable react/prop-types */
// import { createContext, useState } from 'react'
// import { TIPOS_INGRESOS } from '../categories/INCOME_TYPES'
// import { CATEGORIAS_INGRESOS } from '../categories/INCOME_CATEGORIES'
// import { CATEGORIAS_GASTOS } from '../categories/EXPENSES_CATEGORIES'
// import { TIPOS_GASTOS } from '../categories/EXPENSES_TYPES'
// import { CATEGORIAS_AHORROS } from '../categories/SAVING_CATEGORIES'
// import { TIPOS_AHORROS } from '../categories/SAVINGS_TYPES'

// export const userDataContext = createContext()

// const isToday = (d) => {
//   const fechaActual = new Date()
//   return (
//     d.getDate() === fechaActual.getDate() &&
//     d.getMonth() === fechaActual.getMonth() &&
//     d.getFullYear() === fechaActual.getFullYear()
//   )
// }

// const isThisWeek = (d) => {
//   const today = new Date()
//   const currentDay = today.getDay() // 0 es Domingo, 1 es Lunes, ..., 6 es Sábado

//   // Ajustar el día actual al primer día de la semana (Lunes)
//   const firstDayOfWeek = new Date(today)
//   firstDayOfWeek.setDate(today.getDate() - currentDay + (currentDay === 0 ? 1 : 0))

//   // Ajustar el día actual al último día de la semana (Domingo)
//   const lastDayOfWeek = new Date(firstDayOfWeek)
//   lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 7)

//   return d >= firstDayOfWeek && d <= lastDayOfWeek
// }
// const isThisMonth = (d) => {
//   const fechaActual = new Date()
//   return (
//     d.getMonth() === fechaActual.getMonth() &&
//     d.getFullYear() === fechaActual.getFullYear()
//   )
// }

// const UserDataProvider = ({ children }) => {
//   const date = new Date()
//   const lunes = new Date(2023, 8, 4)
//   const martes = new Date(2023, 8, 5)
//   const miercoles = new Date(2023, 8, 6)
//   const jueves = new Date(2023, 8, 7)
//   const viernes = new Date(2023, 8, 8)
//   const sabado = new Date(2023, 8, 9)
//   const domingo = new Date(2023, 8, 10)

//   const [userData, setUserData] = useState(
//     {
//       income: [
//         {
//           category: CATEGORIAS_INGRESOS[0],
//           quantity: 1200.30,
//           currency: '€',
//           id: 10,
//           date,
//           description: '',
//           type: TIPOS_INGRESOS[0]
//         },
//         {
//           category: CATEGORIAS_INGRESOS[0],
//           quantity: 1200.30,
//           currency: '€',
//           id: 9,
//           date,
//           description: '',
//           type: TIPOS_INGRESOS[0]
//         },
//         {
//           category: CATEGORIAS_INGRESOS[1],
//           quantity: 110.20,
//           currency: '€',
//           id: 8,
//           date,
//           description: '',
//           type: TIPOS_INGRESOS[1]
//         },
//         {
//           category: CATEGORIAS_INGRESOS[2],
//           quantity: 50,
//           currency: '€',
//           id: 7,
//           date,
//           description: '',
//           type: TIPOS_INGRESOS[2]
//         },
//         {
//           category: CATEGORIAS_INGRESOS[3],
//           quantity: 10,
//           currency: '€',
//           id: 6,
//           date,
//           description: '',
//           type: TIPOS_INGRESOS[3]
//         }
//       ],
//       expense: [
//         {
//           category: CATEGORIAS_GASTOS[0],
//           quantity: 1200.30,
//           currency: '€',
//           id: 5,
//           date,
//           description: '',
//           type: TIPOS_GASTOS[0]
//         }
//       ],
//       saving: [
//         {
//           category: CATEGORIAS_AHORROS[0],
//           quantity: 1200.30,
//           currency: '€',
//           id: 15,
//           date,
//           description: '',
//           type: TIPOS_AHORROS[0]
//         },
//         {
//           category: CATEGORIAS_AHORROS[1],
//           quantity: 1200.30,
//           currency: '€',
//           id: 14,
//           date,
//           description: '',
//           type: TIPOS_AHORROS[1]
//         },
//         {
//           category: CATEGORIAS_AHORROS[2],
//           quantity: 1200.30,
//           currency: '€',
//           id: 13,
//           date,
//           description: '',
//           type: TIPOS_AHORROS[2]
//         },
//         {
//           category: CATEGORIAS_AHORROS[3],
//           quantity: 1200.30,
//           currency: '€',
//           id: 12,
//           date,
//           description: '',
//           type: TIPOS_AHORROS[3]
//         },
//         {
//           category: CATEGORIAS_AHORROS[4],
//           quantity: 1200.30,
//           currency: '€',
//           id: 11,
//           date,
//           description: '',
//           type: TIPOS_AHORROS[4]
//         }
//       ],
//       investment: [
//       ],
//       available_to_personal_spend: 0,
//       personal_spend: [
//         {
//           category: CATEGORIAS_GASTOS[0],
//           quantity: 40,
//           currency: '€',
//           id: 41,
//           date: lunes,
//           description: '',
//           type: TIPOS_GASTOS[3]
//         }, {
//           category: CATEGORIAS_GASTOS[0],
//           quantity: 40,
//           currency: '€',
//           id: 6,
//           date: martes,
//           description: '',
//           type: TIPOS_GASTOS[3]
//         }, {
//           category: CATEGORIAS_GASTOS[0],
//           quantity: 40,
//           currency: '€',
//           id: 7,
//           date: miercoles,
//           description: '',
//           type: TIPOS_GASTOS[3]
//         }, {
//           category: CATEGORIAS_GASTOS[0],
//           quantity: 40,
//           currency: '€',
//           id: 8,
//           date: jueves,
//           description: '',
//           type: TIPOS_GASTOS[3]
//         }, {
//           category: CATEGORIAS_GASTOS[0],
//           quantity: 30,
//           currency: '€',
//           id: 9,
//           date: viernes,
//           description: '',
//           type: TIPOS_GASTOS[3]
//         }, {
//           category: CATEGORIAS_GASTOS[0],
//           quantity: 30,
//           currency: '€',
//           id: 10,
//           date: sabado,
//           description: '',
//           type: TIPOS_GASTOS[3]
//         }, {
//           category: CATEGORIAS_GASTOS[0],
//           quantity: 30,
//           currency: '€',
//           id: 11,
//           date: domingo,
//           description: '',
//           type: TIPOS_GASTOS[3]
//         }
//       ]
//     })
//   const [noTokenModal, setNoTokenModal] = useState(false)
//   const [selectedData, setSelectedData] = useState('')
//   const [isModalDelete, setIsModalDelete] = useState(false)
//   const [typeSelected, setTypeSelected] = useState('income')
//   const balance = (userData.income.reduce((total, d) => total + d.quantity, 0).toFixed(2) - userData.expense.reduce((total, d) => total + d.quantity, 0).toFixed(2) - parseFloat(userData.available_to_personal_spend).toFixed(2)).toFixed(2) - userData.saving.reduce((total, d) => total + d.quantity, 0).toFixed(2) - userData.investment.reduce((total, d) => total + d.quantity, 0).toFixed(2)

//   const diaryLimit = (userData.available_to_personal_spend / 30).toFixed(2)
//   const weekLimit = (userData.available_to_personal_spend / 4).toFixed(2)
//   const monthLimit = (userData.available_to_personal_spend).toFixed(2)

//   const diarySpend = userData.personal_spend.filter(ex => isToday(ex.date) && ex).reduce((total, da) => total + parseFloat(da.quantity), 0).toFixed(2)
//   const weekSpend = userData.personal_spend.filter(ex => isThisWeek(ex.date) && ex).reduce((total, da) => total + parseFloat(da.quantity), 0).toFixed(2)
//   const monthSpend = userData.personal_spend.filter(ex => isThisMonth(ex.date) && ex).reduce((total, da) => total + parseFloat(da.quantity), 0).toFixed(2)

//   const diaryLeftSpend = (diaryLimit - diarySpend).toFixed(2)
//   const weekLeftSpend = (weekLimit - weekSpend).toFixed(2)
//   const monthLeftSpend = (monthLimit - monthSpend).toFixed(2)

//   return (
//     <userDataContext.Provider value={{ date, noTokenModal, setNoTokenModal, isThisWeek, isToday, userData, setUserData, selectedData, setSelectedData, isModalDelete, setIsModalDelete, typeSelected, setTypeSelected, balance, diaryLimit, weekLimit, monthLimit, diarySpend, weekSpend, monthSpend, diaryLeftSpend, weekLeftSpend, monthLeftSpend }}>
//       {children}
//     </userDataContext.Provider>
//   )
// }

// export default UserDataProvider
