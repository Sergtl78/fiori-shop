import { AvatarUser } from '@/app/(website)/_ui/navigation/nav-avatar-user'
import Logo from '@/components/logo'
import { ModeToggle } from '@/components/mode-toggle'
import NavMenu from '@/components/nav-menu'

async function AdminBar() {
  return (
    <div className='flex container px-4 py-2  gap-2 border-b items-center justify-between'>
      <Logo className=' h-8 ' />
      <NavMenu
        menu={[
          {
            name: 'Контент',
            url: '/cms'
          },
          {
            name: 'Заказы и пользователи',
            url: '/crm'
          }
        ]}
      />
      <div className='flex flex-row gap-4 items-center'>
        <AvatarUser />
        <ModeToggle />
      </div>
    </div>
  )
}

export default AdminBar
