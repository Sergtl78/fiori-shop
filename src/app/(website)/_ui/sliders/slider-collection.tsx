'use client'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel'

import Autoplay from 'embla-carousel-autoplay'
import { ResCollectionBySlug } from '../../_lib/api/collections'
import CardProduct from '../../catalog/_ui/card-product'

type Props = {
  data: ResCollectionBySlug
}

export function SliderCollection({ data }: Props) {
  return (
    <section className='w-full container mb-4 gap-6 '>
      <h2>{data?.name}</h2>
      <Carousel
        opts={{
          align: 'start',
          loop: true
        }}
        plugins={[
          Autoplay({
            delay: 4000
          })
        ]}
        className='w-full'
      >
        <CarouselContent>
          {data?.products.map((product, index) => (
            <CarouselItem key={index} className='md:basis-1/2 lg:basis-1/5'>
              {product && <CardProduct data={product} />}
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className='md:-left-12 -left-8 ' />
        <CarouselNext className='md:-right-12 -right-8' />
      </Carousel>
    </section>
  )
}
