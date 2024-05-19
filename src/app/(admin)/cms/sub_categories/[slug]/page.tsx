import { getProductsForm } from '@/app/(admin)/_lib/api/for-forms/getForFormData'

import { changeNameSubCategory } from '@/app/(admin)/_lib/api/for-forms/changeNameFormItems'
import { changeSlugSubCategory } from '@/app/(admin)/_lib/api/for-forms/changeSlugFormItems'
import {
  connectCategoryVsSubCategory,
  connectMainCategoryVsSubCategory,
  connectProductVsSubCategory
} from '@/app/(admin)/_lib/api/for-forms/connectFormItemsVsSubCategory'

import { disconnectProductVsSubCategory } from '@/app/(admin)/_lib/api/for-forms/disconnectFormItemsVsSubCategory'
import AddConnection from '@/app/(admin)/_ui/form-items/add-connection'
import AddSingleConnection from '@/app/(admin)/_ui/form-items/add-single-connection'
import HeaderUpdate from '@/app/(admin)/_ui/header-update'
import ButtonBack from '@/components/button-back'
import { Separator } from '@/components/ui/separator'
import { getCategoriesAdmin } from '../../categories/_lib/api/categories'
import { getMainCategoriesAdmin } from '../../main_categories/_lib/api/main_categories'
import {
  getSubCategoriesAdmin,
  getSubCategoryBySlug
} from '../_lib/api/sub_categories'

type Props = {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const categories = await getSubCategoriesAdmin()

  return categories.map(item => ({
    slug: item.slug
  }))
}

const CategoryPage = async ({ params }: Props) => {
  const mainCategories = await getMainCategoriesAdmin()
  const categories = await getCategoriesAdmin()
  const subCategory = await getSubCategoryBySlug(params.slug)
  const products = await getProductsForm()
  if (!subCategory) return <div>404</div>
  return (
    <div className='container flex w-full flex-col mx-auto py-10 px-6 gap-4'>
      <ButtonBack />
      <div className='flex flex-row items-center gap-4'>
        <h2>Изменить категорию</h2>
      </div>
      <HeaderUpdate
        data={subCategory}
        changeNameFN={changeNameSubCategory}
        changeSlugFN={changeSlugSubCategory}
      />

      <Separator />
      <AddSingleConnection
        dataAll={mainCategories}
        mainId={subCategory.id}
        title={`Главная категория - ${subCategory.Main_category?.name}`}
        connectFn={connectMainCategoryVsSubCategory}
      />
      <Separator />
      <AddSingleConnection
        dataAll={categories}
        mainId={subCategory.id}
        title={`Категория - ${subCategory.Category?.name}`}
        connectFn={connectCategoryVsSubCategory}
      />

      <Separator />
      <AddConnection
        mainId={subCategory.id}
        data={subCategory.products}
        dataAll={products}
        title='Товары'
        description='Растения '
        connectFn={connectProductVsSubCategory}
        disconnectFn={disconnectProductVsSubCategory}
      />
    </div>
  )
}

export default CategoryPage
