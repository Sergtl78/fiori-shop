import ButtonBack from '@/components/button-back'
import { SlidePromoForm } from '../_ui/form-slider-promo'

type Props = {}

const CreateVendorPageCMS = (props: Props) => {
  return (
    <div className='flex w-full flex-col mx-auto py-10 px-6 gap-6'>
      <ButtonBack />
      <div className='flex  w-full'>
        <SlidePromoForm />
      </div>
    </div>
  )
}

export default CreateVendorPageCMS
