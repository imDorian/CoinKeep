export const verifyToken = async () => {
  const url = 'http://localhost:3000/data/istoken'
  const { token } = JSON.parse(window.localStorage.getItem('userdata'))
  const res = await window.fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return res
}
