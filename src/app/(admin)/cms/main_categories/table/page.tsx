import ButtonLink from '@/components/button-link'
import { DataTable } from '@/components/table/data-table'
import {
  deleteMainCategories,
  getMainCategoriesAdmin
} from '../_lib/api/main_categories'
import { columns } from './columns'

export default async function TableMainCategoriesPage() {
  const mainCatagories = await getMainCategoriesAdmin()

  return (
    <div className='flex flex-col  py-10 px-6'>
      <ButtonLink
        className='w-fit self-end'
        href='/cms/main_categories/create'
        variant={'default'}
      >
        + Создать
      </ButtonLink>
      <DataTable
        columns={columns}
        data={mainCatagories}
        title='Главная категория'
        deleteFn={deleteMainCategories}
      />
    </div>
  )
}
