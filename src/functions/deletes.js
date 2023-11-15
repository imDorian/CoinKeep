export const deletePersonalSpend = async (id) => {
  try {
    const url = import.meta.env.VITE_URL + `/data/deletepersonalspend/${id}`
    console.log('holaaa', url)
    const response = await window.fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const json = await response.json()
    return { response, json }
  } catch (error) {
    console.error(error)
  }
}
