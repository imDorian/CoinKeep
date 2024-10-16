/* eslint-disable multiline-ternary */
/* eslint-disable react/prop-types */
import React from 'react'
import Article from '../Article/Article'
import { useStore } from '../../stores/useStore'
import IsBlurSpan from '../IsBlurSpan/IsBlurSpan'
import AddIcon from '../../icons/AddIcon'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'

const ValutWidget = ({
  title,
  category,
  description,
  model,
  goal,
  currency
}) => {
  const { focusWidget } = useStore()
  const MODELS = {
    saving: 'saving',
    investment: 'investment'
  }
  const MODELOS = {
    ahorro: 'Ahorro',
    inversión: 'Inversión'
  }
  console.log(model)

  return (
    <Article className='h-[150px]'>
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
            className='size-[80px] absolute top-[18%] left-1/2 transform -translate-x-1/2 opacity-65'
            autoplay='true'
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
              1200
              {currency}
            </IsBlurSpan>
          </div>
          <div className='items-start'>
            <h3 className=''>Objetivo</h3>

            <IsBlurSpan>
              {goal}
              {currency}
            </IsBlurSpan>
          </div>
        </div>
      )}
      {model && (
        <button
          style={{
            display: focusWidget === 'personalBalance' ? 'none' : 'inline'
          }}
          className='absolute bottom-4 right-4 opacity-85 text-neutral-400 rounded-full p-0
        m-0 tracking-wide font-medium'
        >
          <AddIcon className='size-6' />
        </button>
      )}

      {!model && (
        <button className='text-base text-neutral-400 text-center w-full p-0 m-0 flex items-end justify-center h-full '>
          Crear Valut
        </button>
      )}
    </Article>
  )
}

export default ValutWidget
