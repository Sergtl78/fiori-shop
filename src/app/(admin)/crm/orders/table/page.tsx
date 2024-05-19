import { KanBanIcon } from '@/app/(admin)/_ui/icons/KanBanIcon'
import { DataTable } from '@/components/table/data-table'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { deleteOrders, getOrders } from '../_lib/api/orders'
import { columns } from './columns'

export default async function DemoPage() {
  const orders = await getOrders()

  return (
    <div className='container flex flex-col py-10 gap-4'>
      <Link href={'/crm/orders/kanban'}>
        <Button className='w-fit' variant={'outline_primary'} asChild>
          <KanBanIcon className='w-6 h-6' />
        </Button>
      </Link>
      <DataTable
        columns={columns}
        data={orders}
        title='Заказы'
        deleteFn={deleteOrders}
      />
    </div>
  )
}
