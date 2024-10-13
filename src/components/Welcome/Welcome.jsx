/* eslint-disable react/prop-types */
// import './Welcome.css'
import { useState, useEffect, useRef } from 'react'
import { useStore } from '../../stores/useStore'
import EyeSlashIcon from '../../icons/EyeSlashIcon'
import EyeIcon from '../../icons/EyeIcon'
import Input from '../Input/Input'
import IsBlurSpan from '../IsBlurSpan/IsBlurSpan'
import './Welcome.css'
import AddIcon from '../../icons/AddIcon'

const Welcome = () => {
  const contenedorRef = useRef(null)

  const [isExpanded, setIsExpanded] = useState(false)
  // const [page, setPage] = useState(pageSelected)
  // const [isTime, setIsTime] = useState(false)
  const {
    balance,
    balance_personal_spend: balancePersonalSpend,
    isBlur,
    currency
  } = useStore()
  const totalBalance =
    balance.card + balance.cash < 0.01
      ? (Number(balance.card) + Number(balance.cash)).toFixed(2)
      : (Number(balance.card) + Number(balance.cash)).toFixed(2)
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
          ? 'transition-all duration-300 h-auto bg-neutral-700 border border-transparent w-[90%]'
          : 'transition-all duration-300 h-11 bg-neutral-800 border-neutral-600 border w-[90%]'
      }
    >
      <div className='py-[3px] flex flex-row justify-between w-full items-center'>
        <button onClick={handleBlur}>
          {isBlur ? (
            <EyeSlashIcon color='white' size='21px' />
          ) : (
            <EyeIcon color='white' size='21px' />
          )}
        </button>

        <span className='text-sm font-normal text-[rgb(205,205,205)] flex flex-col items-center text-center w-full text-nowrap truncate'>
          Balance
          <IsBlurSpan className='truncate w-full text-xs font-normal text-neutral-200'>
            {totalBalance}
            {currency}
            {/* <IsNanLoading d={totalBalance} /> */}
          </IsBlurSpan>
        </span>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          title={isExpanded ? 'Expand Sidebar' : 'Collapse Sidebar'}
          className=''
        >
          <AddIcon
            className={
              !isExpanded
                ? 'text-[var(--brand-color)] transition-all'
                : 'rotate-45 transition-all'
            }
          />
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
