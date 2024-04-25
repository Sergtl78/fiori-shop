import { ResProductBySlug } from '@/app/(website)/_lib/api/product'
import MediaImage from '@/components/media=Image'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import {
  discountCollections,
  formatDate,
  formatPrice,
  getOldPrice
} from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { ResCollections } from '../../_lib/api/collections'
import ButtonAddCart from '../../cart/_ui/button-add-cart'

type Props = {
  data: ResProductBySlug | ResCollections['products'][0]
}

const CardProduct = ({ data }: Props) => {
  const product = data
  if (!product) return null

  const discountRes = discountCollections(product.collections)
  return (
    <Card className='relative flex h-full w-full flex-col overflow-hidden rounded-xl border bg-card text-card-foreground shadow'>
      <Link href={`/products/${product.slug}`}>
        <MediaImage
          className='aspect-square hover:scale-105 '
          image={product.images[0]}
        />
        <div className='absolute left-0 top-0 flex flex-col gap-2  h-8 w-full'>
          {product.collections?.map((collection, ind) => (
            <Image
              src={collection?.icon ?? ''}
              alt={collection?.name}
              width={40}
              height={40}
              key={collection.name ?? '' + ind}
              className=' aspect-square h-8 w-8'
            />
          ))}
        </div>
      </Link>

      <CardHeader>
        <CardTitle className='text-base '>{product.name}</CardTitle>
        <CardDescription>h - {product.growth} cm</CardDescription>
        <CardDescription>
          <span> Доставка: </span> <span>{formatDate(product.delivery)}</span>
        </CardDescription>
        <CardDescription>
          {'Доступно ' +
            product.quantity +
            ' шт. (min' +
            product.min_quantity +
            ' шт.)'}
        </CardDescription>
      </CardHeader>
      <CardContent className='flex flex-col gap-2 '>
        {discountRes > 0 && (
          <div className='flex w-full text-sm text-muted-foreground flex-row items-center justify-between'>
            <p className='line-through text-sm'>
              {getOldPrice({
                price: product.price * product.min_quantity ?? 0,
                discount: discountRes
              })}
            </p>
            <i>{`— ${discountRes}%`}</i>
          </div>
        )}
      </CardContent>
      <CardFooter className='flex flex-row gap-4 mt-auto'>
        <h4>{formatPrice(product.price * product.min_quantity ?? 0)}</h4>
        <ButtonAddCart product={product} />
      </CardFooter>
    </Card>
  )
}

export default CardProduct
