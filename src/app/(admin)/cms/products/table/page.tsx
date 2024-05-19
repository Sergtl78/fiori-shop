import ButtonLink from '@/components/button-link'
import { DataTable } from '@/components/table/data-table'
import { deleteProducts, getProductsAdmin } from '../_lib/api/products'
import { columns } from './columns'

export default async function ProductPage() {
  const products = await getProductsAdmin()

  return (
    <div className='flex flex-col w-full py-10 px-6'>
      <ButtonLink
        className='w-fit self-end'
        href='/cms/products/create'
        variant={'default'}
      >
        + Создать
      </ButtonLink>
      <DataTable
        columns={columns}
        data={products}
        deleteFn={deleteProducts}
        title='Растения'
      />
    </div>
  )
}
