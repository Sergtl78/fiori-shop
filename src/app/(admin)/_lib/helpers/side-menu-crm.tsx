import { CartIcon, UserIcon } from '@/components/icon'
import { GearIcon, LockClosedIcon } from '@radix-ui/react-icons'
import { PreOrderIcon } from '../../_ui/icons/PreOrderIcon'
import { UserPlusIcon } from '../../_ui/icons/UserPlusIcon'
export type MenuItemAdmin = {
  title: string
  url: string
  icon: React.ReactNode
}

export const sideMenuCRM: MenuItemAdmin[] = [
  {
    title: 'Заказы ',
    url: '/crm/orders/kanban',
    icon: <CartIcon className='w-6 h-6' />
  },
  {
    title: 'Предзаказы ',
    url: '/crm/pre_orders/table',
    icon: <PreOrderIcon className='w-6 h-6' />
  },

  {
    title: 'Новые покупатели',
    url: '/crm/new_users/table',
    icon: <UserPlusIcon className='w-6 h-6' />
  },
  {
    title: 'Покупатели',
    url: '/crm/customers/table',
    icon: <UserIcon className='w-6 h-6' />
  }
]
export const sideMenuAdminCRM: MenuItemAdmin[] = [
  {
    title: 'Настройки',
    url: '/crm/settings',
    icon: <GearIcon className='w-6 h-6' />
  },
  {
    title: 'Доступ',
    url: '/crm/access',
    icon: <LockClosedIcon className='w-6 h-6' />
  }
]
