import ButtonLink from '@/components/button-link'
import { DataTable } from '@/components/table/data-table'
import { deleteCollections, getCollectionsAdmin } from '../_lib/api/collection'
import { columns } from './columns'

export default async function DemoPage() {
  const collections = await getCollectionsAdmin()

  return (
    <div className='flex flex-col  py-10 px-6'>
      <ButtonLink
        className='w-fit self-end'
        href='/cms/collections/create'
        variant={'default'}
      >
        + Создать
      </ButtonLink>
      <DataTable
        columns={columns}
        data={collections}
        title='Коллекции'
        deleteFn={deleteCollections}
      />
    </div>
  )
}
