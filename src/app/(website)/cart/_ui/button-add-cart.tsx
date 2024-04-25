'use client'

import { ResProductBySlug } from '@/app/(website)/_lib/api/product'
import { AddCartIcon } from '@/components/icon/AddCart'
import { Button } from '@/components/ui/button'
import { useCartStore } from '../../_lib/state/cart-state'

type ButtonAddCartProps = {
  product: ResProductBySlug
}

export default function ButtonAddCart({ product }: ButtonAddCartProps) {
  const addCart = useCartStore(state => state.addFromCart)
  return (
    <div className='w-full'>
      <Button
        variant='default'
        className='hover:scale-105 gap-2 w-full'
        onClick={() => addCart(product, 1)}
      >
        <AddCartIcon className='h-6 w-6 fill-primary-foreground ' />
        <span> + 1x{product.min_quantity} шт.</span>
      </Button>
    </div>
  )
}
