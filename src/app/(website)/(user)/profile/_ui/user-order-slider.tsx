'use client'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel'

import { translateStatus } from '@/app/(admin)/_lib/helpers/translate-status'
import { formatDate, formatOrderNumber, formatPrice } from '@/lib/utils'
import { ResUserOrders } from '../_lib/api/orders'
import CardUserOrderItem from './card-user-order-item'

type Props = {
  data: ResUserOrders
}

const UserOrderSlider = ({ data }: Props) => {
  return (
    <section className='flex flex-col container mb-4 gap-4 '>
      <div className='flex flex-col '>
        <p>Статус: {translateStatus(data.status)}</p>
        <p>
          Номер заказа: {formatOrderNumber(data?.number_order)} от{' '}
          {formatDate(data.createdAt)}
        </p>
        <p>
          Наименований {data.total_items} товаров {data.total_amount}шт. на{' '}
          {formatPrice(data?.total_prise)}
        </p>
      </div>
      <Carousel
        opts={{
          align: 'start',
          loop: true
        }}
        className='w-ful '
      >
        <CarouselContent>
          {data?.order_items.map((product, index) => (
            <CarouselItem
              key={index}
              className='basis-1/2 md:basis-1/2 lg:basis-1/5'
            >
              {product && <CardUserOrderItem data={product} />}
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className='md:-left-8 -left-8 ' />
        <CarouselNext className='md:-right-8 -right-8' />
      </Carousel>
    </section>
  )
}

export default UserOrderSlider
