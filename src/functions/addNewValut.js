export async function addNewValut (dataId, data) {
  try {
    const res = await window.fetch(
      import.meta.env.VITE_URL + `/data/createvalut/${dataId}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ data })
      }
    )
    const json = res.json()

    return json
  } catch (error) {
    console.error(error)
    return error
  }
}

export async function addNewValutElement (id, valutElement) {
  try {
    const res = await window.fetch(
      import.meta.env.VITE_URL + `/data/addvalutelement/${id}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(valutElement)
      }
    )
    const json = await res.json()
    return { res, json }
  } catch (error) {
    console.error(error)
    return error
  }
}
