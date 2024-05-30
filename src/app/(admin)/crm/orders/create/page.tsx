import { getProductsForDelivery } from '@/app/(admin)/cms/deliveries/_lib/api/deliveries'
import { CreateOrderForm } from '../_ui/form-create-order'
import { getUsersForOrders } from '../_lib/api/orders'

type Props = {}

const CreateOrderPage = async (props: Props) => {
  const products = await getProductsForDelivery()
  const users = await getUsersForOrders()
  return (
    <div>
      <h2>Создание заказа</h2>
      <CreateOrderForm products={products} users={users} />
    </div>
  )
}

export default CreateOrderPage
