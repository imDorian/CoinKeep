export const deletePersonalSpend = async (id) => {
  try {
    const url = import.meta.env.VITE_URL + `/data/deletepersonalspend/${id}`
    const response = await window.fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const json = await response.json()
    console.log(json)
    return { response, json }
  } catch (error) {
    console.error(error)
  }
}

export const deleteFinancial = async (id, model) => {
  try {
    const url = import.meta.env.VITE_URL + `/data/deletefinancial/${model}/${id}`
    const response = await window.fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const json = response.json()
    console.log(json)
    return { response, json }
  } catch (error) {
    console.error(error)
  }
}
