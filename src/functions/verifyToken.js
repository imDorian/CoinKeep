export const verifyToken = async () => {
  const url = import.meta.env.VITE_URL + '/data/istoken'
  const { token } = JSON.parse(window.localStorage.getItem('userdata'))
  const res = await window.fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return res
}
