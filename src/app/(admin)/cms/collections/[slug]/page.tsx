import { getProductsForm } from '@/app/(admin)/_lib/api/for-forms/getForFormData'

import { connectProductVsCollection } from '@/app/(admin)/_lib/api/for-forms/connectFormItemsVsCollection'
import { disconnectProductVsCollection } from '@/app/(admin)/_lib/api/for-forms/disconnectFormItemsVsCollection'
import AddConnection from '@/app/(admin)/_ui/form-items/add-connection'
import ButtonBack from '@/components/button-back'
import { Separator } from '@/components/ui/separator'
import {
  getCollectionBySlug,
  getCollectionsAdmin
} from '../_lib/api/collection'
import FormIconCollection from '../_ui/form-icon-collection'
import HeaderUpdateCollection from '../_ui/header-update-collection'

type Props = {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const categories = await getCollectionsAdmin()

  return categories.map(item => ({
    slug: item.slug
  }))
}

const VendorPage = async ({ params }: Props) => {
  const collection = await getCollectionBySlug(params.slug)
  const products = await getProductsForm()
  if (!collection) return <div>404</div>
  return (
    <div className='container flex w-full flex-col mx-auto py-10 px-6 gap-4'>
      <ButtonBack />
      <div className='flex flex-row items-center gap-4'>
        <h2>Изменить коллекцию</h2>
      </div>
      <div className='flex w-full gap-6'>
        <HeaderUpdateCollection data={collection} />
        <FormIconCollection
          collectionId={collection.id}
          collectionIcon={collection.icon}
        />
      </div>
      <Separator />
      <AddConnection
        mainId={collection.id}
        data={collection.products}
        dataAll={products}
        title='Товары'
        description='Растения '
        connectFn={connectProductVsCollection}
        disconnectFn={disconnectProductVsCollection}
      />
    </div>
  )
}
export default VendorPage
