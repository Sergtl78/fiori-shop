'use client'

import { useIsRender } from '@/hooks/useIsRender'
import { getCartItemsTotal } from '@/lib/utils'
import { ReactNode } from 'react'
import { useCartStore } from '../../_lib/state/cart-state'

type Props = {
  children?: ReactNode
}

const CartItemBadge = ({ children }: Props) => {
  const cart = useCartStore(state => state.cart)

  const countItem = cart.length
  const count = getCartItemsTotal(cart)
  const isRender = useIsRender()
  return (
    <>
      <div className='relative w-8 h-8'>
        {isRender && count > 0 && (
          <span className='absolute -top-4 -right-4 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-secondary-foreground bg-secondary transform rounded-full'>
            {countItem}
          </span>
        )}
        <> {children}</>
        {isRender && count > 0 && (
          <span className='absolute -bottom-5 left-1/2 -translate-x-1/2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-secondary-foreground bg-secondary transform rounded-full'>
            {count}
          </span>
        )}
      </div>
    </>
  )
}

export default CartItemBadge
