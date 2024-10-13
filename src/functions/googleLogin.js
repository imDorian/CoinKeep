export async function googleLogin (token) {
  try {
    const googleToken = token
    const url = import.meta.env.VITE_URL + '/data/auth/google'
    const res = await window.fetch(url, {
      method: 'POST',
      body: JSON.stringify({ token: googleToken }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const json = await res.json()
    console.log(json)
    return { res, json }
  } catch (error) {
    console.error(error)
  }
}
