import './Objective.css'
import Article from '../Article/Article'
import { useState, useEffect } from 'react'
import { useStore } from '../../stores/useStore'

const Objective = () => {
  const { monthGoal, setMonthGoalInStore } = useStore() // Extraemos el mes y la función para actualizar el store
  const [isWidget, setIsWidget] = useState(false)
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [newMonthGoal, setNewMonthGoal] = useState({
    monthGoal: '',
    startDate: '',
    endDate: ''
  })

  // Actualiza el estado de las fechas cada vez que cambian
  useEffect(() => {
    if (monthGoal.startDate && monthGoal.endDate && monthGoal > 0) {
      console.log('hi')
      setStartDate(new Date(monthGoal.startDate).toISOString().split('T')[0])
      setEndDate(new Date(monthGoal.endDate).toISOString().split('T')[0])
    }
  }, [monthGoal])

  // Función para fijar el nuevo objetivo mensual
  const handleSetMonthGoal = async e => {
    e.preventDefault()
    try {
      console.log('llegue--1')
      console.log(newMonthGoal)

      if (
        newMonthGoal.monthGoal > 0 &&
        newMonthGoal.startDate &&
        newMonthGoal.endDate
      ) {
        console.log('llegue--2')
        const updatedMonthGoal = {
          ...newMonthGoal,
          startDate: new Date(startDate).toISOString(),
          endDate: new Date(endDate).toISOString()
        }
        console.log(updatedMonthGoal)
        // Guardar en el store el nuevo objetivo
        setMonthGoalInStore(updatedMonthGoal)
        // Resetear el formulario
        setNewMonthGoal({ monthGoal: '', startDate: '', endDate: '' })
        setIsWidget(false)
      }
    } catch (error) {
      console.error('Error setting month goal:', error)
    }
  }

  return (
    <Article width='100%'>
      <h2 style={{ marginBottom: '10px', color: 'whitesmoke' }}>
        Define tu ciclo
      </h2>
      {isWidget && (
        <p style={{ fontSize: '14px', margin: 0, paddingBottom: '10px' }}>
          Ten en cuenta que este objetivo no te limita en ningún caso a gastar
          más de lo definido.
        </p>
      )}
      <form style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
        <section
          style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}
        >
          {isWidget && (
            <>
              <input
                required
                style={{
                  border: 'none',
                  borderRadius: '6px',
                  textAlign: 'center',
                  fontSize: '14px',
                  width: '100%',
                  height: '25px'
                }}
                placeholder={`Objetivo mensual actual: ${monthGoal.monthGoal}`}
                name='inputMonthGoal'
                type='number'
                value={newMonthGoal.monthGoal}
                onChange={e => {
                  setNewMonthGoal({
                    ...newMonthGoal,
                    monthGoal: e.target.valueAsNumber
                  })
                  console.log(newMonthGoal)
                }}
              />
              <label htmlFor='startDate'>
                Inicio
                <input
                  style={{
                    marginLeft: '3px',
                    borderRadius: '3px',
                    height: '26px',
                    width: '98px',
                    border: 'none'
                  }}
                  required
                  type='date'
                  value={newMonthGoal.startDate}
                  onChange={e => setStartDate(e.target.value)}
                />
              </label>
              <label htmlFor='endDate'>
                Final
                <input
                  style={{
                    marginLeft: '3px',
                    borderRadius: '3px',
                    height: '26px',
                    width: '98px',
                    border: 'none'
                  }}
                  required
                  type='date'
                  value={endDate}
                  onChange={e => setEndDate(e.target.value)}
                />
              </label>
            </>
          )}
        </section>
        <section
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column'
          }}
        >
          {!isWidget && monthGoal.startDate === Object && (
            <h3>
              Tu ciclo empezó el día <br />
              {new Date(monthGoal.startDate).toLocaleDateString()} <br />y{' '}
              {new Date(monthGoal.endDate) < new Date() ? 'acabó' : 'acabará'}{' '}
              el día <br />
              {new Date(monthGoal.endDate).toLocaleDateString()}
            </h3>
          )}
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            {isWidget && (
              <button onClick={e => handleSetMonthGoal(e)} type='submit'>
                Definir
              </button>
            )}
            {!isWidget && (
              <button
                style={{
                  fontWeight: '400',
                  margin: '10px',
                  padding: '5px',
                  color: 'aquamarine',
                  letterSpacing: '1px'
                }}
                onClick={() => setIsWidget(true)}
              >
                {new Date(monthGoal.endDate) > new Date()
                  ? 'Redefinir'
                  : 'Definir'}
              </button>
            )}
            {isWidget && (
              <button
                style={{ color: 'red' }}
                onClick={() => setIsWidget(false)}
              >
                Cancelar
              </button>
            )}
          </div>
        </section>
      </form>
    </Article>
  )
}

export default Objective
