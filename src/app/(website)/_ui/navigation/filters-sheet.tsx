import AppSheet from '@/components/app-sheet'
import { MixerHorizontalIcon } from '@radix-ui/react-icons'
import FiltersProductData from '../../catalog/_ui/filters/filters-product-data'

type Props = {}

const FiltersSheet = (props: Props) => {
  return (
    <AppSheet
      side='right'
      //footer={<SocialContacts />}
      icon={<MixerHorizontalIcon className='h-8 w-8  ' />}
    >
      <FiltersProductData />
    </AppSheet>
  )
}

export default FiltersSheet
