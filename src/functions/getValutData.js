export async function getValutData (id) {
  try {
    const res = await window.fetch(
      import.meta.env.VITE_URL + `/data/getvalut/${id}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    const json = await res.json()
    return { json, res }
  } catch (error) {
    console.error(error)
    return error
  }
}
