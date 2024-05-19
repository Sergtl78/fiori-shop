import ButtonLink from '@/components/button-link'
import { DataTable } from '@/components/table/data-table'
import { deleteImage, getImagesAdmin } from '../_lib/api/image'
import { columns } from './columns'

export default async function ColorsPage() {
  const images = await getImagesAdmin()

  return (
    <div className='flex flex-col w-full py-10 px-6'>
      <ButtonLink
        className='w-fit self-end'
        href='/cms/images/create'
        variant={'default'}
      >
        + Загрузить
      </ButtonLink>
      <DataTable
        columns={columns}
        data={images}
        title='Фото товаров'
        deleteFn={deleteImage}
      />
    </div>
  )
}
