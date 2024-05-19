import { CameraIcon, TableIcon, ViewVerticalIcon } from '@radix-ui/react-icons'
import {
  CategoryIcon,
  FlowersIcon,
  MainCategoryIcon,
  SubCategoryIcon
} from '../../_ui/icons'
import { CollectionsIcon } from '../../_ui/icons/CollectionsIcon'
import { ColorsIcon } from '../../_ui/icons/ColorIcon'
import { DeliveryIcon } from '../../_ui/icons/DeliveryIcon'
import { SliderIcon } from '../../_ui/icons/SliderIcon'
import { VendorIcon } from '../../_ui/icons/VendorIcon'
export type MenuItemCMS = {
  title: string
  url: string
  icon: React.ReactNode
}

export const sideMenuCMS: MenuItemCMS[] = [
  {
    title: 'Растения',
    url: '/cms/products/table',
    icon: <FlowersIcon className='w-6 h-6' />
  },
  {
    title: 'Главные категории',
    url: '/cms/main_categories/table',
    icon: <MainCategoryIcon className='w-6 h-6' />
  },
  {
    title: 'Категории (вид цветов)',
    url: '/cms/categories/table',
    icon: <CategoryIcon className='w-6 h-6' />
  },
  {
    title: 'Подкатегории (тип цветов)',
    url: '/cms/sub_categories/table',
    icon: <SubCategoryIcon className='w-6 h-6' />
  },
  {
    title: 'Поставщики',
    url: '/cms/vendors/table',
    icon: <VendorIcon className='w-6 h-6 stroke-2' />
  },
  {
    title: 'Цвета',
    url: '/cms/colors/table',
    icon: <ColorsIcon className='w-6 h-6' />
  },
  {
    title: 'Коллекции',
    url: '/cms/collections/table',
    icon: <CollectionsIcon className='w-6 h-6' />
  },
  {
    title: 'Фото',
    url: '/cms/images/table',
    icon: <CameraIcon className='w-6 h-6' />
  },
  {
    title: 'Слайдер промо',
    url: '/cms/slider_promo/table',
    icon: <SliderIcon className='w-6 h-6' />
  },
  {
    title: 'Поставки',
    url: '/cms/deliveries/table',
    icon: <DeliveryIcon className='w-6 h-6' />
  }
]
export const sideMenuAdminCMS: MenuItemCMS[] = [
  {
    title: 'Страницы',
    url: '/crm/pages/table',
    icon: <ViewVerticalIcon className='w-6 h-6' />
  },
  {
    title: 'Блоки',
    url: '/crm/blocks/table',
    icon: <TableIcon className='w-6 h-6' />
  }
]
