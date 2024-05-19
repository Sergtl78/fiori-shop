import ButtonLink from '@/components/button-link'
import { DataTable } from '@/components/table/data-table'
import { deleteDelivery, getDeliveriesAdmin } from '../_lib/api/deliveries'
import { columns } from './columns'

export default async function DemoPage() {
  const deliveries = await getDeliveriesAdmin()

  return (
    <div className='flex flex-col  py-10 px-6'>
      <ButtonLink
        className='w-fit self-end'
        href='/cms/deliveries/create'
        variant={'default'}
      >
        + Создать
      </ButtonLink>
      <DataTable
        columns={columns}
        data={deliveries}
        title='Поставки'
        deleteFn={deleteDelivery}
      />
    </div>
  )
}
