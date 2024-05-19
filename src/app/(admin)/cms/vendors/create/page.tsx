import ButtonBack from '@/components/button-back'
import { VendorForm } from '../_ui/form-vendor'

type Props = {}

const CreateVendorPageCMS = (props: Props) => {
  return (
    <div className='flex w-full flex-col mx-auto py-10 px-6 gap-6'>
      <ButtonBack />
      <div className='flex max-w-sm w-full'>
        <VendorForm />
      </div>
    </div>
  )
}

export default CreateVendorPageCMS
