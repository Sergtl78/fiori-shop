import {
  getCategoriesForm,
  getProductsForm,
  getSubCategoriesForm
} from '@/app/(admin)/_lib/api/for-forms/getForFormData'

import { changeNameMainCategory } from '@/app/(admin)/_lib/api/for-forms/changeNameFormItems'
import { changeSlugMainCategory } from '@/app/(admin)/_lib/api/for-forms/changeSlugFormItems'
import {
  connectCategoryVsMainCategory,
  connectProductVsMainCategory,
  connectSubCategoryVsMainCategory
} from '@/app/(admin)/_lib/api/for-forms/connectFormItemsVsMainCategory'
import {
  disconnectCategoryVsMainCategory,
  disconnectProductVsMainCategory,
  disconnectSubCategoryVsMainCategory
} from '@/app/(admin)/_lib/api/for-forms/disconnectFormItemsVsMainCategory'
import AddConnection from '@/app/(admin)/_ui/form-items/add-connection'
import HeaderUpdate from '@/app/(admin)/_ui/header-update'
import ButtonBack from '@/components/button-back'
import { Separator } from '@/components/ui/separator'
import {
  getMainCategoriesAdmin,
  getMainCategoryBySlug
} from '../_lib/api/main_categories'

type Props = {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const mainCategories = await getMainCategoriesAdmin()

  return mainCategories.map(item => ({
    slug: item.slug
  }))
}
const MainCategoryPage = async ({ params }: Props) => {
  const mainCategory = await getMainCategoryBySlug(params.slug)
  const categories = await getCategoriesForm()
  const subCategories = await getSubCategoriesForm()
  const products = await getProductsForm()
  if (!mainCategory) return <div>404</div>
  return (
    <div className='container flex w-full flex-col mx-auto py-10 px-6 gap-4'>
      <ButtonBack />
      <div className='flex flex-row items-center gap-4'>
        <h2>Изменить главную категорию</h2>
      </div>
      <HeaderUpdate
        data={mainCategory}
        changeNameFN={changeNameMainCategory}
        changeSlugFN={changeSlugMainCategory}
      />

      <Separator />
      <AddConnection
        mainId={mainCategory.id}
        data={mainCategory.categories}
        dataAll={categories}
        title='Категории'
        description='Вид растений '
        connectFn={connectCategoryVsMainCategory}
        disconnectFn={disconnectCategoryVsMainCategory}
      />
      <Separator />
      <AddConnection
        mainId={mainCategory.id}
        data={mainCategory.sub_categories}
        dataAll={subCategories}
        title='Подкатегории'
        description='Тип растений '
        connectFn={connectSubCategoryVsMainCategory}
        disconnectFn={disconnectSubCategoryVsMainCategory}
      />
      <Separator />
      <AddConnection
        mainId={mainCategory.id}
        data={mainCategory.products}
        dataAll={products}
        title='Товары'
        description='Растения '
        connectFn={connectProductVsMainCategory}
        disconnectFn={disconnectProductVsMainCategory}
      />
    </div>
  )
}

export default MainCategoryPage
