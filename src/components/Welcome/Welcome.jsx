/* eslint-disable react/prop-types */
// import './Welcome.css'
import { useState, useEffect, useRef } from 'react'
import { useStore } from '../../stores/useStore'
import EyeSlashIcon from '../../icons/EyeSlashIcon'
import EyeIcon from '../../icons/EyeIcon'
import Input from '../Input/Input'
import IsBlurSpan from '../IsBlurSpan/IsBlurSpan'
import './Welcome.css'

const Welcome = ({ username, currency, pageSelected }) => {
  const contenedorRef = useRef(null)

  const [isExpanded, setIsExpanded] = useState(false)
  // const [page, setPage] = useState(pageSelected)
  // const [isTime, setIsTime] = useState(false)
  const {
    balance,
    balance_personal_spend: balancePersonalSpend,
    isBlur
  } = useStore()
  const totalBalance =
    balance.card + balance.cash < 0.01
      ? (balance.card + balance.cash).toFixed(2)
      : (balance.card + balance.cash).toFixed(2)
  const totalBalancePersonalSpend =
    balancePersonalSpend.card + balancePersonalSpend.cash < 0.01
      ? (balancePersonalSpend.card + balancePersonalSpend.cash).toFixed(2)
      : (balancePersonalSpend.card + balancePersonalSpend.cash).toFixed(2)

  const handleBlur = () => {
    useStore.setState({
      isBlur: !isBlur
    })
  }
  // useEffect(() => {
  //   setTimeout(() => {
  //     // setIsCollapsed(true)
  //     setIsTime(true)
  //   }, 3000)
  // }, [])

  return (
    <header
      className={
        isExpanded
          ? 'transition-all duration-300 bg-neutral-700 h-auto'
          : 'bg-neutral-700 transition-all duration-300 h-11'
      }
    >
      <div className='rounded-full py-[3px] bg-neutral-700 grid grid-cols-[1fr_4fr_4fr_1fr] justify-items-center items-center justify-center w-full'>
        <button onClick={handleBlur}>
          {isBlur ? (
            <EyeSlashIcon color='white' size='21px' />
          ) : (
            <EyeIcon color='white' size='21px' />
          )}
        </button>

        <span className='text-sm font-normal text-[rgb(205,205,205)] flex flex-col items-center text-center w-full text-nowrap truncate'>
          Balance
          <IsBlurSpan className='truncate w-full text-xs font-normaal text-neutral-200'>
            {totalBalance}
            {/* <IsNanLoading d={totalBalance} /> */}
          </IsBlurSpan>
        </span>
        <span className='text-sm font-normal text-[rgb(205,205,205)] flex flex-col items-center text-center w-full text-nowrap truncate'>
          Balance Personal
          <IsBlurSpan className='truncate text-xs font-normal text-neutral-200 w-full'>
            {totalBalancePersonalSpend}
            {currency}
          </IsBlurSpan>
        </span>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          title={isExpanded ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          +
        </button>
      </div>
      <Input
        className={
          !isExpanded
            ? 'truncate transition-all duration-300'
            : 'truncate transition-all duration-300'
        }
        currency='€'
      />
    </header>
  )
}

export default Welcome
