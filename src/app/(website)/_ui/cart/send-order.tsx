'use client'

import { SendIcon } from '@/components/icon/Send'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle
} from '@/components/ui/card'
import { toast } from '@/components/ui/use-toast'
import { useIsRender } from '@/hooks/useIsRender'
import {
  formatDate,
  formatPrice,
  getCartItemsTotal,
  getCartTotal
} from '@/lib/utils'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { CreateOderType, createOrders } from '../../_lib/api/order'
import { useCartStore } from '../../_lib/state/cart-state'

type Props = {}

const SendOrder = (props: Props) => {
  const router = useRouter()
  const { data: session } = useSession()
  const [loading, setLoading] = useState(false)
  const isRender = useIsRender()
  const cart = useCartStore(state => state.cart)
  const shopId = useCartStore(state => state.shopId)
  const clearCart = useCartStore(state => state.clearCart)

  let deliveryDates: (string | number | Date)[] = ['сейчас']
  cart.forEach(item => {
    if (!deliveryDates.includes(formatDate(item.dataDelivery)))
      deliveryDates.push(formatDate(item.dataDelivery))
  })

  let orders: CreateOderType[] = []

  deliveryDates.forEach(date => {
    const res = cart
      .filter(item => formatDate(item.dataDelivery) === date)
      .map(item => {
        return {
          ...item,
          priceCartItem:
            (item.priceCartItem *
              (100 - (session?.user?.personalDiscount ?? 0))) /
            100
        }
      })

    orders.push({
      total_amount: getCartItemsTotal(res),
      total_items: res.length,
      total_prise: getCartTotal(res),
      /* (getCartTotal(res) * (100 - (session?.user?.personalDiscount ?? 0))) /
        100, */
      cartItems: res,
      dateOrder: date.toString(),
      shopId: shopId
    })
  })

  const handleCreateOrder = async () => {
    if (!session?.user?.id) {
      toast({ title: 'Вы не авторизованы', variant: 'destructive' })
      return
    }
    try {
      setLoading(true)
      await createOrders({
        orders,
        userId: session?.user?.id
      })
      toast({
        title: 'Заказ создан',
        variant: 'success'
      })
      clearCart()

      router.refresh()
      setLoading(false)
    } catch (error) {
      console.log('error in createOrders', error)
      toast({
        title: 'Не удалось создать заказ',
        variant: 'destructive'
      })
    } finally {
      setLoading(false)
    }
  }

  const countItem = getCartItemsTotal(cart)
  const total = orders.reduce((acc, item) => acc + item.total_prise, 0)
  return (
    <Card className='w-full flex flex-col mt-2 gap-2 pt-4 mb-6'>
      {isRender && (
        <CardContent className=''>
          <CardTitle className='text-base w-full text-center'>
            В корзине
          </CardTitle>

          <div className='w-full flex text-sm justify-between items-center'>
            <p>Ваша персональная скидка:</p>
            <p>{session?.user?.personalDiscount}%</p>
          </div>

          {orders.map((order, index) => (
            <div key={index} className='w-full flex-col mb-4'>
              <CardDescription className='text-foreground capitalize'>
                {order.dateOrder}
              </CardDescription>
              <div className='w-full flex items-center justify-between'>
                <CardDescription>Наименований:</CardDescription>
                <CardDescription>{order.total_items}</CardDescription>
              </div>
              <div className='w-full flex items-center justify-between'>
                <CardDescription>Количество:</CardDescription>
                <CardDescription>{order.total_amount}</CardDescription>
              </div>
              <div className='w-full flex items-center justify-between'>
                <CardDescription>Цена:</CardDescription>
                <CardDescription>
                  {formatPrice(order.total_prise)}
                </CardDescription>
              </div>
            </div>
          ))}
        </CardContent>
      )}
      {isRender && (
        <CardFooter className='flex flex-col gap-2'>
          <Button
            disabled={
              loading || countItem === 0 || !shopId || !session?.user?.tin
            }
            onClick={() => handleCreateOrder()}
            className='w-full flex items-center justify-center gap-4'
          >
            <p className='text-sm '>На сумму: {formatPrice(total)}</p>
            <SendIcon className='h-6 w-6 fill-primary-foreground ' />
          </Button>
          {!shopId && (
            <p className='text-sm text-destructive text-center'>
              Выберите магазин!
            </p>
          )}
        </CardFooter>
      )}
    </Card>
  )
}

export default SendOrder
