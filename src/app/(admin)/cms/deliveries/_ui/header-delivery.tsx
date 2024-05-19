'use client'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { formatDate } from '@/lib/utils'
import { Delivery } from '@prisma/client'
import { Pencil2Icon } from '@radix-ui/react-icons'
import { UpdateInfoDeliveryForm } from './form-update-info-delivery '

type Props = {
  delivery: Delivery
}

const HeaderDelivery = ({ delivery }: Props) => {
  return (
    <div className='flex flex-col  max-w-sm w-full'>
      <Dialog>
        <div className='flex items-center gap-4'>
          <h3>Slug: {delivery.slug}</h3>
          <DialogTrigger asChild>
            <Pencil2Icon className='w-6 h-6 cursor-pointer' />
          </DialogTrigger>
        </div>
        <p>дата: {formatDate(delivery.dateDelivery)}</p>
        <p>статус: {delivery.statusDelivery}</p>

        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>Обновить данные</DialogTitle>
            <UpdateInfoDeliveryForm delivery={delivery} />
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}
export default HeaderDelivery
