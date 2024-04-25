import AppDrawer from '@/components/app-drawer'
import { MixerHorizontalIcon } from '@radix-ui/react-icons'
import FiltersProductData from '../../catalog/_ui/filters/filters-product-data'

type Props = {}

const FiltersDrawer = (props: Props) => {
  return (
    <AppDrawer
      //footer={<SocialContacts />}
      icon={<MixerHorizontalIcon className='h-8 w-8  ' />}
    >
      <FiltersProductData />
    </AppDrawer>
  )
}

export default FiltersDrawer
