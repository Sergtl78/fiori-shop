import {
  getColorsForm,
  getProductsForm
} from '@/app/(admin)/_lib/api/for-forms/getForFormData'

import { connectProductVsColor } from '@/app/(admin)/_lib/api/for-forms/connectFormItemsVsColor'
import { disconnectProductVsColor } from '@/app/(admin)/_lib/api/for-forms/disconnectFormItemsVsColor'
import AddConnection from '@/app/(admin)/_ui/form-items/add-connection'
import HeaderUpdateColor from '@/app/(admin)/_ui/header-update-color'
import ButtonBack from '@/components/button-back'
import { Separator } from '@/components/ui/separator'
import { getColorBySlug, getColorsAdmin } from '../_lib/api/color'

type Props = {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const categories = await getColorsAdmin()

  return categories.map(item => ({
    slug: item.slug
  }))
}

const VendorPage = async ({ params }: Props) => {
  const colors = await getColorsForm()
  const color = await getColorBySlug(params.slug)
  const products = await getProductsForm()
  if (!color) return <div>404</div>
  return (
    <div className='container flex w-full flex-col mx-auto py-10 px-6 gap-4'>
      <ButtonBack />
      <div className='flex flex-row items-center gap-4'>
        <h2>Изменить цвет</h2>
      </div>
      <HeaderUpdateColor data={color} />

      <Separator />
      <AddConnection
        mainId={color.id}
        data={color.products}
        dataAll={products}
        title='Товары'
        description='Растения '
        connectFn={connectProductVsColor}
        disconnectFn={disconnectProductVsColor}
      />
    </div>
  )
}
export default VendorPage
