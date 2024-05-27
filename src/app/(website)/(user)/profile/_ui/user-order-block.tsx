import { getUserOrders } from '../_lib/api/orders'
import { UserOrdersPagination } from './pagination-orders'
import UserOrderSlider from './user-order-slider'

type Props = {
  userId: string
  page?: string
  pageSize?: string
  orderCount?: number
}

const UserOrderBlock = async ({ userId, page, pageSize }: Props) => {
  console.log(page, pageSize)

  const { orders, orderCount } = await getUserOrders({
    userId,
    page: Number(page) || 1,
    pageSize: Number(pageSize) || 2
  })
  return (
    <section className=' flex flex-col gap-4 w-full'>
      <h2>Заказы</h2>
      {orders?.map(order => <UserOrderSlider key={order.id} data={order} />)}
      <UserOrdersPagination
        data={{
          page: Number(page || 1),
          pageSize: Number(pageSize || 2),
          pageCount: Math.ceil((orderCount || 0) / Number(pageSize || 2))
        }}
      />
    </section>
  )
}

export default UserOrderBlock
