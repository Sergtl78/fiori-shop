'use client'

import { ResProductBySlug } from '@/app/(website)/_lib/api/product'
import MediaImage from '@/components/media=Image'
import { EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import React, { useCallback, useEffect, useState } from 'react'
import { Thumb } from './carousel-thumb'

type PropType = {
  slides: ResProductBySlug['images']
  options?: EmblaOptionsType
}

const CarouselProduct: React.FC<PropType> = props => {
  const { slides, options } = props
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel(options)
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: 'keepSnaps',
    dragFree: true
  })

  const onThumbClick = useCallback(
    (index: number) => {
      if (!emblaMainApi || !emblaThumbsApi) return
      emblaMainApi.scrollTo(index)
    },
    [emblaMainApi, emblaThumbsApi]
  )

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return
    setSelectedIndex(emblaMainApi.selectedScrollSnap())
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap())
  }, [emblaMainApi, emblaThumbsApi, setSelectedIndex])

  useEffect(() => {
    if (!emblaMainApi) return
    onSelect()
    emblaMainApi.on('select', onSelect)
    emblaMainApi.on('reInit', onSelect)
  }, [emblaMainApi, onSelect])

  return (
    <div className='embla w-full '>
      <div
        className='embla__viewport overflow-hidden rounded-xl mb-4'
        ref={emblaMainRef}
      >
        <div className='embla__container flex touch-pan-y space-x-2 flex-row h-auto'>
          {slides?.map((slide, index) => (
            <div
              className='embla__slide cursor-grab min-w-0 flex-grow-0 flex-shrink-0 relative w-full'
              key={slide.url}
            >
              <MediaImage
                className='embla__slide__img object-cover w-full max-h-lg  block aspect-square '
                image={slide}
              />
            </div>
          ))}
        </div>
      </div>

      <div className='embla-thumbs h-16 md:h-24 mb-4'>
        <div
          className='embla-thumbs__viewport overflow-hidden'
          ref={emblaThumbsRef}
        >
          <div className='embla-thumbs__container flex flex-row'>
            {slides?.map((slide, index) => (
              <Thumb
                onClick={() => onThumbClick(index)}
                selected={index === selectedIndex}
                index={index}
                imgSrc={slide.url || ''}
                key={index}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CarouselProduct