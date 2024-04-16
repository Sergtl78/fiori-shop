import { ResProduct } from '@/lib/api/product'
import { formatDate, formatPrice } from '@/lib/utils'
import Link from 'next/link'
import MediaImage from '../MediaImage'
import { Badge } from '../ui/badge'
import ButtonAddCart from './ButtonAddCart'

type Props = {
  data: ResProduct
}

const CardProduct = ({ data }: Props) => {
  const product = data
  if (!product) return null
  /* const discount =
    product.attributes?.collections?.data.reduce(
      (acc, item) => (acc += item.attributes?.discount || 0),
      0
    ) ?? 0 */
  return (
    <div className='relative flex h-full w-full flex-col overflow-hidden rounded-xl border bg-card text-card-foreground shadow'>
      <Link href={`/products?productId=${product.id}`}>
        <MediaImage
          className='aspect-square hover:scale-105 '
          image={product.images[0]}
        />
      </Link>
      {/* <div className='absolute left-0 top-0 flex flex-col gap-2'>
        {product.attributes?.collections?.data.map((collection, ind) => (
          <MediaImage
            key={collection.attributes?.title ?? '' + ind}
            className='relative aspect-square h-10 w-10'
            image={collection.attributes?.icon?.data?.attributes}
          />
        ))}
      </div> */}

      <div className='flex h-full w-full flex-col items-center justify-between gap-2 px-4 py-2 '>
        <p className='text-lg'>{product.name}</p>
        <div className='flex w-full flex-row items-center justify-between'>
          <p className='text-xs'>h - {product.growth} cm</p>
          <Badge variant={'secondary'}>
            {/* {formatDate(product.delivery)} */}
            {formatDate(product.delivery)}
          </Badge>
        </div>
        <div className='flex w-full flex-row items-center justify-between'>
          <Badge variant={'tertiary'}>
            {'Осталось ' + product.quantity + ' шт.'}
          </Badge>
        </div>

        <div className='flex w-full flex-col'>
          {/* {discount > 0 && (
            <div className='flex w-full flex-row items-center justify-between'>
              <p className='line-through '>
                {getOldPrice({
                  price: product.attributes?.price ?? 0,
                  discount: discount
                })}
              </p>
              <i>{`— ${discount}%`}</i>
            </div>
          )} */}

          <div className='flex w-full flex-row items-center justify-between'>
            <h4>{formatPrice(product.price ?? 0)}</h4>
            <ButtonAddCart product={product} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardProduct
