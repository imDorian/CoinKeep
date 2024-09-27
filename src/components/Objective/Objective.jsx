import './Objective.css'
import Article from '../Article/Article'
import { thisMonth } from '../List/List'
import { capitalizeFirstLetter } from '../SpendInput/SpendInput'
import { useState, useEffect } from 'react'
import { useStore } from '../../stores/useStore'

const Objective = () => {
  const [isWidget, setIsWidget] = useState(false)
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [newMonthGoal, setNewMonthGoal] = useState({
    monthGoal: '',
    startDate: new Date(startDate),
    endDate: new Date(endDate)
  })
  useEffect(() => {
    console.log(newMonthGoal)
  }, [newMonthGoal])
  const { monthGoal, currency } = useStore()
  const cookies = JSON.parse(window.localStorage.getItem('userdata'))
  const setMonthGoal = async (e) => {
    e.preventDefault()
    try {
      if (!isNaN(newMonthGoal.monthGoal) && newMonthGoal.monthGoal > 0 && newMonthGoal.monthGoal !== '') {
        console.log(newMonthGoal)
        const { res, json } = await putMonthGoal(monthGoal._id, newMonthGoal)
        console.log('resMonthGoal', json)
        if (res.status === 200) {
          useStore.setState({
            monthGoal: json
          })
          setNewMonthGoal({ ...newMonthGoal, monthGoal: '' })
        }
        setIsWidget(false)
      }
    } catch (error) {
      console.error(error)
    }
  }
  const putMonthGoal = async (id, data) => {
    const url = import.meta.env.VITE_URL + `/data/putmonthgoal/${id}`
    const res = await window.fetch(url, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const json = await res.json()
    return { res, json }
  }
  const postMonthGoal = async (e) => {
    const url = import.meta.env.VITE_URL + `/data/createmonthgoal/${cookies.user.data}`
    const res = await window.fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const json = await res.json()
    console.log(res, json)
  }

  useEffect(() => {
    // if ( )
    // Obtén la fecha de hoy en el formato 'yyyy-MM-dd'
    const start = new Date()
    const end = new Date()
    const yearStart = start.getFullYear()
    const yearEnd = start.getFullYear()
    let monthStart = start.getMonth() + 1
    let monthEnd = end.getMonth() + 2
    monthStart = monthStart < 10 ? `0${monthStart}` : monthStart // Agrega un cero al mes si es necesario
    monthEnd = monthEnd < 10 ? `0${monthEnd}` : monthEnd // Agrega un cero al mes si es necesario
    let dayStart = start.getDate()
    let dayEnd = end.getDate()
    dayStart = dayStart < 10 ? `0${dayStart}` : dayStart // Agrega un cero al día si es necesario
    dayEnd = dayEnd < 10 ? `0${dayEnd}` : dayEnd // Agrega un cero al día si es necesario

    const formattedDateStart = `${yearStart}-${monthStart}-${dayStart}`
    const formattedDateEnd = `${yearEnd}-${monthEnd}-${dayEnd}`
    console.log(formattedDateEnd, formattedDateStart)

    // Establece la fecha actual en el estado
    setStartDate(formattedDateStart)
    setEndDate(formattedDateEnd)
    // }
    // } else {
    //   const today = new Date()
    //   const year = today.getFullYear()
    //   let month = today.getMonth() + 1
    //   let monthEnd = today.getMonth() + 2
    //   month = month < 10 ? `0${month}` : month // Agrega un cero al mes si es necesario
    //   monthEnd = month < 10 ? `0${monthEnd}` : monthEnd // Agrega un cero al mes si es necesario
    //   let day = today.getDate()
    //   day = day < 10 ? `0${day}` : day // Agrega un cero al día si es necesario

    //   const formattedDateStart = `${year}-${month}-${day}`
    //   const formattedDateEnd = `${year}-${monthEnd}-${day}`

    //   // Establece la fecha actual en el estado
    //   setStartDate(formattedDateStart)
    //   setEndDate(formattedDateEnd)
    // }
  }, [])
  useEffect(() => {
    setNewMonthGoal({
      ...newMonthGoal,
      startDate: new Date(startDate),
      endDate: new Date(endDate)
    })
    console.log(newMonthGoal)
  }, [startDate, endDate])
  return (
    <Article width='100%'>
      <h2 style={{ marginBottom: '10px', color: 'whitesmoke' }}>Define tu ciclo</h2>
      {isWidget && <p style={{ fontSize: '14px', margin: 0, padding: 0, paddingBottom: '10px' }}>Ten en cuenta que este objetivo no te limita en ningún caso a gastar más de lo definido.</p>}
      <form style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
        <section style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          {isWidget && <input required style={{ border: 'none', borderRadius: '6px', textAlign: 'center', fontSize: '14px', width: '100%', height: '25px' }} placeholder={monthGoal.monthGoal + currency} name='inputMonthGoal' type='number' value={newMonthGoal.monthGoal} onChange={(e) => setNewMonthGoal({ ...newMonthGoal, monthGoal: e.target.valueAsNumber })} />}
          {isWidget &&
            <label htmlFor='startDate'>
              Inicio
              <input style={{ marginLeft: '3px', borderRadius: '3px', height: '26px', width: '98px', border: 'none' }} required type='date' value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            </label>}
          {isWidget &&
            <label htmlFor='endDate'>
              Final
              <input style={{ marginLeft: '3px', borderRadius: '3px', height: '26px', width: '98px', border: 'none' }} required type='date' value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            </label>}
        </section>
        <section style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
          {/* {!isWidget && <h3>Tu gasto esta definido en {monthGoal.monthGoal + currency}</h3>} */}
          {!isWidget && <h3>Tu ciclo empezó el día <br /> {new Date(monthGoal.startDate).toLocaleDateString()}<br /> y {new Date(monthGoal.endDate).toLocaleDateString() < new Date().toLocaleDateString() ? 'acabó' : 'acabará'} el día <br />{new Date(monthGoal.endDate).toLocaleDateString()}</h3>}
          {/* {!isWidget && <h3>Tu ciclo acabará el día {}</h3>} */}
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            {isWidget && <button onClick={(e) => setMonthGoal(e)}>Definir</button>}
            {!isWidget && new Date(monthGoal.endDate) > new Date() && <button style={{ fontWeight: '400', margin: '10px', padding: '5px', color: 'aquamarine', letterSpacing: '1px' }} onClick={() => setIsWidget(true)}>Redefinir</button>}
            {!isWidget && new Date(monthGoal.endDate) < new Date() && <button style={{ fontWeight: '400', margin: '10px', padding: '5px', color: 'aquamarine', letterSpacing: '1px' }} onClick={() => setIsWidget(true)}>Definir</button>}
            {isWidget && <button style={{ color: 'red' }} onClick={() => setIsWidget(false)}>Cancelar</button>}
          </div>
        </section>
      </form>

    </Article>
  )
}

export default Objective
