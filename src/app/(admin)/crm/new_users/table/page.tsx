import Separator from '@/components/separator'
import { DataTable } from '@/components/table/data-table'
import { deleteUsers } from '../../customers/_lib/api/customers'
import { getNewUsers } from '../_lib/api/customers'
import { columnsNew } from './columns-new'

export default async function DemoPage() {
  const newUsers = await getNewUsers()

  return (
    <div className='flex flex-col py-10 px-6'>
      <Separator className='my-2 bg-muted-foreground ' />
      <DataTable
        columns={columnsNew}
        data={newUsers}
        title='Новые пользователи'
        deleteFn={deleteUsers}
      />
    </div>
  )
}
