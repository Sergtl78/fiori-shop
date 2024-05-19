import { getSubCategoriesForm } from '@/app/(admin)/_lib/api/for-forms/getForFormData'

import { changeVisibleProduct } from '@/app/(admin)/_lib/api/for-forms/changeVisibleFormItems'
import {
  connectCategoryVsProduct,
  connectColorVsProduct,
  connectImageVsProduct,
  connectMainCategoryVsProduct,
  connectSubCategoryVsProduct,
  connectVendorVsProduct
} from '@/app/(admin)/_lib/api/for-forms/connectFormItemsVsProduct'
import { disconnectImageVsProduct } from '@/app/(admin)/_lib/api/for-forms/disconnectFormItemsVsProduct'
import AddConnectionImage from '@/app/(admin)/_ui/form-items/add-connection-image'
import AddSingleConnection from '@/app/(admin)/_ui/form-items/add-single-connection'
import SwitchVisibleForm from '@/app/(admin)/_ui/form-items/switch-visible-form'
import HeaderUpdateProduct from '@/app/(admin)/_ui/header-update-product'
import ButtonBack from '@/components/button-back'
import { Separator } from '@/components/ui/separator'
import { getCategoriesAdmin } from '../../categories/_lib/api/categories'
import { getColorsAdmin } from '../../colors/_lib/api/color'
import { getImagesNoProductAdmin } from '../../images/_lib/api/image'
import { getMainCategoriesAdmin } from '../../main_categories/_lib/api/main_categories'
import { getVendorsAdmin } from '../../vendors/_lib/api/vendors'
import { getProductBySlug, getProductsAdmin } from '../_lib/api/products'

type Props = {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const products = await getProductsAdmin()

  return products.map(item => ({
    slug: item.slug
  }))
}

const ProductPage = async ({ params }: Props) => {
  const mainCategories = await getMainCategoriesAdmin()
  const categories = await getCategoriesAdmin()
  const subCategories = await getSubCategoriesForm()
  const vendors = await getVendorsAdmin()
  const colors = await getColorsAdmin()
  const images = await getImagesNoProductAdmin()
  const product = await getProductBySlug(params.slug)
  if (!product) return <div>404</div>
  return (
    <div className='container flex w-full flex-col py-10 px-6 gap-4 '>
      <ButtonBack />
      <div className='flex flex-row items-center gap-4'>
        <h2>Изменить товар</h2>
        <SwitchVisibleForm
          title={'Видимость'}
          visible={product.visible}
          id={product.id}
          changeVisibleFN={changeVisibleProduct}
        />
      </div>
      <HeaderUpdateProduct data={product} />
      <div className='grid grid-cols-3 w-full gap-6'>
        <AddSingleConnection
          dataAll={mainCategories}
          mainId={product.id}
          title={`Главная категория - ${product.Main_category?.name}`}
          connectFn={connectMainCategoryVsProduct}
        />
        <AddSingleConnection
          dataAll={categories}
          mainId={product.id}
          title={`Категория - ${product.Category?.name}`}
          connectFn={connectCategoryVsProduct}
        />
        <AddSingleConnection
          dataAll={subCategories}
          mainId={product.id}
          title={`Подкатегория - ${product.Sub_category?.name}`}
          connectFn={connectSubCategoryVsProduct}
        />
        <AddSingleConnection
          dataAll={vendors}
          mainId={product.id}
          title={`Поставщик - ${product.Vendor?.name}`}
          connectFn={connectVendorVsProduct}
        />

        <AddSingleConnection
          dataAll={colors}
          mainId={product.id}
          title={`Цвет - ${product.Color?.name}`}
          connectFn={connectColorVsProduct}
        />
      </div>
      <Separator />
      <AddConnectionImage
        mainId={product.id}
        data={product.images}
        dataAll={images}
        title='Фотографии'
        description='Фотографии растений '
        connectFn={connectImageVsProduct}
        disconnectFn={disconnectImageVsProduct}
      />
    </div>
  )
}
export default ProductPage
