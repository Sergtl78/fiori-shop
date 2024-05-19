import ButtonBack from '@/components/button-back'
import { DataTable } from '@/components/table/data-table'
import {
  deletePre_order_items,
  getPre_order_itemsByIdPre_order
} from '../_lib/api/pre_order_items'
import { getPre_orderById, getPre_ordersAdmin } from '../_lib/api/pre_orders'
import HeaderPre_order from '../_ui/header-pre_order'
import { columnsCartItems } from './columns'

type Props = {
  params: {
    id: string
  }
}

export async function generateStaticParams() {
  const orders = await getPre_ordersAdmin()

  return orders
}

const OrderPage = async ({ params }: Props) => {
  const pre_order = await getPre_orderById(params.id)
  if (!pre_order) return <div>404</div>
  const cartItems = await getPre_order_itemsByIdPre_order(pre_order?.id)
  return (
    <div className='container flex w-full flex-col mx-auto py-10 px-6 gap-4'>
      <ButtonBack />

      <HeaderPre_order pre_order={pre_order} />
      <section className='flex'>
        {cartItems && (
          <DataTable
            columns={columnsCartItems}
            data={cartItems}
            title='Корзина'
            deleteFn={deletePre_order_items}
          />
        )}
      </section>
    </div>
  )
}
export default OrderPage
