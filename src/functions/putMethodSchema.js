export const putMethodSchema = async (id, newData, category) => {
  const url = import.meta.env.VITE_URL + `/data/putmethodschema/${category}/${id}`
  const res = await window.fetch(url, {
    method: 'PUT',
    body: JSON.stringify(newData),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  const json = await res.json()

  return { res, json }
}
