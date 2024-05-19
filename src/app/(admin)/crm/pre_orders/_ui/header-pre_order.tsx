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
import { ResPre_orderTable } from '../_lib/api/pre_orders'
import { ChangeStatusPre_orderForm } from './form-change-status-pre_order'

type Props = {
  pre_order: ResPre_orderTable
}

const HeaderPre_order = ({ pre_order }: Props) => {
  return (
    <div className='flex flex-col  max-w-sm w-full'>
      <Dialog>
        <div className='flex items-center justify-between '>
          <p>Предзаказ № </p>
          <p className='font-bold'>
            {formatOrderNumber(pre_order.number_order)}
          </p>
        </div>
        <div className='flex items-center justify-between '>
          <p>Дата поставки: </p>
          <p className='font-bold'>
            {formatDate(
              pre_order.pre_order_items[0].Delivery_item?.dateDelivery_item
            )}
          </p>
        </div>
        <div className='flex items-center justify-between '>
          <span>
            <span>Статус:</span>
            <span className='font-bold ml-4'>
              {translateStatus(pre_order.status)}
            </span>
          </span>

          {pre_order.status !== 'CANCELLED' && (
            <DialogTrigger asChild>
              <Button variant='outline'>Изменить статус</Button>
            </DialogTrigger>
          )}
        </div>

        <div className='flex items-center justify-between '>
          <p>Наименований: </p>
          <p className='font-bold'>{pre_order.total_items} </p>
        </div>
        <div className='flex items-center justify-between '>
          <p>Общее количество: </p>
          <p className='font-bold'>{pre_order.total_amount} шт.</p>
        </div>
        <div className='flex items-center justify-between '>
          <p>Общая сумма: </p>
          <p className='font-bold'>{formatPrice(pre_order.total_prise)}</p>
        </div>
        <Separator />
        <div className='flex items-center justify-between '>
          <p>Заказчик: </p>
          <p>{`${pre_order.User?.name} ${pre_order.User?.lastName}`}</p>
        </div>
        <div className='flex items-center justify-between '>
          <p>Магазин: </p>
          <p>{pre_order.Shop?.name}</p>
        </div>
        <div className='flex items-center justify-between '>
          <p>Адрес: </p>
          <p>
            г.{pre_order.Shop?.city} ул. {pre_order.Shop?.street} д.{' '}
            {pre_order.Shop?.house}
          </p>
        </div>

        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>Обновить данные</DialogTitle>
            <ChangeStatusPre_orderForm
              pre_orderId={pre_order.id}
              statusPre_order={pre_order.status}
            />
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}
export default HeaderPre_order
