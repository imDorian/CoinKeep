import { create } from 'zustand'

export const useStore = create(set => ({
  name: '',
  email: '',
  imageUrl: '',
  currency: '€',
  income: [],
  expense: [],
  saving: [],
  investment: [],
  available_personal_spend: {},
  personal_spend: [],
  balance: {},
  balance_personal_spend: {},
  isBlur: false,
  dateSelected: new Date(),
  isModalDelete: false,
  selectedData: {},
  selectedPage: 'home',
  monthGoal: { monthGoal: 0, startDate: '', endDate: '' },
  setMonthGoalInStore: newMonthGoal =>
    set(state => ({
      monthGoal: newMonthGoal
    })),

  // Función fetchLogin mejorada
  fetchLogin: async formData => {
    const url = import.meta.env.VITE_URL + '/users/login'
    console.log(url)
    try {
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      // Verificar si la respuesta es exitosa
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`)
      }

      const json = await response.json()
      console.log(json)

      // Actualizar el estado de la store con los datos del usuario autenticado
      set({
        name: json.user.name,
        email: json.user.email,
        imageUrl:
          json.user.imageUrl ??
          'https://upload.wikimedia.org/wikipedia/commons/3/3c/Anuel_AA_in_2022.png'
      })

      return { response, json }
    } catch (error) {
      console.error('Error en el inicio de sesión:', error)
      return { error }
    }
  },

  fetchData: async dataId => {
    const urlData = import.meta.env.VITE_URL + `/data/get/${dataId}`
    try {
      const response = await fetch(urlData, { method: 'GET' })
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`)
      }
      const json = await response.json()
      set({
        income: json.income,
        expense: json.expense,
        saving: json.saving,
        investment: json.investment,
        available_personal_spend: json.available_personal_spend,
        personal_spend: json.personal_spend,
        balance: json.balance,
        balance_personal_spend: json.personal_balance,
        monthGoal: json.monthGoal
      })
      return { response, json }
    } catch (error) {
      console.error('Error al cargar los datos:', error)
    }
  }
}))
