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
            name: 'CMS',
            url: '/cms'
          },
          {
            name: 'CRM',
            url: '/crm'
          }
        ]}
      />
      <ModeToggle />
    </div>
  )
}

export default AdminBar
