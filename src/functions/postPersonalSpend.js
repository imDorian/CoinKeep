export const postPersonalSpend = async (data) => {
  const url = import.meta.env.VITE_URL + '/data/createpersonalspend'
  const res = await window.fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  const json = await res.json()
  return { res, json }
}
