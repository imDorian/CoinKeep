/* eslint-disable react/prop-types */
import { MagicMotion } from 'react-magic-motion'
// import './Welcome.css'
import { useState, useEffect } from 'react'
import { useStore } from '../../stores/useStore'
import Balance from '../Balance/Balance'
import SpendInput from '../SpendInput/SpendInput'
import EyeSlashIcon from '../../icons/EyeSlashIcon'
import EyeIcon from '../../icons/EyeIcon'

const Welcome = ({ username, currency }) => {
  const [isCollapsed, setIsCollapsed] = useState(true)
  const [isTime, setIsTime] = useState(false)
  const { balance, balance_personal_spend: balancePersonalSpend, isBlur } = useStore()
  const totalBalance = (balance.card + balance.cash) < 0 ? (balance.card + balance.cash).toFixed(2) : '+' + (balance.card + balance.cash).toFixed(2)
  const totalBalancePersonalSpend = (balancePersonalSpend.card + balancePersonalSpend.cash) < 0 ? (balancePersonalSpend.card + balancePersonalSpend.cash).toFixed(2) : '+' + (balancePersonalSpend.card + balancePersonalSpend.cash).toFixed(2)

  const handleBlur = () => {
    useStore.setState({
      isBlur: !isBlur
    })
  }
  useEffect(() => {
    setTimeout(() => {
      // setIsCollapsed(true)
      setIsTime(true)
    }, 3000)
  }, [])

  return (
    <MagicMotion>
      <aside
        style={{
          backgroundColor: 'rgba(70, 70, 70)',
          padding: '3px 10px',
          margin: '1rem 0',
          borderRadius: '0.65rem',
          width: '90vw',
          height: isCollapsed ? '2.1rem' : '20rem',
          fontWeight: 'bold',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          overflow: 'hidden',
          position: 'fixed',
          top: '5px',
          zIndex: '99',
          boxShadow: '1px 4px 12px -7px #000'
        }}
      >
        <div
          style={{
            width: '100%',
            display: 'flex',
            // gap: '0.5rem',
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'center',
            paddingBottom: '3px'
          }}
        >
          {!isCollapsed && <h4 style={{ margin: 0 }}>{!isTime ? `Bienvenido a CoinKeep sr. ${username}` : 'Balance'}</h4>}

          <button
            style={{ cursor: 'pointer', padding: 0, border: 0 }}
            onClick={() => setIsCollapsed(!isCollapsed)}
            title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            <svg
              width='22'
              height='22'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M1 12.9999V10.9999H15.4853L12.2427 7.75724L13.6569 6.34303L19.3137 11.9999L13.6569 17.6567L12.2427 16.2425L15.4853 12.9999H1Z'
                fill='white'
              />
              <path
                d='M20.2877 6V18H22.2877V6H20.2877Z'
                fill='white'
              />
            </svg>
          </button>
          {isCollapsed
            ? (
              <header style={{ width: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 0 }}>
                <span style={{ fontSize: '13px', fontWeight: '400', gridTemplateColumns: '1fr 1fr' }}>Balance&nbsp; <span style={{ filter: isBlur ? 'blur(4px)' : '', transitionDuration: '300ms', color: totalBalance > 0 ? 'aquamarine' : 'red' }}>{totalBalance}{currency}</span></span>
                <span style={{ fontSize: '13px', fontWeight: '400', gridTemplateColumns: '1fr 1fr' }}>B. Personal&nbsp;<span style={{ filter: isBlur ? 'blur(4px)' : '', transitionDuration: '300ms', color: totalBalancePersonalSpend > 0 ? 'aquamarine' : 'red' }}>{totalBalancePersonalSpend}{currency}</span></span>
              </header>
              )
            : (
              <svg
                style={{ minWidth: '24px', minHeight: '24px' }}
                width='22'
                height='22'
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M22.2877 11.0001V13.0001H7.80237L11.045 16.2428L9.63079 17.657L3.97394 12.0001L9.63079 6.34326L11.045 7.75748L7.80236 11.0001H22.2877Z'
                  fill='currentColor'
                />
                <path d='M3 18V6H1V18H3Z' fill='currentColor' />
              </svg>
              )}
          <button onClick={handleBlur}>{isBlur ? <EyeSlashIcon color='white' size='21px' /> : <EyeIcon color='white' size='21px' />}</button>
        </div>

        <div>
          <Balance currency='€' />
          <SpendInput currency='€' />
        </div>
      </aside>
    </MagicMotion>
  )
}

export default Welcome
