import { redirect } from 'react-router-dom'
import { create } from 'zustand'

import { googleLogout } from '@react-oauth/google'

export const useStore = create(set => ({
  name: '',
  email: '',
  imageUrl: '',
  currency: '€',
  income: [],
  expense: [],
  isValutDetails: false,
  valutDetails: {},
  balance: {},
  isBlur: false,
  dateSelected: new Date(),
  isModalDelete: false,
  isCreateValut: false,

  fetchLogin: async formData => {
    const url = import.meta.env.VITE_URL + '/users/login'
    try {
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`)
      }

      const json = await response.json()

      set({
        name: json.user.name,
        email: json.user.email,
        image: json.user?.image
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
      const response = await window.fetch(urlData, { method: 'GET' })
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`)
      }
      const json = await response.json()
      set({
        income: json.income,
        expense: json.expense,
        balance: json.balance,
        valut: json.valut
      })
      return { response, json }
    } catch (error) {
      googleLogout()
      window.localStorage.removeItem('userdata')
      redirect('/', 404)
      console.error('Error al cargar los datos:', error)
    }
  }
}))
