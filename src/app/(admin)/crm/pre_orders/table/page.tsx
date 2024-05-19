import { KanBanIcon } from '@/app/(admin)/_ui/icons/KanBanIcon'
import { DataTable } from '@/components/table/data-table'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { deletePre_orders, getPre_orders } from '../_lib/api/pre_orders'
import { columns } from './columns'

export default async function DemoPage() {
  const pre_orders = await getPre_orders()

  return (
    <div className='flex flex-col py-10 gap-4'>
      <Link href={'/crm/pre_orders/kanban'}>
        <Button className='w-fit' variant={'outline_primary'} asChild>
          <KanBanIcon className='w-6 h-6' />
        </Button>
      </Link>
      <DataTable
        columns={columns}
        data={pre_orders}
        title='Предзаказы'
        deleteFn={deletePre_orders}
      />
    </div>
  )
}
