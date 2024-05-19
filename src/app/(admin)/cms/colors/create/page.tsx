import ButtonBack from '@/components/button-back'
import { ColorForm } from '../_ui/form-color'

type Props = {}

const CreateVendorPageCMS = (props: Props) => {
  return (
    <div className='flex w-full flex-col mx-auto py-10 px-6 gap-6'>
      <ButtonBack />
      <div className='flex max-w-sm w-full'>
        <ColorForm />
      </div>
    </div>
  )
}

export default CreateVendorPageCMS
