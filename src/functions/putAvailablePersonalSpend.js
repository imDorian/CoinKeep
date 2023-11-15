export const putAvailablePersonalSpend = async (id, newData) => {
  const url = `http://localhost:3000/data/putavailablepersonalspend/${id}`
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
