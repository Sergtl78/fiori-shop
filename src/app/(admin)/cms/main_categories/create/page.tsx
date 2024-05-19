import ButtonBack from '@/components/button-back'
import { MainCategoryForm } from '../_ui/form-main-category'

type Props = {}

const CreateMainCategoryPageCMS = (props: Props) => {
  return (
    <div className='flex w-full flex-col mx-auto py-10 px-6 gap-6'>
      <ButtonBack />
      <div className='flex max-w-sm w-full'>
        <MainCategoryForm />
      </div>
    </div>
  )
}

export default CreateMainCategoryPageCMS
