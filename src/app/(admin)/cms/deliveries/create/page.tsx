import ButtonBack from '@/components/button-back'
import { getProductsForDelivery } from '../_lib/api/deliveries'
import { DeliveryForm } from '../_ui/form-delivery'

type Props = {}

const CreateVendorPageCMS = async (props: Props) => {
  const products = await getProductsForDelivery()
  return (
    <div className='flex w-full flex-col mx-auto py-10 px-6 gap-6'>
      <ButtonBack />
      <div className='flex  w-full'>
        <DeliveryForm products={products} />
      </div>
    </div>
  )
}

export default CreateVendorPageCMS
