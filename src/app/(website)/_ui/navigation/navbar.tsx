import Logo from '@/components/logo'
import { ModeToggle } from '@/components/mode-toggle'
import NavMenu from '@/components/nav-menu'
import { auth } from 'auth'
import { getMainCategories } from '../../_lib/api/main_category'
import CartItemBadge from '../cart/cart-item-badge'
import CartSheet from '../cart/cart-sheet'
import MenuSheet from './menu-sheet'
import { AvatarUser } from './nav-avatar-user'

const Navbar = async () => {
  const session = await auth()
  const user = session?.user
  const isAdmin = user?.role === 'ADMIN' || user?.role === 'MANAGER'

  const mainCategories = await getMainCategories()
  const mainMenu = mainCategories?.map(category => {
    return {
      id: category.id,
      name: category.name,
      url: `/catalog/${category.slug}`
    }
  })
  mainMenu?.unshift({
    id: 'catalog',
    name: 'Каталог',
    url: `/catalog`
  })
  return (
    <>
      <nav className='main-gradient bg-background sticky left-0 top-0 z-20 hidden h-16 w-full border-b border-border px-4 py-2 shadow md:flex md:h-20'>
        <div className='container flex items-center justify-between'>
          <div className='flex flex-row items-center gap-8 ml-4'>
            <MenuSheet />
            <Logo className='h-8' />

            {isAdmin && (
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
            )}
          </div>
          <NavMenu menu={mainMenu} />
          <div className='flex flex-row items-center gap-4'>
            <CartItemBadge>
              <CartSheet />
            </CartItemBadge>
            <AvatarUser />
            <ModeToggle />
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar
