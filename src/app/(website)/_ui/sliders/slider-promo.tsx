'use client'
import MediaImage from '@/components/media=Image'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel'
import { Slider_promo } from '@prisma/client'

import Autoplay from 'embla-carousel-autoplay'
import Link from 'next/link'

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
          <CarouselItem key={slide?.id}>
            <div className='w-full aspect-square  relative bg-gradient-to-tl from-secondary to-background border rounded-2xl shadow-sm '>
              <MediaImage
                className='object-cover aspect-video'
                image={{ name: `Promo ${index + 1}`, url: slide.image ?? '' }}
              />

              <div className='absolute top-10 left-10 md:top-20 md:left-20 flex flex-col md:gap-2 font-sans'>
                <h2 className='italic text-xl md:text-5xl '>{slide?.title}</h2>
                <h4 className='text-base md:text-xl w-2/3 mb-2'>
                  {slide?.description}
                </h4>
                <Link
                  className='text-start text-sm md:text-base font-semibold underline'
                  href={slide?.url ?? ''}
                >
                  Подробнее...
                </Link>
              </div>
            </div>
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
