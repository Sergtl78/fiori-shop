import { Pencil2Icon } from '@radix-ui/react-icons'
import { useState } from 'react'
import { ResOrderTable } from '../_lib/api/orders'
import { UpdateOrderItemForm } from './form-update-order-item'

type Props = {
  orderItem: ResOrderTable['order_items'][0]
}

const OrderItemQuantityProduct = ({ orderItem }: Props) => {
  const [show, setShow] = useState(false)
  return !show ? (
    <div className='flex items-center w-full justify-between'>
      <p className='w-full text-center'>
        {orderItem.quantityProduct} уп. X {orderItem.Product?.min_quantity}шт.
      </p>
      <Pencil2Icon className='w-4 h-4' onClick={() => setShow(!show)} />
    </div>
  ) : (
    <UpdateOrderItemForm orderItem={orderItem} setShow={setShow} />
  )
}

export default OrderItemQuantityProduct
