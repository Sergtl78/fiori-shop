import ButtonBack from '@/components/button-back'
import FormImage from '../../images/_ui/form-images'
import { CreateProductForm } from '../_ui/form-product-create'

type Props = {}

const CreateCategoryPageCMS = (props: Props) => {
  return (
    <div className='container flex w-full flex-col items-start py-10 px-6 gap-6'>
      <ButtonBack />
      <div className='flex  w-full gap-6 '>
        <CreateProductForm />
        <div className='flex flex-col gap-4'>
          <h2>Загрузка изображений</h2>
          <FormImage />
        </div>
      </div>
    </div>
  )
}

export default CreateCategoryPageCMS
