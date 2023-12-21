/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
import { create } from 'zustand'
import { METHOD } from '../components/SpendInput/SpendInput'

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
  fetchLogin: async (formData) => {
    const url = import.meta.env.VITE_URL + '/users/login'
    const response = await window.fetch(url, {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    // Nos devuelve una respuesta
    const json = await response.json()
    set({
      name: json.user.name,
      email: json.user.email,
      imageUrl: json.user.imageUrl ?? 'https://upload.wikimedia.org/wikipedia/commons/3/3c/Anuel_AA_in_2022.png'
    })
    return { response, json }
  },
  fetchData: async (dataId) => {
    const urlData = import.meta.env.VITE_URL + `/data/get/${dataId}`
    try {
      const response = await window.fetch(urlData, {
        method: 'GET'
      })
      const json = await response.json()
      console.log(json)
      set({
        income: json.income,
        expense: json.expense,
        saving: json.saving,
        investment: json.investment,
        available_personal_spend: json.available_personal_spend,
        personal_spend: json.personal_spend,
        balance: json.balance,
        balance_personal_spend: json.personal_balance
      })
      return { response, json }
    } catch (error) {
      console.error(error)
    }
  }
}))
