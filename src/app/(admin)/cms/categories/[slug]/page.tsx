import {
  getProductsForm,
  getSubCategoriesForm
} from '@/app/(admin)/_lib/api/for-forms/getForFormData'

import { changeNameCategory } from '@/app/(admin)/_lib/api/for-forms/changeNameFormItems'
import { changeSlugCategory } from '@/app/(admin)/_lib/api/for-forms/changeSlugFormItems'
import {
  connectProductVsCategory,
  connectSubCategoryVsCategory
} from '@/app/(admin)/_lib/api/for-forms/connectFormItemsVsCategory'
import {
  disconnectProductVsCategory,
  disconnectSubCategoryVsCategory
} from '@/app/(admin)/_lib/api/for-forms/disconnectFormItemsVsCategory'
import AddConnection from '@/app/(admin)/_ui/form-items/add-connection'
import AddSingleConnection from '@/app/(admin)/_ui/form-items/add-single-connection'
import HeaderUpdate from '@/app/(admin)/_ui/header-update'
import ButtonBack from '@/components/button-back'
import { Separator } from '@/components/ui/separator'
import { connectMainCategoryVsCategory } from '../../../_lib/api/for-forms/connectFormItemsVsCategory'
import { getMainCategoriesAdmin } from '../../main_categories/_lib/api/main_categories'
import { getCategoriesAdmin, getCategoryBySlug } from '../_lib/api/categories'

type Props = {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const categories = await getCategoriesAdmin()

  return categories.map(item => ({
    slug: item.slug
  }))
}

const CategoryPage = async ({ params }: Props) => {
  const mainCategories = await getMainCategoriesAdmin()
  const category = await getCategoryBySlug(params.slug)
  const subCategories = await getSubCategoriesForm()
  const products = await getProductsForm()
  if (!category) return <div>404</div>
  return (
    <div className='container flex w-full flex-col mx-auto py-10 px-6 gap-4'>
      <ButtonBack />
      <div className='flex flex-row items-center gap-4'>
        <h2>Изменить категорию</h2>
        {/*  <SwitchVisibleForm
          title={'Видимость'}
          visible={category.visible}
          id={category.id}
          changeVisibleFN={changeVisibleCategory}
        /> */}
      </div>
      <HeaderUpdate
        data={category}
        changeNameFN={changeNameCategory}
        changeSlugFN={changeSlugCategory}
      />

      <Separator />
      <AddSingleConnection
        dataAll={mainCategories}
        mainId={category.id}
        title={`Главная категория - ${category.Main_category?.name}`}
        connectFn={connectMainCategoryVsCategory}
      />

      <Separator />
      <AddConnection
        mainId={category.id}
        data={category.sub_categories}
        dataAll={subCategories}
        title='Подкатегории'
        description='Тип растений '
        connectFn={connectSubCategoryVsCategory}
        disconnectFn={disconnectSubCategoryVsCategory}
      />
      <Separator />
      <AddConnection
        mainId={category.id}
        data={category.products}
        dataAll={products}
        title='Товары'
        description='Растения '
        connectFn={connectProductVsCategory}
        disconnectFn={disconnectProductVsCategory}
      />
    </div>
  )
}

export default CategoryPage
