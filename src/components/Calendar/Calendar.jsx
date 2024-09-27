/* eslint-disable no-unmodified-loop-condition */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useMemo } from 'react'
import './Calendar.css'
import { isToday } from '../../functions/timeController'
import Article from '../Article/Article'
import { useStore } from '../../stores/useStore'

const Calendar = ({ startDate, endDate, expenses, limit }) => {
  const [dates, setDates] = useState([])
  const today = new Date()
  const daysOfCicle = (new Date(endDate) - new Date(startDate)) / 1000 / 60 / 60 / 24
  const diaryLimit = limit / daysOfCicle
  console.log(daysOfCicle, diaryLimit, limit)

  const forCalendar = () => {
    const start = new Date(startDate)
    const end = new Date(endDate)
    // Ajustar para comenzar desde el día de la semana de startDate
    const days = []
    start.setDate(start.getDate() - (start.getDay() === 0 ? 7 : start.getDay()) + 1) // Retroceder al primer día de la semana
    while (start <= end) {
      days.push(start.toISOString().split('T')[0])
      start.setDate(start.getDate() + 1)
    }
    setDates(days)
  }

  const forCalendarMemo = useMemo(() => forCalendar(), [startDate, endDate])

  const getColorClass = (date) => {
    const newDateValue = new Date(date).setDate(new Date(date).getDate() - 1)
    const newDate = new Date(date)
    const today = new Date()
    console.log(today)
    const start = new Date(startDate)
    const end = new Date(endDate)

    if (newDate > today || newDate > end) {
      return 'grey' // Día anterior al día actual, mostrar en gris
    }
    if (newDate >= start && newDate <= today) {
      const expensesForDate = expenses.filter(expense => new Date(expense.date).toLocaleDateString() === new Date(date).toLocaleDateString())
      console.log(expensesForDate)
      const totalExpense = expensesForDate.reduce((total, expense) => total + parseFloat(expense.quantity), 0)
      console.log(totalExpense, limit)
      if (totalExpense >= diaryLimit) {
        return 'red'
      } else {
        return 'green'
      }
    }
  }
  const chunkArray = (array, chunkSize) => {
    const result = []
    for (let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize))
    }
    return result
  }

  const chunkedDates = chunkArray(dates, 7)
  return (
    <Article width='100%'>
      <section style={{ width: '100%', height: '100%' }}>
        {/* <h2>Calendario</h2> */}
        <table style={{ width: '100%', tableLayout: 'fixed' }}>
          <thead>
            <tr>
              <th>L</th>
              <th>M</th>
              <th>X</th>
              <th>J</th>
              <th>V</th>
              <th>S</th>
              <th>D</th>
            </tr>
          </thead>
          <tbody>
            {chunkedDates.map((week, rowIndex) => (
              <tr key={rowIndex}>
                {week.map((date, colIndex) => (
                  <td className={getColorClass(date)} style={{ height: '25px', textAlign: 'center', borderRadius: '5000px', scale: isToday(date) ? '1' : '0.9', fontWeight: '500' }} key={colIndex}>
                    {new Date(date).getDate()}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </Article>
  )
}

export default Calendar
