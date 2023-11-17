import React, { useEffect, useState } from 'react'
import './IsModalUpdates.css'

const IsModalUpdates = () => {
  const [updates, setUpdates] = useState(JSON.parse(window.localStorage.getItem('updates')) ?? null)
  const checkUpdates = () => {
    if (updates === null || updates === undefined) {
      const newUpdates = { updates: false }
      window.localStorage.setItem('updates', JSON.stringify(newUpdates))
      setUpdates(newUpdates)
    }
  }
  useEffect(() => {
    checkUpdates()
  }, [])

  const handleCheckUpdates = () => {
    const newUpdates = {
      updates: true
    }
    window.localStorage.setItem('updates', JSON.stringify(newUpdates))
    setUpdates(newUpdates)
  }

  return (
    ((updates && updates.updates === false) || updates === null || updates === undefined) &&
      <section id='modal-updates'>
        <div>
          <h4>Actualizaciones 17/11/2023</h4>
          <button onClick={handleCheckUpdates}>¡Visto!</button>
        </div>
        <ul>
          <li>Blur mejorado</li>
          <li>Ahora el calendario semanal detecta los días restantes de la semana</li>
          <li>Ahora puedes añadir nuevo gasto personal con la fecha personalizada, cambiado la fecha de la lista de gasto diario</li>
        </ul>
      </section>
  )
}

export default IsModalUpdates
