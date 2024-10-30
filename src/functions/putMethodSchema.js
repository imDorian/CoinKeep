export const putMethodSchema = async (id, newData, category) => {
  if (id && newData && category) {
    try {
      const url =
        import.meta.env.VITE_URL + `/data/putmethodschema/${category}/${id}`
      const res = await window.fetch(url, {
        method: 'PUT',
        body: JSON.stringify(newData),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      // Chequear si la respuesta fue exitosa
      if (!res.ok) {
        const errorMsg = `Error ${res.status}: ${res.statusText}`
        console.error('Error en la respuesta:', errorMsg)
        throw new Error(errorMsg)
      }

      const json = await res.json()
      return { res, json }
    } catch (error) {
      console.error('Error al hacer PUT:', error)
      return { res: null, json: null } // Retornar valores para manejar el error
    }
  }
}
