import { DataTable } from '@/components/table/data-table'
import { deleteUsers, getCustomers } from '../_lib/api/customers'
import { columns } from './columns'

export default async function DemoPage() {
  const customers = await getCustomers()

  return (
    <div className='flex flex-col py-10 px-6'>
      <DataTable
        columns={columns}
        data={customers}
        title='Покупатели'
        deleteFn={deleteUsers}
      />
    </div>
  )
}
