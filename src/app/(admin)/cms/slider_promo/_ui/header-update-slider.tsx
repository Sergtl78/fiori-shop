'use client'
import SliderPromoItem from '@/app/(website)/_ui/sliders/slider-promo-item'
import { Button } from '@/components/ui/button'
import { Slider_promo } from '@prisma/client'
import { Pencil2Icon } from '@radix-ui/react-icons'
import { useState } from 'react'
import { SlideUpdateForm } from './form-slider-update'

type Props = {
  data: Slider_promo
}

const HeaderUpdateSlider = ({ data }: Props) => {
  const [isShow, setIsShow] = useState(true)
  return (
    <div className='flex flex-col items-start gap-4'>
      {isShow ? (
        <div className='relative flex w-full items-center gap-4 max-w-lg'>
          <SliderPromoItem slide={data} />
          <Button
            className='absolute top-0 right-0'
            onClick={() => setIsShow(!isShow)}
            variant={'ghost'}
            size={'icon'}
          >
            <Pencil2Icon className='w-6 h-6' />
          </Button>
        </div>
      ) : (
        <SlideUpdateForm setIsShow={setIsShow} data={data} />
      )}
    </div>
  )
}

export default HeaderUpdateSlider
