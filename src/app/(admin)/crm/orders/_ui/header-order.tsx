'use client'
import { translateStatus } from '@/app/(admin)/_lib/helpers/translate-status'
import Separator from '@/components/separator'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { formatDate, formatOrderNumber, formatPrice } from '@/lib/utils'
import { ResOrderTable } from '../_lib/api/orders'
import { ChangeStatusOrderForm } from './form-change-status-order'

type Props = {
  order: ResOrderTable
}

const HeaderOrder = ({ order }: Props) => {
  return (
    <div className='flex flex-col  max-w-sm w-full'>
      <Dialog>
        <div className='flex items-center justify-between '>
          <p>Заказ № </p>
          <p className='font-bold text-lg'>
            {formatOrderNumber(order.number_order)}
          </p>
          <p>от {formatDate(order.createdAt)}</p>
        </div>
        <div className='flex items-center justify-between '>
          <span>
            <span>Статус:</span>
            <span className='font-bold ml-4'>
              {translateStatus(order.status)}
            </span>
          </span>

          {order.status !== 'CANCELLED' && (
            <DialogTrigger asChild>
              <Button variant='outline'>Изменить статус</Button>
            </DialogTrigger>
          )}
        </div>

        <div className='flex items-center justify-between '>
          <p>Наименований: </p>
          <p className='font-bold'>{order.total_items} </p>
        </div>
        <div className='flex items-center justify-between '>
          <p>Общее количество: </p>
          <p className='font-bold'>{order.total_amount} шт.</p>
        </div>
        <div className='flex items-center justify-between '>
          <p>Общая сумма: </p>
          <p className='font-bold'>{formatPrice(order.total_prise)}</p>
        </div>
        <Separator />
        <div className='flex items-center justify-between '>
          <p>Заказчик: </p>
          <p>{`${order.User?.name} ${order.User?.lastName}`}</p>
        </div>
        <div className='flex items-center justify-between '>
          <p>Магазин: </p>
          <p>{order.Shop?.name}</p>
        </div>
        <div className='flex items-center justify-between '>
          <p>Адрес: </p>
          <p>
            г.{order.Shop?.city} ул. {order.Shop?.street} д. {order.Shop?.house}
          </p>
        </div>

        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>Обновить данные</DialogTitle>
            <ChangeStatusOrderForm
              orderId={order.id}
              statusOrder={order.status}
            />
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}
export default HeaderOrder
