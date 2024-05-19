import ButtonLink from '@/components/button-link'
import { DataTable } from '@/components/table/data-table'
import { deleteColor, getColorsAdmin } from '../_lib/api/color'
import { columns } from './columns'

export default async function ColorsPage() {
  const colors = await getColorsAdmin()

  return (
    <div className='flex flex-col  py-10 px-6'>
      <ButtonLink
        className='w-fit self-end'
        href='/cms/colors/create'
        variant={'default'}
      >
        + Создать
      </ButtonLink>
      <DataTable
        columns={columns}
        data={colors}
        title='Цвета'
        deleteFn={deleteColor}
      />
    </div>
  )
}
