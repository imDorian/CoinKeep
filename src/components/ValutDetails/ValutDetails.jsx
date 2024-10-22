/* eslint-disable multiline-ternary */
import React, { useEffect, useState } from 'react'
import { getValutData } from '../../functions/getValutData'
import QuitIcon from '../../icons/QuitIcon'
import { useStore } from '../../stores/useStore'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import { MODELS } from '../ValutWidget/ValutWidget'
import GoalWidget from '../GoalWidget/GoalWidget'
import ArrowDownRightIcon from '../../icons/ArrowDownRightIcon'
import { Method } from '../List/List'
import CreditCardIcon from '../../icons/CreditCardIcon'
import CashIcon from '../../icons/CashIcon'
import { useNavigate, useParams } from 'react-router-dom'

const ValutDetails = () => {
  const { valutDetails, isValutDetails } = useStore()
  const navigate = useNavigate()
  const { id } = useParams(':id')
  const {
    model,
    title,
    description,
    category,
    goal,
    accumulatedData,
    createdAt,
    currency
  } = valutDetails
  const [data, setData] = useState([])
  async function fetchDetails () {
    const { res, json } = await getValutData(id)

    if (res.status === 200) {
      setData(json.data)
      if (!model) {
        useStore.setState({
          valutDetails: json
        })
      }
    }
  }
  useEffect(() => {
    console.log(valutDetails)
  }, [valutDetails])
  useEffect(() => {
    try {
      if (id) {
        fetchDetails()
      }
    } catch (error) {
      navigate(-1)
    }
  }, [])

  function exitValutDetails () {
    if (isValutDetails) {
      useStore.setState({
        isValutDetails: false
      })
    }
    navigate(-1)
  }

  return (
    <div className='w-[100vw] h-[100vh] z-[99] bg-neutral-900 flex flex-col'>
      <button onClick={exitValutDetails} className='absolute top-5 right-5'>
        <QuitIcon className='size-6 text-neutral-200' />
      </button>
      <span className='absolute top-6 left-5 text-sm bg-neutral-300 rounded-full px-2 text-neutral-800'>
        Valut
      </span>
      <div className='p-5 flex flex-col gap-1 pt-12'>
        <span className='flex flex-row justify-center items-center gap-2'>
          <h1 className='font-semibold'>{title}</h1>
          <span>{category}</span>
        </span>
        <div>
          {model === MODELS.saving ? (
            <DotLottieReact
              className='size-[90px] absolute top-28 right-5 opacity-65'
              autoplay='true'
              //   segment={}
              src='/LottieAnimation/PigSaves.lottie'
              //   playOnHover='true'
              renderConfig={{ autoResize: 'true' }}
            />
          ) : model === MODELS.investment ? (
            <DotLottieReact
              className='size-[110px] absolute top-24 right-1 opacity-55'
              autoplay='true'
              src='/LottieAnimation/InvestMoney.lottie'
              //   playOnHover='true'
              renderConfig={{ autoResize: 'true' }}
            />
          ) : (
            ''
          )}
        </div>
        <div className='flex flex-col text-start py-5'>
          {/* <p>{description}</p> */}
          <p className='flex flex-col'>
            Creado
            <b>
              {new Date(createdAt).toLocaleDateString('es-Es', {
                day: '2-digit',
                month: 'long',
                year: 'numeric'
              })}
            </b>
          </p>
          <p className='flex flex-col'>
            Moneda <b>{currency}</b>
          </p>
          {description && (
            <div className='text-center flex flex-col'>
              <span className='text-lg font-medium'>Descripción</span>
              <p className='text-start'>{description}</p>
            </div>
          )}
        </div>
        <GoalWidget
          progressColor='aquamarine'
          bgColor='bg-neutral-800'
          progress={accumulatedData}
          goal={goal}
          currency={currency?.slice(0, 1)}
        />
        <ul className='bg-neutral-800 h-[400px] mt-3 rounded-3xl border border-neutral-700 p-2 flex flex-col divide-y divide-neutral-700'>
          {data?.map(element => {
            const { quantity, method, createdAt, currency } = element
            return (
              <li key={crypto.randomUUID()} className='py-2'>
                <div className='grid grid-cols-4 w-full justify-items-start items-center'>
                  <ArrowDownRightIcon className='size-5 bg-neutral-700 rounded-full p-2 text-green-300' />
                  <span>
                    {quantity}
                    {currency.slice(0, 1)}
                  </span>
                  <span>
                    {method === Method.card ? (
                      <CreditCardIcon />
                    ) : method === Method.cash ? (
                      <CashIcon />
                    ) : (
                      ''
                    )}
                  </span>
                  <span>
                    {new Date(createdAt).toLocaleDateString('es-Es', {
                      day: '2-digit',
                      month: 'short',
                      year: '2-digit'
                    })}
                  </span>
                </div>
              </li>
            )
          })}
          {data.length === 0 && (
            <span>Todavía no tienes ingresos en esta Valut</span>
          )}
        </ul>
      </div>
    </div>
  )
}

export default ValutDetails
