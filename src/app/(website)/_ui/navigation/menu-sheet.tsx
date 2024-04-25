import AppSheet from '@/components/app-sheet'
import { HamburgerMenuIcon } from '@radix-ui/react-icons'
import SideBar from './side-bar'

type Props = {}

const MenuSheet = (props: Props) => {
  return (
    <AppSheet
      //footer={<SocialContacts />}
      icon={<HamburgerMenuIcon className='h-8 w-8  ' />}
    >
      <SideBar />
    </AppSheet>
  )
}

export default MenuSheet
