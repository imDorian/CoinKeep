import React from 'react'

const GoalWidget = ({ progress, goal, currency, bgColor, progressColor }) => {
  const porcent = (100 * progress) / goal
  console.log(porcent)
  return (
    <div
      className={`${bgColor} rounded-2xl w-full py-3 flex flex-col items-center gap-2 border border-neutral-700`}
    >
      <span>
        {progress}
        {currency} de {goal}
        {currency}
      </span>
      <div className='w-[95%] bg-neutral-300 flex h-auto rounded-xl'>
        <div
          style={{
            width: `${porcent}%`,
            height: '5px',
            background: progressColor,
            borderRadius: '10px',
            transition: 'all ease-in-out',
            transitionDuration: '300ms'
          }}
        />
      </div>
    </div>
  )
}

export default GoalWidget
