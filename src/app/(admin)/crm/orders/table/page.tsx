import { KanBanIcon } from '@/app/(admin)/_ui/icons/KanBanIcon'
import ButtonLink from '@/components/button-link'
import { DataTable } from '@/components/table/data-table'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { deleteOrders, getOrders } from '../_lib/api/orders'
import { columns } from './columns'

export default async function DemoPage() {
  const orders = await getOrders()

  return (
    <div className='container flex flex-col py-10 gap-4'>
      <div className='flex w-full items-center justify-between'>
        <Link href={'/crm/orders/kanban'}>
          <Button className='w-fit' variant={'outline_primary'} asChild>
            <KanBanIcon className='w-6 h-6' />
          </Button>
        </Link>
        <ButtonLink
          className='w-fit self-end'
          href='/crm/orders/create'
          variant={'default'}
        >
          + Создать
        </ButtonLink>
      </div>
      <DataTable
        columns={columns}
        data={orders}
        title='Заказы'
        deleteFn={deleteOrders}
      />
    </div>
  )
}
