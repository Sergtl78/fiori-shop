import AppDrawer from '@/components/app-drawer'
import { HamburgerMenuIcon } from '@radix-ui/react-icons'
import SideBar from './side-bar'

type Props = {}

const MenuDrawer = (props: Props) => {
  return (
    <AppDrawer
      //footer={<SocialContacts />}
      icon={<HamburgerMenuIcon className='h-8 w-8  ' />}
    >
      <SideBar />
    </AppDrawer>
  )
}

export default MenuDrawer
