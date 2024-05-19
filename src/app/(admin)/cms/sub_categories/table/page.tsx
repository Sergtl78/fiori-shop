import ButtonLink from '@/components/button-link'
import { DataTable } from '@/components/table/data-table'
import {
  deleteSubCategories,
  getSubCategoriesAdmin
} from '../_lib/api/sub_categories'
import { columns } from './columns'

export default async function DemoPage() {
  const sub_catagories = await getSubCategoriesAdmin()

  return (
    <div className='flex flex-col  py-10 px-6'>
      <ButtonLink
        className='w-fit self-end'
        href='/cms/sub_categories/create'
        variant={'default'}
      >
        + Создать
      </ButtonLink>
      <DataTable
        columns={columns}
        data={sub_catagories}
        title='Тип (подкатегории)'
        deleteFn={deleteSubCategories}
      />
    </div>
  )
}
