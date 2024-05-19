import ButtonBack from '@/components/button-back'
import { CategoryForm } from '../_ui/form-category'

type Props = {}

const CreateCategoryPageCMS = (props: Props) => {
  return (
    <div className='flex w-full flex-col mx-auto py-10 px-6 gap-6'>
      <ButtonBack />
      <div className='flex max-w-sm w-full'>
        <CategoryForm />
      </div>
    </div>
  )
}

export default CreateCategoryPageCMS
