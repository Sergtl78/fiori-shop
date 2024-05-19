'use client'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { toast } from '@/components/ui/use-toast'
import { cn, formatOrderNumber, formatPrice } from '@/lib/utils'
import { Status } from '@prisma/client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { addPre_orderStatusCancelled } from '../../_lib/api/pre_orders'
import { colorBackgroundStatus, colorStatus } from '../_lib/helpers'
import { OrderState, usePre_orderStore } from '../_lib/store'
import { CancelIcon } from './cancel'

type Props = {
  status: Status
  order: OrderState
}

const OrderCard = ({ status, order }: Props) => {
  const dragOrder = usePre_orderStore(state => state.dragOrder)
  const removeOrder = usePre_orderStore(state => state.removeOrder)
  const router = useRouter()
  const handleAddStatusCanceled = async () => {
    try {
      removeOrder(order.id)
      await addPre_orderStatusCancelled(order.id)
      toast({ title: 'Заказ отменен', variant: 'success' })
      router.refresh()
    } catch (error) {
      console.log('addPre_orderStatusCancelled error', error)
      toast({ title: 'Что то пошло не так', variant: 'destructive' })
    }
  }
  return (
    <Card
      className={cn(
        'w-full cursor-grab active:cursor-grabbing  ',
        colorStatus(status)
      )}
      draggable
      onDragStart={() => dragOrder(order.id)}
    >
      <CardContent>
        <CardHeader className='pb-0'>
          <Link href={`/crm/orders/${order.id}`}>
            <CardDescription>
              № {formatOrderNumber(order.numberOrder)}
            </CardDescription>
          </Link>
          <CardTitle className='flex items-center justify-between w-full'>
            {formatPrice(Number(order.price))}{' '}
            <CancelIcon
              className='h-4 w-4 hover:text-destructive hover:cursor-pointer'
              onClick={() => handleAddStatusCanceled()}
            />
          </CardTitle>
          <CardDescription>{order.userShop}</CardDescription>
        </CardHeader>

        <CardFooter>
          <CardDescription className='flex w-full items-center justify-between'>
            <span>{order.deliveryOrder}</span>
            <span
              className={cn(
                'rounded-full w-4 h-4 ',
                colorBackgroundStatus(status)
              )}
            />
          </CardDescription>
        </CardFooter>
      </CardContent>
    </Card>
  )
}

export default OrderCard
