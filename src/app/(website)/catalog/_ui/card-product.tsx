import MediaImage from '@/components/media-Image'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { formatDate, formatPrice } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { ResCollections } from '../../_lib/api/collections'
import { ResProductBySlug } from '../../_lib/api/result-types'
import { getProductInfo } from '../../_lib/helpers/getProductInfo'
import ButtonAddCart from '../../_ui/cart/button-add-cart'

type Props = {
  data: ResProductBySlug | ResCollections['products'][0]
}

const CardProduct = ({ data }: Props) => {
  const product = data
  if (!product) return null

  const { currentPrice, oldPrice, deliveryNotNull, discountRes } =
    getProductInfo(product)
  return (
    <Card className='relative flex h-full w-full flex-col overflow-hidden rounded-xl border bg-card text-card-foreground shadow'>
      <Link href={`/products/${product.slug}`}>
        <MediaImage
          className='aspect-square hover:scale-105 '
          image={product.images[0]}
        />
        <div className='absolute left-0 top-0 flex flex-col gap-2  h-8 w-full'>
          {product.collections?.map(
            (collection, ind) =>
              collection?.icon && (
                <Image
                  src={collection?.icon}
                  alt={collection?.name}
                  width={40}
                  height={40}
                  key={collection.name ?? '' + ind}
                  className=' aspect-square h-10 w-10'
                />
              )
          )}
        </div>
      </Link>

      <CardHeader>
        <CardTitle className='text-base '>{product.name}</CardTitle>
        <div className='flex flex-row items-center justify-between'>
          <CardDescription>h - {product.growth} cm</CardDescription>
          <CardDescription>уп.- {product.min_quantity} шт</CardDescription>
        </div>{' '}
        <div className='flex flex-col w-full'>
          {product.quantity > 0 && (
            <div className='flex flex-row items-center justify-between'>
              <CardDescription>{'сейчас '}</CardDescription>
              <CardDescription>
                {Math.floor(product.quantity / product.min_quantity)} уп.
              </CardDescription>
              <CardDescription>
                по {formatPrice(product.price * product.min_quantity)}
              </CardDescription>
            </div>
          )}
          {deliveryNotNull.length > 0 && (
            <div className='flex flex-row items-center justify-between'>
              <CardDescription>
                {formatDate(deliveryNotNull[0].dateDelivery_item)}
              </CardDescription>
              <CardDescription>
                {Math.floor(deliveryNotNull[0].quantity / product.min_quantity)}{' '}
                уп.
              </CardDescription>
              <CardDescription>
                по{' '}
                {formatPrice(deliveryNotNull[0].price * product.min_quantity)}
              </CardDescription>
            </div>
          )}
          {deliveryNotNull.length > 1 && (
            <div className='flex flex-row items-center justify-between'>
              <CardDescription>
                {formatDate(deliveryNotNull[1].dateDelivery_item)}
              </CardDescription>
              <CardDescription>
                {Math.floor(deliveryNotNull[1].quantity / product.min_quantity)}{' '}
                уп.
              </CardDescription>
              <CardDescription>
                по{' '}
                {formatPrice(deliveryNotNull[1].price * product.min_quantity)}
              </CardDescription>
            </div>
          )}
          {deliveryNotNull.length <= 0 && product.quantity <= 0 && (
            <CardDescription>не доступно</CardDescription>
          )}
        </div>
      </CardHeader>
      <CardContent className='flex flex-col gap-2 '>
        {discountRes > 0 && (
          <div className='flex w-full text-sm text-muted-foreground flex-row items-center justify-between'>
            <p className='line-through text-sm'>{oldPrice}</p>
            <i>{`— ${discountRes}%`}</i>
          </div>
        )}
      </CardContent>
      <CardFooter className='flex flex-col gap-4 mt-auto '>
        <div className='flex flex-row w-full gap-4'>
          <h4>{currentPrice}</h4>
          <ButtonAddCart product={product} />
        </div>
      </CardFooter>
    </Card>
  )
}

export default CardProduct
