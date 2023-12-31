export const putData = async (category, id, data) => {
  const url = import.meta.env.VITE_URL + `/data/put/${category}/${id}`
  const res = await window.fetch(url, {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  const json = await res.json()
  return { res, json }
}
