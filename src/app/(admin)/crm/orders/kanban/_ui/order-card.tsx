'use client'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { cn, formatOrderNumber, formatPrice } from '@/lib/utils'
import { Status } from '@prisma/client'
import Link from 'next/link'
import { addOrderStatusCancelled } from '../../_lib/api/orders'
import { colorBackgroundStatus, colorStatus } from '../_lib/helpers'
import { OrderState, useOrderStore } from '../_lib/store'
import { CancelIcon } from './cancel'

type Props = {
  status: Status
  order: OrderState
}

const OrderCard = ({ status, order }: Props) => {
  const dragOrder = useOrderStore(state => state.dragOrder)
  const removeOrder = useOrderStore(state => state.removeOrder)

  const handleAddStatusCanceled = async () => {
    await addOrderStatusCancelled(order.id)
    removeOrder(order.id)
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
              № {formatOrderNumber(order.numberOrder)} от {order.createdAt}
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
          <CardDescription className='flex w-full items-center justify-end'>
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
