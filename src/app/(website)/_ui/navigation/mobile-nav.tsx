import Link from 'next/link'
import { ReactNode } from 'react'
import CartDrawer from '../cart/cart-drawer'
import CartItemBadge from '../cart/cart-item-badge'
import FiltersDrawer from './filters-drawer'
import HomeDrawer from './home-drawer'
import MenuDrawer from './menu-drawer'
import { AvatarUser } from './nav-avatar-user'

type MobileNavProps = {
  children?: ReactNode
}

const MobileNav = ({ children }: MobileNavProps) => {
  return (
    <div className='fixed bottom-0 left-0 z-50 w-full border-t md:hidden'>
      <div className='grid grid-cols-6 h-20 w-full items-center justify-between px-4 py-4 bg-background'>
        <Link href='/' className='flex items-center justify-center'>
          <HomeDrawer />
        </Link>
        <div className='flex items-center justify-center'>
          <MenuDrawer />
        </div>
        <div className='flex items-center justify-center'>
          <FiltersDrawer />
        </div>
        <div className='flex items-center justify-center'>
          <CartItemBadge>
            <CartDrawer />
          </CartItemBadge>
        </div>
        <div className='flex col-span-2 items-center justify-center'>
          <AvatarUser />
        </div>
      </div>
    </div>
  )
}

export default MobileNav
