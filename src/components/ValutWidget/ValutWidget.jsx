/* eslint-disable multiline-ternary */
/* eslint-disable react/prop-types */
import Article from '../Article/Article'
import { useStore } from '../../stores/useStore'
import IsBlurSpan from '../IsBlurSpan/IsBlurSpan'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import OpenIcon from '../../icons/OpenIcon'
import { useNavigate } from 'react-router-dom'

export const MODELS = {
  saving: 'saving',
  investment: 'investment'
}
const ValutWidget = ({
  title,
  category,
  description,
  model,
  goal,
  currency,
  id,
  accumulatedData,
  createdAt
}) => {
  const navigate = useNavigate()
  function handleCreateValut () {
    useStore.setState({
      isCreateValut: true
    })
  }

  function openValutDetails () {
    if (id) {
      useStore.setState({
        isValutDetails: true,
        valutDetails: {
          id,
          title,
          accumulatedData,
          model,
          description,
          category,
          goal,
          createdAt,
          currency
        }
      })
      navigate(`/valut/${id}`)
    }
  }

  return (
    <Article
      // style={{ position: 'absolute', top: '100px' }}
      key={id}
      className='h-[150px]'
    >
      {model && model === MODELS.saving ? (
        <DotLottieReact
          className='size-[60px] absolute top-11 right-7 opacity-65'
          autoplay='true'
          segment={[0, 30]}
          src='/LottieAnimation/PigSaves.lottie'
          //   playOnHover='true'
          renderConfig={{ autoResize: 'true' }}
        />
      ) : model && model === MODELS.investment ? (
        <DotLottieReact
          className='size-[60px] absolute top-11 right-7 opacity-55'
          autoplay='true'
          src='/LottieAnimation/InvestMoney.lottie'
          //   playOnHover='true'
          renderConfig={{ autoResize: 'true' }}
        />
      ) : (
        !model && (
          <DotLottieReact
            src='/LottieAnimation/ManMeditation.lottie'
            className='size-[100px] absolute top-[12%] left-1/2 transform -translate-x-1/2 opacity-65'
            autoplay='true'
            loop='true'
            onClick={handleCreateValut}
            // playOnHover='true'
            renderConfig={{ autoResize: 'true' }}
          />
        )
      )}

      <span
        className={`${
          model ? 'truncate' : ''
        } w-full flex items-center justify-center text-wrap`}
      >
        <h2 className={`${model ? 'truncate' : 'hidden'}`}>
          {title || 'Añade nueva Valut'}
        </h2>
        {model && (
          <span className='rounded-xl bg-neutral-400 text-xs px-1 font-medium text-neutral-800 text-center'>
            Valut
          </span>
        )}
      </span>

      {model && (
        <div className='flex flex-col'>
          <div className='items-start'>
            <h3 className=''>
              {model === MODELS.saving ? 'Ahorrado' : 'Invertido'}
            </h3>
            <IsBlurSpan>
              {accumulatedData}
              {currency.slice(0, 2)}
            </IsBlurSpan>
          </div>
          <div className='items-start'>
            <h3 className=''>Objetivo</h3>

            <IsBlurSpan>
              {goal}
              {currency.slice(0, 2)}
            </IsBlurSpan>
          </div>
        </div>
      )}
      {model && (
        <button
          onClick={openValutDetails}
          className='absolute bottom-4 right-4 opacity-85 text-neutral-400 rounded-full p-0
        m-0 tracking-wide font-medium'
        >
          <OpenIcon className='size-5 text-neutral-100 stroke-neutral-600' />
        </button>
      )}

      {!model && (
        <button
          onClick={handleCreateValut}
          className='text-base text-neutral-400 text-center w-full p-0 m-0 flex items-end justify-center h-full '
        >
          Crear Valut
        </button>
      )}
    </Article>
  )
}

export default ValutWidget
