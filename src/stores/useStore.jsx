import { create } from 'zustand'

import { googleLogout } from '@react-oauth/google'
import { verifyToken } from '../functions/verifyToken'

export const useStore = create(set => ({
  name: '',
  email: '',
  imageUrl: '',
  currency: '€',
  username: '',
  income: [],
  expense: [],
  share: {},
  valutDetails: {},
  resolveDetails: {},
  groupDetails: {},
  balance: {},
  isBlur: false,
  dateSelected: new Date(),
  isModalDelete: false,
  isCreateValut: false,
  // isLoading: false,

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
        image: json.user?.image,
        username: json.user.username
      })

      return { response, json }
    } catch (error) {
      console.error('Error en el inicio de sesión:', error)
      return { error }
    }
  },

  fetchData: async dataId => {
    const token = await verifyToken()
    if (token.status === 200) {
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
          valut: json.valut,
          share: json.share
        })
        console.log(json)
        return { response, json }
      } catch (error) {
        googleLogout()
        window.localStorage.removeItem('userdata')
        console.error('Error al cargar los datos:', error)
      }
    } else {
      console.error('token no valido')
      googleLogout()
      window.localStorage.removeItem('userdata')
      console.error('Token inválido, vuelve a inciar sesión')
    }
  }
}))
