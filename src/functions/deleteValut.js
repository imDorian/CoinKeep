export async function deleteValut (id) {
  try {
    const res = await window.fetch(
      import.meta.env.VITE_URL + `/data/deletevalut/${id}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )

    return { res }
  } catch (error) {
    console.error(error)
    return error
  }
}
