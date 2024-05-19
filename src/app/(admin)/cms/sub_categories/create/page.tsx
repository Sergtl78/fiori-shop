import ButtonBack from '@/components/button-back'
import { SubCategoryForm } from '../_ui/form-sub-category'

type Props = {}

const CreateSubCategoryPageCMS = (props: Props) => {
  return (
    <div className='flex w-full flex-col mx-auto py-10 px-6 gap-6'>
      <ButtonBack />
      <div className='flex max-w-sm w-full'>
        <SubCategoryForm />
      </div>
    </div>
  )
}

export default CreateSubCategoryPageCMS
