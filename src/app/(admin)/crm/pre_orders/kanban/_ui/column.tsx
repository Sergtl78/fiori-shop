'use client'
import { Card, CardHeader } from '@/components/ui/card'
import { cn, formatPrice } from '@/lib/utils'
import { Status } from '@prisma/client'
import { useEffect, useMemo } from 'react'
import { changePre_orderStatus } from '../../_lib/api/pre_orders'
import { colorStatus } from '../_lib/helpers'
import { usePre_orderStore } from '../_lib/store'
import OrderCard from './order-card'

type Props = {
  status: Status
  title: string
}

const Column = ({ status, title }: Props) => {
  const setInitials = usePre_orderStore(state => state.setInitials)

  const orders = usePre_orderStore(state => state.orders)
  const updateOrder = usePre_orderStore(state => state.updateOrder)
  const draggedOrder = usePre_orderStore(state => state.draggedOrder)
  const dragOrder = usePre_orderStore(state => state.dragOrder)
  const filterOrder = useMemo(
    () => orders.filter(order => order.status === status),
    [orders, status]
  )
  const totalOrdersPrice = useMemo(
    () => filterOrder.reduce((acc, order) => acc + Number(order.price), 0),
    [filterOrder]
  )
  const handleDrop = async (
    e: React.DragEvent<HTMLDivElement>,
    status: Status
  ) => {
    e.preventDefault()
    if (!draggedOrder) return
    updateOrder(draggedOrder, status)
    dragOrder(null)
    await changePre_orderStatus({ pre_orderId: draggedOrder, status })
  }
  useEffect(() => {
    setInitials()
    usePre_orderStore.persist.rehydrate()
  }, [setInitials])
  return (
    <Card className='w-full h-full min-h-full px-2 '>
      <CardHeader
        className={cn(
          'w-full flex text-lg   font-semibold border-b-4  border-t-2 mb-4',
          colorStatus(status)
        )}
      >
        <div className='w-full flex-col gap-2'>
          <div className='w-full flex justify-between items-center'>
            <span>{title}</span>
            <span>{filterOrder.length}</span>
          </div>
          <div className='w-full flex justify-between items-center text-muted-foreground'>
            <span className='text-sm'>На сумму:</span>
            <span className='text-sm'>{formatPrice(totalOrdersPrice)}</span>
          </div>
        </div>
      </CardHeader>
      <ul className='w-full h-full'>
        <div
          className='flex w-full h-full flex-col gap-2 '
          onDrop={e => handleDrop(e, status)}
          onDragOver={e => e.preventDefault()}
        >
          {filterOrder.map(order => (
            <li key={order.id}>
              <OrderCard status={status} order={order} />
            </li>
          ))}
        </div>
      </ul>
    </Card>
  )
}

export default Column
