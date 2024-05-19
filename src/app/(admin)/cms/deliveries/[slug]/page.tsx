import ButtonBack from '@/components/button-back'
import { DataTable } from '@/components/table/data-table'
import { getDeliveriesAdmin, getDeliveryBySlug } from '../_lib/api/deliveries'
import {
  deleteDelivery_item,
  getAvailabilitiesByIdDelivery
} from '../_lib/api/delivery_items'
import ButtonRegisterDelivery from '../_ui/button-register-delivery'
import HeaderDelivery from '../_ui/header-delivery'
import { columnsDelivery } from './columns'

type Props = {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const deliveries = await getDeliveriesAdmin()

  return deliveries.map(item => ({
    slug: item.slug
  }))
}

const DeliveryPage = async ({ params }: Props) => {
  const delivery = await getDeliveryBySlug(params.slug)
  if (!delivery) return <div>404</div>
  const availabilities = await getAvailabilitiesByIdDelivery(delivery?.id)

  return (
    <div className='container flex w-full flex-col mx-auto py-10 px-6 gap-4'>
      <ButtonBack />
      <HeaderDelivery delivery={delivery} />
      <section className='flex'>
        <DataTable
          columns={columnsDelivery}
          data={availabilities}
          title='Поставка'
          deleteFn={deleteDelivery_item}
        />
      </section>
      <ButtonRegisterDelivery deliveryId={delivery.id} />
    </div>
  )
}
export default DeliveryPage
