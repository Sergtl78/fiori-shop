'use client'

import { SendIcon } from '@/components/icon/Send'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardTitle } from '@/components/ui/card'
import { useIsRender } from '@/hooks/useIsRender'
import { formatPrice, getCartItemsTotal, getCartTotal } from '@/lib/utils'
import { useCartStore } from '../../_lib/state/cart-state'

type Props = {}

const SendOrder = (props: Props) => {
  const isRender = useIsRender()
  const cart = useCartStore(state => state.cart)
  const countItem = getCartItemsTotal(cart)
  const count = cart.length
  const total = getCartTotal(cart)
  return (
    <Card className='w-full flex flex-col mt-2 gap-2 pt-4 mb-6'>
      {isRender && (
        <CardContent className=''>
          <CardTitle className='text-base w-full text-center'>
            В корзине
          </CardTitle>
          <CardContent className='text-sm text-muted-foreground'>
            <span>{count} Наименований</span>
          </CardContent>
          <CardContent className='text-sm text-muted-foreground'>
            <span>{countItem} Растений</span>
          </CardContent>
        </CardContent>
      )}
      {isRender && (
        <CardFooter className=''>
          <Button className='w-full flex items-center justify-center gap-4'>
            <p className='text-sm '>На сумму: {formatPrice(total)}</p>
            <SendIcon className='h-6 w-6 fill-primary-foreground ' />
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}

export default SendOrder
