import MediaImage from '@/components/media-Image'
import { Slider_promo } from '@prisma/client'
import Link from 'next/link'

type Props = {
  slide: Slider_promo
}

const SliderPromoItem = ({ slide }: Props) => {
  return (
    <div className='w-full aspect-square  relative bg-gradient-to-tl from-secondary to-background border rounded-2xl shadow-sm overflow-hidden '>
      <MediaImage
        priority={true}
        className='object-cover aspect-video'
        image={{ name: slide?.title ?? 'no title', url: slide.image ?? '' }}
      />
      <div
        className='absolute w-full top-10 left-10 md:top-20 md:left-20 flex flex-col md:gap-2 font-sans rounded-2xl p-2'
        style={{ color: slide?.textColor }}
      >
        <h2 className=' text-xl md:text-4xl'>{slide?.title}</h2>
        <h4 className='text-base md:text-xl w-2/3 mb-2'>
          {slide?.description}
        </h4>
        <Link
          className='text-start text-sm font-semibold underline'
          href={slide?.url ?? ''}
        >
          Подробнее...
        </Link>
      </div>
    </div>
  )
}

export default SliderPromoItem
