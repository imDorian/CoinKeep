import React from 'react'
import './IsModalUpdates.css'

const IsModalUpdates = () => {
  const handleCheckUpdates = () => {
    const checkUpdates = {
      updates: true
    }
    window.localStorage.setItem('updates', JSON.stringify(checkUpdates))
  }
  return (
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
