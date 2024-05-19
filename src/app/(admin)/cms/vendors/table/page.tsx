import ButtonLink from '@/components/button-link'
import { DataTable } from '@/components/table/data-table'
import { deleteVendor, getVendorsAdmin } from '../_lib/api/vendors'
import { columns } from './columns'

export default async function DemoPage() {
  const vendors = await getVendorsAdmin()

  return (
    <div className='flex flex-col  py-10 px-6'>
      <ButtonLink
        className='w-fit self-end'
        href='/cms/vendors/create'
        variant={'default'}
      >
        + Создать
      </ButtonLink>
      <DataTable
        columns={columns}
        data={vendors}
        title='Поставщики'
        deleteFn={deleteVendor}
      />
    </div>
  )
}
