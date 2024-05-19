import { getProductsForm } from '@/app/(admin)/_lib/api/for-forms/getForFormData'

import { changeNameVendor } from '@/app/(admin)/_lib/api/for-forms/changeNameFormItems'
import { changeSlugVendor } from '@/app/(admin)/_lib/api/for-forms/changeSlugFormItems'
import { connectProductVsVendor } from '@/app/(admin)/_lib/api/for-forms/connectFormItemsVsVendor'
import { disconnectProductVsVendor } from '@/app/(admin)/_lib/api/for-forms/disconnectFormItemsVsVendors'
import AddConnection from '@/app/(admin)/_ui/form-items/add-connection'
import HeaderUpdate from '@/app/(admin)/_ui/header-update'
import ButtonBack from '@/components/button-back'
import { Separator } from '@/components/ui/separator'
import { getVendorBySlug, getVendorsAdmin } from '../_lib/api/vendors'

type Props = {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const categories = await getVendorsAdmin()

  return categories.map(item => ({
    slug: item.slug
  }))
}

const VendorPage = async ({ params }: Props) => {
  const vendor = await getVendorBySlug(params.slug)
  const products = await getProductsForm()
  if (!vendor) return <div>404</div>
  return (
    <div className='container flex w-full flex-col mx-auto py-10 px-6 gap-4'>
      <ButtonBack />
      <div className='flex flex-row items-center gap-4'>
        <h2>Изменить категорию</h2>
      </div>
      <HeaderUpdate
        data={vendor}
        changeNameFN={changeNameVendor}
        changeSlugFN={changeSlugVendor}
      />

      <Separator />
      <AddConnection
        mainId={vendor.id}
        data={vendor.products}
        dataAll={products}
        title='Товары'
        description='Растения '
        connectFn={connectProductVsVendor}
        disconnectFn={disconnectProductVsVendor}
      />
    </div>
  )
}
export default VendorPage
