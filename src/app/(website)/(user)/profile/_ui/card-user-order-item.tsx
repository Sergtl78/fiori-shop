import MediaImage from '@/components/media-Image'
import {
  Card,
  CardDescription,
  CardFooter,
  CardTitle
} from '@/components/ui/card'
import { formatPrice } from '@/lib/utils'
import Link from 'next/link'
import { ResUserOrders } from '../_lib/api/orders'

type Props = {
  data: ResUserOrders['order_items'][0]
}

const CardUserOrderItem = ({ data }: Props) => {
  return (
    <Card className='relative flex h-full w-full flex-col overflow-hidden rounded-xl border bg-card text-card-foreground shadow'>
      <Link href={`/products/${data.id}`}>
        {data.Product?.images[0] && (
          <MediaImage
            className='aspect-square hover:scale-105 '
            image={data.Product?.images[0]}
          />
        )}
      </Link>

      <CardTitle className='text-base px-4 truncate ... '>
        {data.Product?.name}
      </CardTitle>
      <div className='flex flex-row items-center justify-between px-4'>
        <CardDescription>уп.-</CardDescription>
        <CardDescription>{data.quantityProduct} шт</CardDescription>
      </div>
      <div className='flex flex-row items-center justify-between px-4'>
        <CardDescription>раст.-</CardDescription>
        <CardDescription>
          {data.quantityProduct * (data.Product?.min_quantity || 1)} шт
        </CardDescription>
      </div>
      <CardFooter className='flex flex-col gap-4 mt-auto pt-0 pb-2 '>
        <h4>{formatPrice(data.priceCartItem)}</h4>
      </CardFooter>
    </Card>
  )
}

export default CardUserOrderItem
