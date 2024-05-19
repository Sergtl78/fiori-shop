import ButtonBack from '@/components/button-back'
import { CollectionForm } from '../_ui/form-collection'

type Props = {}

const CreateCollectionPageCMS = (props: Props) => {
  return (
    <div className='flex w-full flex-col mx-auto py-10 px-6 gap-6'>
      <ButtonBack />
      <div className='flex max-w-sm w-full'>
        <CollectionForm />
      </div>
    </div>
  )
}

export default CreateCollectionPageCMS
