'use client'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useCartStore } from '../../_lib/state/cart-state'
import CartItemComponent from './cart-item'

type Props = {
  inDrawer?: boolean
  children?: React.ReactNode
}
const CartList = ({ inDrawer, children }: Props = {}) => {
  const cart = useCartStore(state => state.cart).sort((a, b) => {
    if (a.dataDelivery < b.dataDelivery) return -1
    if (a.dataDelivery > b.dataDelivery) return 1
    return 0
  })
  const clear = useCartStore(state => state.clearCart)

  return (
    <div className='flex flex-col w-full gap-y-2'>
      <div className='flex flex-col w-full gap-y-2'>
        {cart.map(item => (
          <CartItemComponent key={item.id} item={item} inDrawer={inDrawer} />
        ))}
      </div>
      {cart.length > 0 && (
        <div className='flex  w-full items-center justify-center'>
          <Button
            variant={'outline'}
            className='w-full md:w-fit m-4 items-center justify-center'
            onClick={() => clear()}
          >
            Очистить корзину
          </Button>
        </div>
      )}
      {children}
      {cart.length === 0 && (
        <div className='flex flex-col w-full gap-y-4 my-4 container items-center justify-center'>
          <p className='w-full text-center text-xl font-semibold'>
            Корзина пуста
          </p>
          <Link href='/catalog' className='w-full '>
            <Button className='w-full'>Перейти в каталог</Button>
          </Link>
        </div>
      )}
    </div>
  )
}

export default CartList
