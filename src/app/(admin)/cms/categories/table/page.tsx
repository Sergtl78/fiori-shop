import ButtonLink from '@/components/button-link'
import { DataTable } from '@/components/table/data-table'
import { deleteCategories, getCategoriesAdmin } from '../_lib/api/categories'
import { columns } from './columns'

export default async function DemoPage() {
  const catagories = await getCategoriesAdmin()

  return (
    <div className='flex flex-col py-10 px-6'>
      <ButtonLink
        className='w-fit self-end'
        href='/cms/categories/create'
        variant={'default'}
      >
        + Создать
      </ButtonLink>
      <DataTable
        columns={columns}
        data={catagories}
        title='Категории (вид)'
        deleteFn={deleteCategories}
      />
    </div>
  )
}
