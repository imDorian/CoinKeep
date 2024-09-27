/* eslint-disable react/prop-types */
import { MagicMotion } from 'react-magic-motion'
// import './Welcome.css'
import { useState, useEffect, useRef } from 'react'
import { useStore } from '../../stores/useStore'
import EyeSlashIcon from '../../icons/EyeSlashIcon'
import EyeIcon from '../../icons/EyeIcon'
import Grid from '../Grid/Grid'
import Input from '../Input/Input'
import PersonalBalanceWidget from '../PersonalBalanceWidget/PersonalBalanceWidget'
import BalanceWidget from '../BalanceWidget/BalanceWidget'
import IsNanLoading from '../../functions/IsNanLoading'

const Welcome = ({ username, currency, pageSelected }) => {
  const contenedorRef = useRef(null)

  useEffect(() => {
    // Define el índice de la página en la que quieres que comience el desplazamiento
    const paginaInicial = pageSelected // Puedes cambiar esto según tus necesidades

    // Calcula el ancho de cada página en el contenedor
    const anchoPagina = contenedorRef.current.scrollWidth / 2

    // Establece el desplazamiento inicial
    contenedorRef.current.scrollLeft = anchoPagina * paginaInicial
  }, [])
  const [isCollapsed, setIsCollapsed] = useState(true)
  // const [page, setPage] = useState(pageSelected)
  // const [isTime, setIsTime] = useState(false)
  const { balance, balance_personal_spend: balancePersonalSpend, isBlur } = useStore()
  const totalBalance = (balance.card + balance.cash) < 0.01 ? (balance.card + balance.cash).toFixed(2) : '+' + (balance.card + balance.cash).toFixed(2)
  const totalBalancePersonalSpend = (balancePersonalSpend.card + balancePersonalSpend.cash) < 0.01 ? (balancePersonalSpend.card + balancePersonalSpend.cash).toFixed(2) : '+' + (balancePersonalSpend.card + balancePersonalSpend.cash).toFixed(2)

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
    <MagicMotion>
      <aside
        style={{
          backgroundColor: 'rgba(70, 70, 70)',
          padding: '3px 10px',
          margin: '1rem 0',
          borderRadius: '25px',
          width: '90vw',
          height: isCollapsed ? '2.1rem' : '',
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
          <button onClick={handleBlur}>{isBlur ? <EyeSlashIcon color='white' size='21px' /> : <EyeIcon color='white' size='21px' />}</button>
          <header style={{ width: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 0 }}>
            <span style={{ fontSize: '13px', fontWeight: '400', gridTemplateColumns: '1fr 1fr' }}>Balance&nbsp; <span style={{ filter: isBlur ? 'blur(4px)' : '', transitionDuration: '300ms', color: totalBalance >= 0 ? 'aquamarine' : 'red' }}> <IsNanLoading d={totalBalance} /></span></span>
            <span style={{ fontSize: '13px', fontWeight: '400', gridTemplateColumns: '1fr 1fr' }}>B. Personal&nbsp;<span style={{ filter: isBlur ? 'blur(4px)' : '', transitionDuration: '300ms', color: totalBalancePersonalSpend >= 0 ? 'aquamarine' : 'red' }}><IsNanLoading d={totalBalancePersonalSpend} /></span></span>
          </header>
          <button
            style={{ cursor: 'pointer', padding: 0, border: 0, rotate: isCollapsed ? '' : '90deg', animation: '500ms' }}
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
        </div>
        <ul ref={contenedorRef} style={{ margin: 0, padding: 0, overflowX: 'auto', overflowY: 'hidden', scrollSnapType: 'x mandatory', display: 'flex', width: '100%', listStyle: 'none' }}>
          {/* <li style={{ scrollSnapAlign: 'center' }}>
            <Grid width='90vw'>
              <Balance currency='€' />
              <BalanceWidget />
              <PersonalBalanceWidget />
            </Grid>
            <SpendInput currency='€' />
          </li>
          <li style={{ scrollSnapAlign: 'center' }}> */}
          <Input currency='€' />
          {/* </li> */}

        </ul>
      </aside>
    </MagicMotion>
  )
}

export default Welcome
