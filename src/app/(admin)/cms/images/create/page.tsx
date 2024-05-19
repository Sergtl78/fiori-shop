import ButtonBack from '@/components/button-back'
import { getImagesAdmin } from '../_lib/api/image'
import FormImage from '../_ui/form-image'

type Props = {}

const CreateImagesPageCMS = async (props: Props) => {
  const images = await getImagesAdmin()
  const arrNamesImages = images.map(image => image.name)
  return (
    <div className='flex w-full flex-col mx-auto py-10 px-6 gap-6'>
      <ButtonBack />
      <div className='flex flex-col gap-4  w-full'>
        <h1 className=''>Добавить изображения</h1>

        <FormImage arrNames={arrNamesImages} />
      </div>
    </div>
  )
}

export default CreateImagesPageCMS
