'use client'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel'
import { Slider_promo } from '@prisma/client'

import Autoplay from 'embla-carousel-autoplay'
import SliderPromoItem from './slider-promo-item'

type Props = {
  data: Slider_promo[]
}

const SliderPromo = ({ data }: Props) => {
  return (
    <Carousel
      opts={{
        loop: true
      }}
      plugins={[
        Autoplay({
          delay: 5000
        })
      ]}
      className='w-full  container mb-4 '
    >
      <CarouselContent>
        {data.map((slide, index) => (
          <CarouselItem key={slide?.id + index}>
            <SliderPromoItem slide={slide} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious
        variant={'ghost'}
        className='border border-border left-6'
      />
      <CarouselNext
        variant={'ghost'}
        className='border border-border right-6'
      />
    </Carousel>
  )
}

export default SliderPromo
