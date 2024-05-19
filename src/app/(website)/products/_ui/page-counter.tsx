'use client'
import { AddCartIcon } from '@/components/icon/AddCart'
import { Button } from '@/components/ui/button'
import { discountCollections } from '@/lib/utils'
import { useState } from 'react'
import { ResProductBySlug } from '../../_lib/api/result-types'
import { useCartStore } from '../../_lib/state/cart-state'

type Props = {
  product: ResProductBySlug
  availabilityId?: string
}

const ProductPageCounter = ({ product }: Props) => {
  const [count, setCount] = useState(1)
  const addFromCart = useCartStore(state => state.addFromCart)
  const discount = discountCollections(product.collections)
  const maxProductCount = Math.floor(
    product.quantity / product.min_quantity +
      product.delivery_items.reduce(
        (acc, item) => (acc += item.quantity / product.min_quantity),
        0
      )
  )
  return (
    <div className='flex flex-col md:flex-row w-full max-w-lg justify-between items-end my-4 gap-4'>
      <div className='flex flex-row w-full items-end justify-around'>
        <div className='flex  mr-4  items-end justify-between '>
          <Button
            onClick={() => setCount(prev => prev - 1)}
            disabled={count <= 1}
            variant={'ghost'}
            size={'sm'}
          >
            <b className='text-xl'>—</b>
          </Button>
          <div className='flex flex-row  gap-3 items-center h-full text-center font-semibold px-2 '>
            <span className='text-2xl'>{count}</span>
            <span>уп. по</span>
            <span className='text-2xl'>{product.min_quantity}</span>
            <span>шт.</span>
          </div>

          <Button
            disabled={count >= maxProductCount}
            onClick={() => setCount(prev => prev + 1)}
            variant={'ghost'}
            size={'sm'}
          >
            <b className='text-xl'>+</b>
          </Button>
        </div>
        {/*  <div className='flex flex-col '>
          {discount > 0 && (
            <div className='flex flex-row w-full items-center justify-between gap-3'>
              <span className='line-through text-sm text-muted-foreground  '>
                {getOldPrice({
                  price: product.price * product.min_quantity * count ?? 0,
                  discount: discount
                })}
              </span>
              <span className='text-sm text-muted-foreground'>{`— ${discount}%`}</span>
            </div>
          )}
          <div className='flex flex-row items-center gap-x-4 w-full'>
            <p className='text-2xl font-semibold'>
              {formatPrice(product.price * count * product.min_quantity)}
            </p>
          </div>
        </div> */}
      </div>
      <Button
        variant='default'
        className='hover:scale-105 gap-2 w-full md:w-fit'
        onClick={() => addFromCart(product, count)}
      >
        <AddCartIcon className='h-6 w-6 fill-primary-foreground ' />
        <span>
          + {count} x {count * product.min_quantity} шт.
        </span>
      </Button>
    </div>
  )
}

export default ProductPageCounter
