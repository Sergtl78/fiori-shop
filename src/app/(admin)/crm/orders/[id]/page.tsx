import ButtonBack from '@/components/button-back'
import { DataTable } from '@/components/table/data-table'
import {
  deleteOrder_items,
  getOrderItemsByIdOrder
} from '../_lib/api/order_items'
import { getOrderById, getOrdersAdmin } from '../_lib/api/orders'
import HeaderOrder from '../_ui/header-order'
import { columnsCartItems } from './columns'

type Props = {
  params: {
    id: string
  }
}

export async function generateStaticParams() {
  const orders = await getOrdersAdmin()

  return orders
}

const OrderPage = async ({ params }: Props) => {
  const order = await getOrderById(params.id)
  if (!order) return <div>404</div>
  const cartItems = await getOrderItemsByIdOrder(order?.id)
  return (
    <div className='container flex w-full flex-col mx-auto py-10 px-6 gap-4'>
      <ButtonBack />

      <HeaderOrder order={order} />
      <section className='flex'>
        {cartItems && (
          <DataTable
            columns={columnsCartItems}
            data={cartItems}
            title='Корзина'
            deleteFn={deleteOrder_items}
          />
        )}
      </section>
    </div>
  )
}
export default OrderPage
