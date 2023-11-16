/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'
import './WeekCalendar.css'
// import { isThisWeek } from '../../functions/timeController'
import { useStore } from '../../stores/useStore'
import { isThisWeek } from '../../functions/timeController'
import { diaryLimit } from '../../functions/limits'

const WeekCalendar = ({ currency }) => {
  const { personal_spend: personalSpend, available_personal_spend: availablePersonalSpend, isBlur } = useStore()
  const diaryLimitA = diaryLimit(availablePersonalSpend.card, availablePersonalSpend.cash, 30)
  const [dailySpend, setDailySpend] = useState({
    Mon: 0,
    Tue: 0,
    Wed: 0,
    Thu: 0,
    Fri: 0,
    Sat: 0,
    Sun: 0
  })
  const thisWeekSpend = personalSpend.filter(f => isThisWeek(f.createdAt))
  const getColorClass = (expense, index) => {
    const today = new Date().toLocaleDateString('en-En', { weekday: 'short' })
    const propertyNames = Object.getOwnPropertyNames(dailySpend)
    const day = propertyNames[index]

    if (day !== today) {
      // Verificar si el día es posterior al día actual
      const dayIndex = propertyNames.indexOf(day)
      const todayIndex = propertyNames.indexOf(today)

      if (dayIndex > todayIndex) {
        return 'grey' // Día posterior al día actual, mostrar en gris
      } else {
        return parseFloat(expense) <= parseFloat(diaryLimitA) ? 'green' : 'red'
      }
    } else {
      return 'today ' + (parseFloat(expense) <= parseFloat(diaryLimitA) ? 'green' : 'red')
    }
  }

  console.log(thisWeekSpend)

  const calculateDailySpend = () => {
    const updatedDailySpend = {
      Mon: 0,
      Tue: 0,
      Wed: 0,
      Thu: 0,
      Fri: 0,
      Sat: 0,
      Sun: 0
    }

    thisWeekSpend.forEach(expense => {
      const dayOfWeek = new Date(expense.createdAt).toLocaleDateString('en-En', { weekday: 'short' })
      updatedDailySpend[dayOfWeek] += parseFloat(expense.quantity)
      console.log(dayOfWeek)
    })
    setDailySpend(updatedDailySpend)
    console.log(updatedDailySpend)
  }
  useEffect(() => {
    calculateDailySpend()
  }, [personalSpend])

  return (
    <section className='week-calendar__container'>
      <h2>Objetivos</h2>
      <p>Consigue gastar menos de <span style={{ filter: isBlur ? 'blur(4px)' : '', transitionDuration: '300ms' }}>{diaryLimitA}{currency}</span> diario</p>
      <ul style={{ filter: isBlur ? 'blur(4px)' : '', transitionDuration: '300ms' }}>
        <li className={getColorClass(dailySpend.Mon, 0)}>L</li>
        <li className={getColorClass(dailySpend.Tue, 1)}>M</li>
        <li className={getColorClass(dailySpend.Wed, 2)}>X</li>
        <li className={getColorClass(dailySpend.Thu, 3)}>J</li>
        <li className={getColorClass(dailySpend.Fri, 4)}>V</li>
        <li className={getColorClass(dailySpend.Sat, 5)}>S</li>
        <li className={getColorClass(dailySpend.Sun, 6)}>D</li>
      </ul>
    </section>
  )
}

export default WeekCalendar
