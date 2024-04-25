import { ModeToggle } from './mode-toggle'
import NavMenu from './nav-menu'

async function AppBar() {
  return (
    <div className='hidden container  gap-2 border-b items-center justify-between'>
      <NavMenu
        menu={[
          {
            name: 'Website',
            url: '/'
          },
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

export default AppBar
