import ButtonLink from '@/components/button-link'
import { DataTable } from '@/components/table/data-table'
import {
  deleteSlidePromo,
  getSliderPromosAdmin
} from '../_lib/api/slider_promo'
import { columns } from './columns'

export default async function DemoPage() {
  const slider = await getSliderPromosAdmin()

  return (
    <div className='flex flex-col w-full py-10 px-6'>
      <ButtonLink
        className='w-fit self-end'
        href='/cms/slider_promo/create'
        variant={'default'}
      >
        + Создать
      </ButtonLink>
      <DataTable
        columns={columns}
        data={slider}
        title='Слайдер на главной странице'
        deleteFn={deleteSlidePromo}
      />
    </div>
  )
}
